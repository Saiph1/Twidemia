import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import clientPromise from "../../../lib/mongodb";
import checkCredentials from "../../../lib/signin";


export const authOptions = {
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: 'Credentials',
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: {  label: "Password (same as username)", type: "password" }
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        const data = await checkCredentials(credentials)

        // If no error and we have user data, return it
        if (data) {
          return data
        }
        // Return null if user data could not be retrieved
        return null
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt ({ token, user}) {
      if (user) {
        token.userid = user.id
        token.username = user.name
        token.usertype = user.type
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.userid
      session.user.name = token.username
      session.user.type = token.usertype

      return session
    }
  },
  pages: {
    signIn: '/auth/signin',
    // error: '@/pages/auth/error', not implemented
  }
}

export default NextAuth(authOptions)
