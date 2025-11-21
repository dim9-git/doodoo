import { APP_URL } from "@/shared"

interface Props {
  code: string
}

export default function UserVerification({ code }: Props) {
  return (
    <div>
      <p>
        Код подтверждения: <h2>{code}</h2>
      </p>

      <p>
        <a href={`${APP_URL}/api/auth/verify?code=${code}`}>
          Подтвердить регистрацию
        </a>
      </p>
    </div>
  )
}
