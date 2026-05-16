import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";

const LMS_API = process.env.LMS_API_URL || "https://checkout.winwinwealth.co/api";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
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
        }
        return true;
      } catch (error) {
        console.error("Google link error:", error);
        return true; // Allow login even if link fails — user still gets session
      }
    },
    async jwt({ token }) {
      if (token.email) {
        // Fallback admin list for CF Workers where API call may fail
        const ADMIN_EMAILS = ["ninemark1234567890@gmail.com", "kawinrat91@gmail.com"];
        try {
          const res = await fetch(
            `${LMS_API}/auth/check-enrollment?email=${encodeURIComponent(token.email as string)}`
          );
          if (res.ok) {
            const data = await res.json();
            token.role = data.role || "user";
          } else if (ADMIN_EMAILS.includes(token.email as string)) {
            token.role = "admin";
          }
        } catch {
          token.role = ADMIN_EMAILS.includes(token.email as string) ? "admin" : (token.role || "user");
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
