import { redirect } from "next/navigation"

import { Container, safe } from "@/shared"

import { findUser } from "@/entities/users"

import { getSessionFromCookie } from "@/features/auth/api"

import { ProfileForm } from "@/widgets/profile-form"

export default async function ProfilePage() {
  const session = await getSessionFromCookie()

  if (!session?.userId) {
    return redirect("/")
  }

  const userId = session.userId

  const user = await safe(() => findUser(userId), "ProfilePage::findUser")

  if (!user) {
    return redirect("/")
  }

  return (
    <Container>
      <ProfileForm data={user} />
    </Container>
  )
}
