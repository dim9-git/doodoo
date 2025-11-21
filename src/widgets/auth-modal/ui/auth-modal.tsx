"use client"

import { useState } from "react"

import {
  Button,
  DialogContent,
  Dialog,
  DialogTitle,
  DialogHeader,
} from "@/shared"

import LoginForm from "../../../features/auth/ui/login-form"
import RegisterForm from "../../../features/auth/ui/register-form"
import { GOOGLE_LOGIN_URL } from "../model/constants"

type AuthType = "login" | "register"

interface Props {
  open: boolean
  onClose: () => void
}

export default function AuthModal({ open, onClose }: Props) {
  const [type, setType] = useState<AuthType>("login")

  const onToggleType = () => {
    setType(type === "login" ? "register" : "login")
  }

  const handleClose = () => {
    setType("login")
    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="w-[450px] bg-white p-10">
        <DialogHeader className="sr-only">
          <DialogTitle>
            {type === "login" ? "Войти" : "Регистрация"}
          </DialogTitle>
        </DialogHeader>

        {type === "login" ? (
          <LoginForm onClose={handleClose} />
        ) : (
          <RegisterForm onClose={handleClose} />
        )}

        <hr />
        <div className="flex gap-2">
          <a href={GOOGLE_LOGIN_URL}>
            <Button
              variant="secondary"
              onClick={() => handleClose()}
              type="button"
              className="gap-2 h-12 p-2 flex-1"
            >
              {/* eslint-disable-next-line jsx-a11y/alt-text */}
              <img
                className="w-6 h-6"
                src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
              />
              Google
            </Button>
          </a>
        </div>

        <Button
          variant="outline"
          onClick={onToggleType}
          type="button"
          className="h-12"
        >
          {type !== "login" ? "Войти" : "Регистрация"}
        </Button>
      </DialogContent>
    </Dialog>
  )
}
