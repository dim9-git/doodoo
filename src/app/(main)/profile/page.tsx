import { redirect } from "next/navigation"

import { Container, safe } from "@/shared"

import { getUserById } from "@/entities/user"

import { getSessionFromCookie } from "@/features/auth/api"

import { ProfileForm } from "@/widgets/profile-form"

export default async function ProfilePage() {
  const session = await getSessionFromCookie()

  if (!session?.userId) {
    return redirect("/")
  }

  const userId = session.userId

  const user = await safe(() => getUserById(userId), "ProfilePage::getUserById")

  if (!user) {
    return redirect("/")
  }

  return (
    <Container>
      <ProfileForm data={user} />
    </Container>
  )
}
