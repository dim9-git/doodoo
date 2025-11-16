import { Resend } from "resend"

let resendInstance: Resend | null = null

const getResend = () => {
  if (!resendInstance) {
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not defined")
    }
    resendInstance = new Resend(RESEND_API_KEY)
  }
  return resendInstance
}

export const resend = new Proxy({} as Resend, {
  get(_target, prop) {
    return getResend()[prop as keyof Resend]
  },
})

export const sendMail = async (
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
