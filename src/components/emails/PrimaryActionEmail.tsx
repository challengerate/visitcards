import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
  render,
} from '@react-email/components'
import * as React from "react"

interface EmailTemplateProps {
  actionLabel: string
  buttonText: string
  href: string
}

export const EmailTemplate = ({
  actionLabel,
  buttonText,
  href,
}: EmailTemplateProps) => {
  return (
    <Html>
      <Head>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');
          `}
        </style>
      </Head>
      <Preview>VisitCards - Share Who You Are, Instantly and Effortlessly</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={heroSection}>
            <div style={whiteBox}>
              <Img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-ytiKK2EWw6TZkPm7RlfoLOwikvpU6B.png"
                width="120"
                height="120"
                alt="VisitCards Logo"
                style={logo}
              />
              <Text style={taglineContainer}>
                <span style={taglineFirst}>Instant Sharing,</span>
                <span style={taglineSecond}>Infinite Possibilities</span>
              </Text>
              <Text style={heroText}>Welcome to VisitCards</Text>
            </div>
          </Section>
          
          <Section style={contentSection}>
            <Text style={greeting}>Hi there,</Text>
            <Text style={paragraph}>
              Take the first step in redefining the way you connect! With VisitCards, 
              you can effortlessly share your digital identity using NFC-enabled cards 
              and custom digital pages. {actionLabel} below to explore a smarter way to network.
            </Text>
            
            <Section style={perksContainer}>
              <div style={perkItem}>
                <Text style={perkTitle}>Tap and Connect</Text>
                <Text style={perkDescription}>
                  Share your contact details instantly with a single tap using our NFC-enabled cards.
                </Text>
              </div>
              <div style={perkItem}>
                <Text style={perkTitle}>Custom Digital Pages</Text>
                <Text style={perkDescription}>
                  Showcase everything about you—social links, portfolio, and more—all in one link.
                </Text>
              </div>
            </Section>

            <Section style={btnContainer}>
              <Button style={button} href={href}>
                {buttonText}
              </Button>
            </Section>

            <Text style={signatureText}>
              Best regards,
              <br />
              <span style={teamSignature}>The VisitCards Team</span>
            </Text>
          </Section>

          <Hr style={hr} />
          
          <Section style={footerSection}>
            <Text style={footer}>
              If you didn't request this email, you can safely ignore it.
            </Text>
            <Text style={footerLinks}>
              <a href="#" style={link}>Terms of Service</a>
              {' • '}
              <a href="#" style={link}>Privacy Policy</a>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

export const PrimaryActionEmailHtml = (
  props: EmailTemplateProps
) => render(<EmailTemplate {...props} />, { pretty: true })

const main = {
  backgroundColor: '#f5f5f5',
  fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  padding: '40px 0',
}

const container = {
  margin: '0 auto',
  maxWidth: '600px',
  backgroundColor: '#ffffff',
  borderRadius: '8px',
  overflow: 'hidden',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}

const heroSection = {
  padding: '40px',
  backgroundColor: '#ffffff',
}

const whiteBox = {
  backgroundColor: '#ffffff',
  padding: '24px',
  borderRadius: '12px',
  textAlign: 'center' as const,
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)',
}

const logo = {
  margin: '0 auto',
  borderRadius: '12px',
  backgroundColor: '#000000',
  padding: '8px',
}

const taglineContainer = {
  margin: '20px 0 8px',
  textAlign: 'center' as const,
  fontWeight: '600',
  fontSize: '24px',
}

const taglineFirst = {
  color: '#1e293b',
}

const taglineSecond = {
  color: '#0096FF',
  marginLeft: '8px',
}

const heroText = {
  fontSize: '28px',
  color: '#1e293b',
  fontWeight: 'bold',
  margin: '0',
  textAlign: 'center' as const,
}

const contentSection = {
  padding: '32px 40px',
}

const greeting = {
  fontSize: '20px',
  color: '#1e293b',
  fontWeight: '600',
  margin: '0 0 20px',
}

const paragraph = {
  fontSize: '16px',
  lineHeight: '1.6',
  color: '#475569',
  margin: '0 0 24px',
}

const perksContainer = {
  margin: '32px 0',
  padding: '24px',
  backgroundColor: '#f0f9ff',
  borderRadius: '8px',
}

const perkItem = {
  marginBottom: '20px',
}

const perkTitle = {
  fontSize: '16px',
  fontWeight: '600',
  color: '#0096FF',
  margin: '0 0 8px',
}

const perkDescription = {
  fontSize: '14px',
  color: '#475569',
  lineHeight: '1.5',
  margin: '0',
}

const btnContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
}

const button = {
  backgroundColor: '#0096FF',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: '600',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 32px',
  boxShadow: '0 2px 4px rgba(0, 150, 255, 0.2)',
  transition: 'all 0.2s ease',
}

const signatureText = {
  fontSize: '16px',
  color: '#475569',
  marginTop: '32px',
  lineHeight: '1.6',
}

const teamSignature = {
  color: '#1e293b',
  fontWeight: '600',
}

const hr = {
  borderColor: '#e2e8f0',
  margin: '0',
}

const footerSection = {
  padding: '24px 40px',
  backgroundColor: '#f0f9ff',
}

const footer = {
  fontSize: '14px',
  color: '#64748b',
  textAlign: 'center' as const,
  margin: '0 0 12px',
}

const footerLinks = {
  textAlign: 'center' as const,
  fontSize: '14px',
  color: '#64748b',
}

const link = {
  color: '#0096FF',
  textDecoration: 'none',
}