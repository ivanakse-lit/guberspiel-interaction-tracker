
import React from 'npm:react@18.3.1'
import { Resend } from 'npm:resend@4.0.0'
import { renderAsync } from 'npm:@react-email/components@0.0.22'
import { InvitationEmail } from './_templates/invitation-email.tsx'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const resend = new Resend(Deno.env.get('RESEND_API_KEY') as string)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface InvitationRequest {
  recipient_email: string
  circle_id: string
  invite_code: string
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { 
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    })
  }

  try {
    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get request data
    const { recipient_email, circle_id, invite_code }: InvitationRequest = await req.json()

    console.log('Sending invitation email to:', recipient_email)

    // Get circle details and inviter information
    const { data: circle, error: circleError } = await supabaseClient
      .from('circle')
      .select(`
        name,
        description,
        created_by,
        profiles!circle_created_by_fkey (
          name
        )
      `)
      .eq('id', circle_id)
      .single()

    if (circleError || !circle) {
      throw new Error('Circle not found')
    }

    // Get inviter name (fallback to email if no profile name)
    const { data: inviterProfile, error: profileError } = await supabaseClient
      .from('profiles')
      .select('name')
      .eq('id', circle.created_by)
      .single()

    const inviterName = inviterProfile?.name || 'Someone'

    console.log('Circle details:', { 
      name: circle.name, 
      inviter: inviterName,
      description: circle.description 
    })

    const html = await renderAsync(
      React.createElement(InvitationEmail, {
        inviter_name: inviterName,
        circle_name: circle.name,
        circle_description: circle.description,
        invite_code: invite_code,
        app_url: 'https://guberspiel-interaction-tracker.lovable.app',
      })
    )

    const { error } = await resend.emails.send({
      from: 'Guberspiel <onboarding@resend.dev>',
      to: [recipient_email],
      subject: `You've been invited to join ${circle.name} on Guberspiel`,
      html,
    })

    if (error) {
      console.error('Resend error:', error)
      throw error
    }

    console.log('Invitation email sent successfully')

    return new Response(
      JSON.stringify({ success: true, message: 'Invitation email sent successfully' }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error in send-invitation-email function:', error)
    
    return new Response(
      JSON.stringify({
        error: {
          message: error.message || 'Internal server error',
        },
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})
