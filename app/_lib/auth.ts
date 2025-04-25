import { createGuest, getGuest } from "./data-service";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
// import type { NextRequest } from "next/server";
import type { NextAuthConfig, User } from "next-auth";
// import type { Session, User,  } from "next-auth";

const authConfig: NextAuthConfig = {
  providers: [Google],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ user }: { user: User }) {
      try {
        const existingGuest = await getGuest(user.email);

        if (!existingGuest)
          await createGuest({ email: user.email, fullName: user.name });

        return true;
      } catch {
        return false;
      }
    },
    async session({ session }) {
      const guest = await getGuest(session.user.email);
      (session.user as typeof session.user & { guestId: number }).guestId =
        guest.id;

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
