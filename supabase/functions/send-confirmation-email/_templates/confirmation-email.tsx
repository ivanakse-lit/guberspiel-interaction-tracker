
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Section,
  Hr,
} from 'npm:@react-email/components@0.0.22'
import * as React from 'npm:react@18.3.1'

interface ConfirmationEmailProps {
  supabase_url: string
  email_action_type: string
  redirect_to: string
  token_hash: string
  token: string
  user_email: string
}

export const ConfirmationEmail = ({
  token,
  supabase_url,
  email_action_type,
  redirect_to,
  token_hash,
  user_email,
}: ConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Welcome to Guberspiel - Confirm your account to start tracking meaningful interactions</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>🎯 Guberspiel</Heading>
          <Text style={subtitle}>Track Meaningful Social Interactions</Text>
        </Section>
        
        <Section style={content}>
          <Heading style={h2}>Welcome to Guberspiel!</Heading>
          <Text style={text}>
            Thank you for joining Guberspiel, where every act of kindness and meaningful interaction matters. 
            We're excited to help you track and celebrate the positive connections in your life.
          </Text>
          
          <Text style={text}>
            To get started and confirm your account, please click the button below:
          </Text>
          
          <Section style={buttonContainer}>
            <Link
              href={`${supabase_url}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${redirect_to}`}
              style={button}
            >
              Confirm Your Account
            </Link>
          </Section>
          
          <Text style={smallText}>
            Or copy and paste this link in your browser:
          </Text>
          <Text style={linkText}>
            {`${supabase_url}/auth/v1/verify?token=${token_hash}&type=${email_action_type}&redirect_to=${redirect_to}`}
          </Text>
          
          <Hr style={hr} />
          
          <Text style={footerText}>
            Once confirmed, you'll be able to:
          </Text>
          <Text style={listItem}>• Create and join interaction circles with friends and family</Text>
          <Text style={listItem}>• Log acts of kindness and meaningful moments</Text>
          <Text style={listItem}>• Track your positive impact over time</Text>
          <Text style={listItem}>• Celebrate the connections that matter most</Text>
        </Section>
        
        <Section style={footer}>
          <Text style={footerText}>
            If you didn't create an account with Guberspiel, you can safely ignore this email.
          </Text>
          <Text style={footerSignature}>
            With gratitude,<br />
            The Guberspiel Team
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

export default ConfirmationEmail

const main = {
  backgroundColor: '#fefbf3',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
}

const container = {
  margin: '0 auto',
  padding: '20px',
  maxWidth: '600px',
}

const header = {
  textAlign: 'center' as const,
  marginBottom: '32px',
  padding: '24px',
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  border: '1px solid #f4e4bc',
}

const h1 = {
  color: '#c2410c',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0 0 8px 0',
  textAlign: 'center' as const,
}

const subtitle = {
  color: '#92400e',
  fontSize: '16px',
  margin: '0',
  textAlign: 'center' as const,
  fontWeight: '500',
}

const content = {
  backgroundColor: '#ffffff',
  padding: '32px',
  borderRadius: '12px',
  border: '1px solid #f4e4bc',
  marginBottom: '24px',
}

const h2 = {
  color: '#451a03',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
}

const text = {
  color: '#451a03',
  fontSize: '16px',
  lineHeight: '1.6',
  margin: '0 0 16px 0',
}

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button = {
  backgroundColor: '#c2410c',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  padding: '14px 28px',
  borderRadius: '8px',
  display: 'inline-block',
  boxShadow: '0 4px 6px rgba(194, 65, 12, 0.2)',
}

const smallText = {
  color: '#92400e',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '24px 0 8px 0',
}

const linkText = {
  color: '#c2410c',
  fontSize: '12px',
  lineHeight: '1.4',
  margin: '0 0 24px 0',
  wordBreak: 'break-all' as const,
  backgroundColor: '#fef3e2',
  padding: '8px 12px',
  borderRadius: '6px',
  border: '1px solid #f4e4bc',
}

const hr = {
  border: 'none',
  borderTop: '1px solid #f4e4bc',
  margin: '24px 0',
}

const listItem = {
  color: '#451a03',
  fontSize: '15px',
  lineHeight: '1.5',
  margin: '0 0 8px 0',
}

const footer = {
  backgroundColor: '#fef3e2',
  padding: '24px',
  borderRadius: '12px',
  border: '1px solid #f4e4bc',
  textAlign: 'center' as const,
}

const footerText = {
  color: '#92400e',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '0 0 16px 0',
}

const footerSignature = {
  color: '#451a03',
  fontSize: '14px',
  lineHeight: '1.5',
  margin: '0',
  fontWeight: '500',
}
