import NextAuth from "next-auth";

export default NextAuth({
  providers: [
    {
      id: "finastra",
      name: "Finastra",
      type: "oauth",
      // wellKnown: "https://api.fusionfabric.cloud/login/v1/sandbox/.well-known/openid-configuration",
      token: "https://api.fusionfabric.cloud/login/v1/sandbox/oidc/authorize",
      authorization: {
        url: "https://api.fusionfabric.cloud/login/v1/sandbox/oidc/authorize",
        params: { scope: "openid", grant_type: "authorization_code" }
      },
      idToken: true,
      checks: ["pkce", "state"],
      clientId: process.env.FINASTRA_CLIENT_ID,
      clientSecret: process.env.FINASTRA_CLIENT_SECRET,
      profile(profile) {
        return {
          // xid: profile.sub,
          username: profile.username
        }
      },
    } 
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log('signIn');
      return true
    },
    async redirect({ url, baseUrl }) {
      console.log('redirect');
      return baseUrl
    },
    async session({ session, user, token }) {
      console.log('session!!!');
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log('token');
      return token
    }
  }
});