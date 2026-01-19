import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { verifyUser } from '@/lib/auth'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null
          }

          const user = await verifyUser(credentials.email, credentials.password)
          
          if (!user) {
            return null
          }

          // Ensure all required fields are present
          if (!user.id || !user.email || !user.name || !user.role) {
            console.error('User missing required fields:', user)
            return null
          }

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          }
        } catch (error) {
          console.error('Authorization error:', error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      try {
        if (session.user && token) {
          session.user.role = (token.role as string) || ''
          session.user.id = (token.id as string) || ''
        }
        return session
      } catch (error) {
        console.error('Session callback error:', error)
        return session
      }
    },
  },
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
}
