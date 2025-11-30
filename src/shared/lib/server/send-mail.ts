import { Resend } from "resend"

const RESEND_API_KEY = process.env.RESEND_API_KEY!

export const resend = new Resend(RESEND_API_KEY)

export const sendEmail = async (
  to: string,
  subject: string,
  template: React.ReactNode
) => {
  return await resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject,
    react: template,
  })
}
