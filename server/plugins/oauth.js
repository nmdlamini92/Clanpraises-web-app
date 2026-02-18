import fp from "fastify-plugin";
import oauth2 from "@fastify/oauth2";

export default fp(async function (fastify) {
  /* ===================== GOOGLE ===================== */
  fastify.register(oauth2, {
    name: "googleOAuth2",
    scope: ["profile", "email"],
    credentials: {
      client: {
        id: process.env.GOOGLE_CLIENT_ID,
        secret: process.env.GOOGLE_CLIENT_SECRET,
      },
      auth: {
        authorizeHost: "https://accounts.google.com",
        authorizePath: "/o/oauth2/v2/auth",
        tokenHost: "https://oauth2.googleapis.com",
        tokenPath: "/token",
      },
    },
    startRedirectPath: "/auth/google", 
    //callbackUri: `${process.env.API_BASE_URL}/googleCallback`,
    callbackUri: `${process.env.API_BASE_URL}/auth/google/callback`,
  });

  /* ===================== FACEBOOK ===================== */
  fastify.register(oauth2, {
    name: "facebookOAuth2",
    scope: ["email"],
    credentials: {
      client: {
        id: process.env.FACEBOOK_APP_ID,
        secret: process.env.FACEBOOK_APP_SECRET,
      },
      auth: {
        authorizeHost: "https://www.facebook.com",
        authorizePath: "/v18.0/dialog/oauth",
        tokenHost: "https://graph.facebook.com",
        tokenPath: "/v18.0/oauth/access_token",
      },
    },
    startRedirectPath: "/auth/facebook",
    callbackUri: `${process.env.API_BASE_URL}/auth/facebook/callback`,
  });
});
