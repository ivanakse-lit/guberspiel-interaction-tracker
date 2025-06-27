
import { supabase } from '@/integrations/supabase/client'

export const sendInvitationEmail = async (
  recipientEmail: string,
  circleId: string,
  inviteCode: string
) => {
  try {
    const { data, error } = await supabase.functions.invoke('send-invitation-email', {
      body: {
        recipient_email: recipientEmail,
        circle_id: circleId,
        invite_code: inviteCode,
      },
    })

    if (error) {
      console.error('Error sending invitation email:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Invitation service error:', error)
    throw error
  }
}
