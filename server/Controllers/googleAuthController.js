
import { PrismaClient } from '@prisma/client'
import jwt from "jsonwebtoken";
//import { google } from "googleapis"
import dotenv from "dotenv"




const prisma = new PrismaClient()

dotenv.config()

const maxAge = 3 *24*60*60;   

const createToken = (id) => {                               //creates signed web session id 
    return jwt.sign({id}, process.env.COOKIE_SECRET, {                      //process.env.COOKIE_SECRET secret key, make sure is in envir var whn deploying to server
        expiresIn: maxAge,
    });   
};


/*const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);*/

/*oauth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});*/

export async function googleCallback(req, reply) {

  console.log("now in CONTINUE WITH GOOGLE AUTH server")

  try {
    const token =
      await req.server.googleOAuth2
        .getAccessTokenFromAuthorizationCodeFlow(req);

    console.log("TOKEN OBJECT:", token);

    const profile = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${token.token.access_token}`,
        },
      }
    ).then(r => r.json());

    console.log(profile)

    const { id, email, given_name, family_name } = profile;

    let user = await prisma.user1.findFirst({
      where: {
        OR: [{ googleId: id }, { email }],
      },
      select: { id: true, username: true },
    });

    console.log(user);

    if (!user) {
      user = await prisma.user1.create({
        data: {
          googleId: id,
          email: email,
          username: given_name,
          clan: family_name,
          //username: name?.replace(/\s+/g, "").toLowerCase(),
        },
        select: { id: true, username: true },
      });
    }

    const jwtToken = createToken(user.id);

    reply
      .setCookie("jwt", jwtToken, {
         withCredentials: true,
            httpOnly: false,            // Ensures cookie is only accessible via HTTP(S), not JavaScript
            maxAge: maxAge,             // Set cookie expiration time in seconds
            //secure: true,             //comment out in dev, activate in deployment (Ensures the cookie is only sent over HTTPS)
            //domain: '.clanpraises.com',       //comment out in dev, activate in deployment
            path: '/',
      })
      .redirect(`${process.env.FRONTEND_URL}/auth/success?user=${{userId: user.id, username: user.username }}`);
  } catch (err) {
    console.error(err);
    reply.redirect(`${process.env.FRONTEND_URL}/auth/error`);
  }
}





/*export async function googleCallback(req, reply) {

    console.log('now inside GOOGLE AUTH controller');

    try {
      const token =
        await this.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);

      const { data: profile } = await fetch(
        "https://www.googleapis.com/oauth2/v2/userinfo",
        {
          headers: {
            Authorization: `Bearer ${token.access_token}`,
          },
        }
      );

      const { id, email, name } = profile;

      let user = await prisma.user1.findFirst({
        where: {
          OR: [{ googleId: id }, { email }],
        },
        select: {
          id: true,
          username: true,
        }
      });

      if (!user) {
        user = await prisma.user1.create({
          data: {
            googleId: id,
            email,
            username: name?.replace(/\s+/g, "").toLowerCase(),
          },
          select: {
            id: true,
            username: true,
          }
        });
      }

      const jwt = createToken(user.id);

      reply
        .setCookie("jwt", jwt, {
           withCredentials: true,
            httpOnly: false,            // Ensures cookie is only accessible via HTTP(S), not JavaScript
            maxAge: maxAge,             // Set cookie expiration time in seconds
            //secure: true,             //comment out in dev, activate in deployment (Ensures the cookie is only sent over HTTPS)
            //domain: '.ilan.my',       //comment out in dev, activate in deployment
            path: '/',
        })
        //.send({ status: true, userID: user.id, userName: user.name, message: 'Sign-up with GOOGLE successful' });
        .redirect(`${process.env.FRONTEND_URL}/auth/success?userId=${user.id}`);

    } catch (err) {
      console.error(err);
      //reply.send({ status: false, error: err})
      reply.redirect(`${process.env.FRONTEND_URL}/auth/error`);
    }

  }*/