import { User } from "lucide-react"
import Link from "next/link"

import { Button } from "@/shared"

import { useSession } from "@/features/auth"

interface Props {
  className?: string
  onClickLogin: () => void
}

export default function HeaderProfileButton({
  className,
  onClickLogin,
}: Props) {
  const { isAuthenticated, isLoading } = useSession()

  return (
    <div className={className}>
      {!isAuthenticated && !isLoading ? (
        <Button
          onClick={onClickLogin}
          variant="outline"
          className="flex items-center gap-1"
        >
          <User size={16} />
          Войти
        </Button>
      ) : (
        <Link href="/profile">
          <Button variant="secondary" className="flex items-center gap-2">
            <User size={18} />
            Профиль
          </Button>
        </Link>
      )}
    </div>
  )
}
