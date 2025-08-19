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
      console.log(
        "google sub token (jwt): ",
        token.googleSub,
        " ",
        account,
        " ",
        profile
      );
      return token;
    },
    async session({ session, token }) {
      // Expose Google sub ID in session
      if (session.user) {
        session.user.googleSub = token.googleSub as string;
      }
      console.log("google sub token (session): ", session.user.googleSub);
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
