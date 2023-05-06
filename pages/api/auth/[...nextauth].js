import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import checkCredentials from "../../../lib/signin";
import User from "@/models/User";

export const authOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password (same as username)", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const data = await checkCredentials(credentials);

        // If no error and we have user data, return it
        if (data) {
          return data;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // set jwt token
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.userId;
        token.username = user.username;
        token.email = user.email;
        token.admin = user.admin;
        token.verified = user.verified;
      }
      return token;
    },
    // set session value
    async session({ session, token }) {
      session.user.userId = token.userId;
      const user_new = await User.findOne({ userId: token.userId });
      token.username = user_new.username;
      token.email = user_new.email;
      token.admin = user_new.admin;
      token.verified = user_new.verified;
      session.user.username = user_new.username;
      session.email = user_new.email;
      session.admin = user_new.admin;
      session.verified = user_new.verified;
      return session;
    },
  },
  pages: {
    signIn: "/login",
    // error: '@/pages/auth/error', not implemented
  },
};

export default NextAuth(authOptions);
