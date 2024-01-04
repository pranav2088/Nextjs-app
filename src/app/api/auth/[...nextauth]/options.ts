import type { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { query } from '@/lib/db'; // Import your query function from the database utility



async function login(credentials:any) {
  try {
   

    const [user]:any= await query({
      query: 'SELECT * FROM users WHERE email = ? AND password = ?',
      values: [credentials.email, credentials.password],
    });

    if (!user) {
      
      throw new Error('Wrong Credentials');
    }

    
    return user;
  } catch (error) {
    
    throw new Error('Something went wrong');
  }
}

export const options: NextAuthOptions = {
  providers: [
    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID as string,
    //   clientSecret: process.env.GITHUB_SECRET as string,
    // }),
    GoogleProvider({
      clientId: process.env.NEXT_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      // username: { label: "Username", type: "text", placeholder: "jsmith" },
      // password: { label: "Password", type: "password" }
      async authorize(credentials) {
        try {
         
          const user = await login(credentials)
        

          if (user) {
            // Replace with your desired URL
            return {
              id: user.id, // Make sure 'id' is available in the 'user' object
              email: user.email,
              type:user.type
             
            };
          } else {
            return null;
          }
        } catch (error) {
          
          throw new Error('Failed to log in');
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email;
        token.id = user.id;
        //token.type = user.type;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          //id: token.id,
          email: token.email,
          //type: token.type,
          // Add other necessary fields
        };
      }
      return session;
    },
  }
}
