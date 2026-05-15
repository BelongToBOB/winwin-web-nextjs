import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

const LMS_API = process.env.LMS_API_URL || "https://checkout.winwinwealth.co/api";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(`${LMS_API}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });
        if (!res.ok) return null;
        const user = await res.json();
        return {
          id: user.userId,
          email: user.email,
          name: user.displayName,
        };
      },
    }),
  ],
  // AUTH-C-04: Session config
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: "/learn/login",
    error: "/learn/login",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "credentials") return true;

      if (!user.email) return false;

      // AUTH-C-03: Deny login if google-link fails
      try {
        const res = await fetch(`${LMS_API}/auth/google-link`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            googleId: profile?.sub || account?.providerAccountId,
            email: user.email,
            displayName: user.name || user.email,
          }),
        });

        if (!res.ok) {
          console.error("Google link failed:", res.status);
          return false;
        }
        return true;
      } catch (error) {
        console.error("Google link error:", error);
        return false;
      }
    },
    async jwt({ token }) {
      if (token.email && !token.role) {
        try {
          const res = await fetch(
            `${LMS_API}/auth/check-enrollment?email=${encodeURIComponent(token.email as string)}`
          );
          if (res.ok) {
            const data = await res.json();
            token.role = data.role || "user";
          }
        } catch {
          token.role = "user";
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role || "user";
      }
      return session;
    },
  },
});
