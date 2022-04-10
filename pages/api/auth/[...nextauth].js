import NextAuth from "next-auth";

export default NextAuth({
  providers: [
    {
      id: "finastra",
      name: "Finastra",
      type: "oauth",
      version: "2.0",
      debug: true,
      scope: "openid",
      wellKnown: "https://api.fusionfabric.cloud/login/v1/sandbox/.well-known/openid-configuration",
      authorization: {
      //   url: "https://api.fusionfabric.cloud/login/v1/sandbox/oidc/authorize",
        params: { scope: "openid", grant_type: "authorization_code" }
      },
      // token: "https://api.fusionfabric.cloud/login/v1/sandbox/oidc/token",
      idToken: true,
      state: false,
      // checks: ["pkce", "state"],
      clientId: process.env.FINASTRA_CLIENT_ID,
      clientSecret: process.env.FINASTRA_CLIENT_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          username: profile.username
        }
      },
    } 
  ],
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     console.log('signIn');
  //     return true
  //   },
  //   async redirect({ url, baseUrl }) {
  //     console.log('redirect');
  //     return baseUrl
  //   },
    async session({ session, user, token }) {
      session.user = token.sub;
      session.accessToken = token.accessToken;
      console.log('=== Session callback ===');
      console.log('session:', session);
      console.log('accessToken:', token.accessToken);
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      console.log('=== JWT callback ===');
      console.log('token:', token);
      console.log('account:', account);
      console.log('user:', user);
      // user && (token.user = user);
      return token;
    }
  }
});