
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

interface InvitationEmailProps {
  inviter_name: string
  circle_name: string
  circle_description?: string
  invite_code: string
  app_url: string
}

export const InvitationEmail = ({
  inviter_name,
  circle_name,
  circle_description,
  invite_code,
  app_url,
}: InvitationEmailProps) => (
  <Html>
    <Head />
    <Preview>You've been invited to join {circle_name} on Guberspiel</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Heading style={h1}>🎯 Guberspiel</Heading>
          <Text style={subtitle}>Track Meaningful Social Interactions</Text>
        </Section>
        
        <Section style={content}>
          <Heading style={h2}>You're Invited to Join a Circle!</Heading>
          <Text style={text}>
            <strong>{inviter_name}</strong> has invited you to join <strong>{circle_name}</strong> on Guberspiel.
          </Text>
          
          {circle_description && (
            <Text style={text}>
              <strong>About this circle:</strong> {circle_description}
            </Text>
          )}
          
          <Text style={text}>
            Guberspiel helps you track and celebrate meaningful interactions within your social circles. 
            Join to start logging acts of kindness, support, and positive moments with your friends and family.
          </Text>
          
          <Section style={buttonContainer}>
            <Link
              href={`${app_url}/join/${invite_code}`}
              style={button}
            >
              Join {circle_name}
            </Link>
          </Section>
          
          <Text style={smallText}>
            Or copy and paste this link in your browser:
          </Text>
          <Text style={linkText}>
            {`${app_url}/join/${invite_code}`}
          </Text>
          
          <Hr style={hr} />
          
          <Text style={footerText}>
            What you can do in Guberspiel:
          </Text>
          <Text style={listItem}>• Log meaningful interactions with circle members</Text>
          <Text style={listItem}>• Track giving and receiving in your relationships</Text>
          <Text style={listItem}>• View your social balance and circle dynamics</Text>
          <Text style={listItem}>• Celebrate the connections that matter most</Text>
        </Section>
        
        <Section style={footer}>
          <Text style={footerText}>
            If you don't want to join this circle, you can safely ignore this email.
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

export default InvitationEmail

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
