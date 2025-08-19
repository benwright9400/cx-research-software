import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Add Google sub ID to JWT on sign in
      if (account && profile) {
        token.googleSub = profile.sub;
      }
      return token;
    },
    async session({ session, token }) {
      // Expose Google sub ID in session
      session.user.googleSub = token.googleSub;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
