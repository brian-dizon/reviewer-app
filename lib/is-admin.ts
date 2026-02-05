import { auth, clerkClient } from "@clerk/nextjs/server";

export async function checkAdmin() {
  const { userId } = await auth();
  if (!userId) return false;

  try {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    
    // Check the actual source of truth
    return user.publicMetadata?.role === "admin";
  } catch (err) {
    console.error("Admin check failed", err);
    return false;
  }
}
