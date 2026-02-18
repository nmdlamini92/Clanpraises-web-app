
import { PrismaClient } from '@prisma/client'
import jwt from "jsonwebtoken";
import dotenv from "dotenv"



const prisma = new PrismaClient()

dotenv.config()

const maxAge = 3 *24*60*60;   

const createToken = (id) => {                               //creates signed web session id 
    return jwt.sign({id}, process.env.COOKIE_SECRET, {                      //process.env.COOKIE_SECRET secret key, make sure is in envir var whn deploying to server
        expiresIn: maxAge,
    });   
};


export async function facebookCallback(req, reply) {

    console.log('now inside FACEBOOK AUTH controller');

    try {
      const token =
        await this.facebookOAuth2.getAccessTokenFromAuthorizationCodeFlow(req);

      console.log(token)

      const fbResponse = await fetch(
        `https://graph.facebook.com/me?fields=id,name,email&access_token=${token.token.access_token}`
      );

      console.log(fbResponse)

      const profile = await fbResponse.json();

      console.log(profile)


      const { id, email, name } = profile;

      let user = await prisma.user1.findFirst({
        where: {
          OR: [{ facebookId: id }, { email }],
        },
      });

      if (!user) {
        user = await prisma.user1.create({
          data: {
            facebookId: id,
            email: "",
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
            //domain: '.clanpraises.com',       //comment out in dev, activate in deployment
            path: '/',
        })
        //.send({ status: true, userID: user.id, userName: user.name, message: 'Sign-up with FACEBOOK successful' });
        .redirect(`${process.env.FRONTEND_URL}/auth/success?user=${{userId: user.id, username: user.username }}`);
        

    } catch (err) {
      console.error(err);
      //reply.send({ status: false, error: err})
      reply.redirect(`${process.env.FRONTEND_URL}/auth/error`);
    }

  }