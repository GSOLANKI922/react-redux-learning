import { LOGIN_USER } from "@/app/(auth)/graphql/mutation";
import getClient from "@/provider/apolloClient";
import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt", //(1)
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "text" },
      },
      async authorize(credentials) {
        try {
          const { email = "", password = "" } = credentials as {
            email: string;
            password: string;
            id: string;
          };

          const res = await getClient()?.mutate({
            mutation: LOGIN_USER,
            variables: {
              data: {
                email,
                password,
              },
            },
          });
          let user;
          if (res.data?.emailPasswordLogIn) {
            const userData = res.data?.emailPasswordLogIn?.data;
            user = {
              refreshToken: userData?.refreshToken,
              token: userData?.token,
              email: userData?.user?.email,
              firstName: userData?.user?.firstName,
              name: userData?.user?.name,
              profileImage: userData?.user?.profileImage,
              id: userData?.user?.id || "",
            };
          }
          return user || null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token = user;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token;
      }

      return session;
    },
  },
  pages: {
    signIn: "/login", //(4) custom signin page path
  },
};

export const getServerAuthSession = async () =>
  await getServerSession(authOptions);
