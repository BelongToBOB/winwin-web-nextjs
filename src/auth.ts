import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/learn/login",
    error: "/learn/login",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;

      try {
        const res = await fetch(
          `https://checkout.winwinwealth.co/api/auth/check-enrollment?email=${encodeURIComponent(user.email)}`
        );
        const data = await res.json();
        if (!data.enrolled) return `/learn/login?error=not_enrolled`;
        return true;
      } catch {
        // If API is down, allow login (graceful degradation)
        return true;
      }
    },
  },
});
