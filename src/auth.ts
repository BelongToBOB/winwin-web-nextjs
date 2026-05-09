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
          id: user.customerCode,
          email: user.email,
          name: user.displayName,
        };
      },
    }),
  ],
  pages: {
    signIn: "/learn/login",
    error: "/learn/login",
  },
  callbacks: {
    async signIn({ user, account }) {
      // Credentials provider: login endpoint already verified enrollment
      if (account?.provider === "credentials") return true;

      // Google provider: check enrollment
      if (!user.email) return false;
      try {
        const res = await fetch(
          `${LMS_API}/auth/check-enrollment?email=${encodeURIComponent(user.email)}`
        );
        const data = await res.json();
        if (!data.enrolled) return `/learn/login?error=not_enrolled`;
        return true;
      } catch {
        return true;
      }
    },
  },
});
