import NextAuth from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";
import { jwtDecode } from "jwt-decode";
import { encrypt } from "@/utils/encryption";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    KeycloakProvider({
      clientId: `${process.env.DEMO_FRONTEND_CLIENT_ID}`,
      clientSecret: `${process.env.DEMO_FRONTEND_CLIENT_SECRET}`,
      issuer: `${process.env.AUTH_ISSUER}`,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      const nowTimeStamp = Math.floor(Date.now() / 1000);
      // the account will only passed in the first time signing in, after that only the token will be passed and the account will be null
      if (account) {
        token.decoded = jwtDecode(account.access_token);
        token.access_token = account.access_token;
        token.id_token = account.id_token;
        token.expires_at = account.expires_at;
        token.refresh_token = account.refresh_token;
        return token;
      } else if (nowTimeStamp < token.expires_at) {
        // token has not expired yet, return it
        return token;
      } else {
        // token is expired, try to refresh it
        console.log("Token has expired. Will refresh...");
      }
    },
    async session({ session, token }) {
      // we used session, because to retrieve jwt from the encrypted cookie, we should use a method called getToken but this method is used only in client components
      // so we will store the jwt in the session but we should encryt it, because informations are stored in the session without encryption
      session.access_token = encrypt(token.access_token); // see utils/sessionTokenAccessor.js
      session.id_token = encrypt(token.id_token); // see utils/sessionTokenAccessor.js
      session.roles = token.decoded.realm_access.roles;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
