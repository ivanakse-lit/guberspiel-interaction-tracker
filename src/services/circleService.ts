
import { supabase, Circle, CircleMembership } from '@/lib/supabase'

export const createCircle = async (name: string, description: string, memberNames: string[]) => {
  const user = await supabase.auth.getUser()
  if (!user.data.user) throw new Error('Not authenticated')

  // Generate a unique invite code
  const inviteCode = Math.random().toString(36).substring(2, 15)

  // Create the circle
  const { data: circle, error: circleError } = await supabase
    .from('circles')
    .insert({
      name,
      description,
      invite_code: inviteCode,
      created_by: user.data.user.id
    })
    .select()
    .single()

  if (circleError) throw circleError

  // Add creator as member
  const { error: membershipError } = await supabase
    .from('circle_memberships')
    .insert({
      circle_id: circle.id,
      user_id: user.data.user.id,
      user_name: user.data.user.user_metadata.name || user.data.user.email
    })

  if (membershipError) throw membershipError

  // Add other members (these will be pending until they join)
  if (memberNames.length > 0) {
    const pendingMembers = memberNames.map(name => ({
      circle_id: circle.id,
      user_id: '', // Empty until they actually join
      user_name: name
    }))

    await supabase
      .from('circle_memberships')
      .insert(pendingMembers)
  }

  return { circle, inviteCode }
}

export const joinCircle = async (inviteCode: string, userName: string) => {
  const user = await supabase.auth.getUser()
  if (!user.data.user) throw new Error('Not authenticated')

  // Find the circle
  const { data: circle, error: circleError } = await supabase
    .from('circles')
    .select('*')
    .eq('invite_code', inviteCode)
    .single()

  if (circleError || !circle) throw new Error('Invalid invite code')

  // Check if user is already a member
  const { data: existingMembership } = await supabase
    .from('circle_memberships')
    .select('*')
    .eq('circle_id', circle.id)
    .eq('user_id', user.data.user.id)
    .single()

  if (existingMembership) throw new Error('Already a member of this circle')

  // Add user as member
  const { error: membershipError } = await supabase
    .from('circle_memberships')
    .insert({
      circle_id: circle.id,
      user_id: user.data.user.id,
      user_name: userName
    })

  if (membershipError) throw membershipError

  return circle
}

export const getUserCircles = async () => {
  const user = await supabase.auth.getUser()
  if (!user.data.user) throw new Error('Not authenticated')

  const { data, error } = await supabase
    .from('circle_memberships')
    .select(`
      *,
      circles (*)
    `)
    .eq('user_id', user.data.user.id)

  if (error) throw error
  return data
}
