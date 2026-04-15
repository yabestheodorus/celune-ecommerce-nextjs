import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import ProfileContent from "@/components/profile/ProfileContent";
import { prisma } from "@/lib/prisma";

export default async function ProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  // Fetch full user details from DB to get the new gamification fields
  const dbUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      orders: {
        include: {
          items: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!dbUser) {
    redirect("/login");
  }

  return <ProfileContent user={dbUser} orders={dbUser.orders} />;
}
