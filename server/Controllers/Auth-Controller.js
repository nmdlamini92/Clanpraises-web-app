//import UserModel from "../Models/User-Model.js"
import nodemailer from 'nodemailer'
import dotenv from "dotenv"
import { google } from "googleapis"
import { PrismaClient } from '@prisma/client'
import jwt from "jsonwebtoken";


dotenv.config()

const maxAge = 3 *24*60*60;   

const createToken = (id) => {                               //creates signed web session id 
    return jwt.sign({id}, process.env.COOKIE_SECRET, {                      //process.env.COOKIE_SECRET secret key, make sure is in envir var whn deploying to server
        expiresIn: maxAge,
    });   
};


const prisma = new PrismaClient()

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

export default class AuthController {

  static async checkUsernameAvailability(req, reply) {
    console.log('now inside CHECK USERNAME AVAILABILITY controller');
    console.log(req.body);

    const username = req.body.username;

    try {
     const usernameExists = await prisma.user1.findUnique({
          where: { username: username},  
        });
        console.log(usernameExists);

        if (usernameExists) {
          return reply.send({ status: false, errors: {username: "username already exists", clan: "", tribe: ""} });
        }
        else{
          return reply.send({ status: true, errors: {username: "", clan: "", tribe: ""} });
        }
    } 
    catch (error) {
      console.log(error);
      reply.send({ status: false, errors: {username: "error while checking username availability", clan: "", tribe: ""} });
    }
  }


  static async checkEmailValidity(req, reply) {

    const verifyEmailDeliverability = async (email) => {
    
                      try {
                        const apiKey = process.env.MAILBOXLAYER_API_KEY;
                        const res = await fetch(`https://apilayer.net/api/check?access_key=${apiKey}&email=${email}&smtp=1&format=1`);
    
                        const contentType = res.headers.get("content-type") || "";
                        if (!contentType.includes("application/json")) {
                          const text = await res.text();
                          console.error("Non-JSON response from MailboxLayer:", text.slice(0, 100));
                          return null;
                        }
    
                        const data = await res.json();
                        return data;
                      } 
                      catch (error) {
                      console.error("Error during email verification:", error.message);
                      return null;
                      }
                  };
    
                    const emailValidation = await verifyEmailDeliverability(req.body.yourEmail);
    
                      /*if (!emailValidation || !emailValidation.smtp_check || !emailValidation.mx_found) {*/
                      if (!emailValidation.format_valid) {
                        return reply.send({
                          status: false,
                          errors: {
                            message: "",
                            yourName: "",
                            yourEmail: "please enter a valid email",
                          },
                        });
                      }
                      else {
                        return reply.send({status: true, errors: {message: "", yourName: "", yourEmail: ""} });
                      }

  }

 

  static async sendVcode(req, reply) {

    console.log('now inside SEND-V-CODE controller');
    console.log(req.body);

    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password1;

  
    const OAuth2 = google.auth.OAuth2;

    const oauth2Client = new OAuth2(
      process.env.GMAIL_CLIENT_ID,
      process.env.GMAIL_CLIENT_SECRET,
      process.env.GMAIL_REDIRECT_URI
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.GMAIL_REFRESH_TOKEN,
    });

      try {
        const emailExists = await prisma.user1.findUnique({
          where: { email: email},  
        });

        if (emailExists) {
          return reply.send({ status: false, errors: {email: "email is already registered", password1: "", password2: ""} });
        }

        const usernameExists = await prisma.user1.findUnique({
          where: { username: username},  
        });

        if (usernameExists) {
          return reply.send({ status: false, errors: {username: "username already exists", email: "", password: ""} });
        }


        const accessToken = await oauth2Client.getAccessToken();
        console.log('AccessToken:', accessToken?.token);

        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            type: 'OAuth2',
            user: process.env.GMAIL_USER,
            clientId: process.env.GMAIL_CLIENT_ID,
            clientSecret: process.env.GMAIL_CLIENT_SECRET,
            refreshToken: process.env.GMAIL_REFRESH_TOKEN,
            accessToken: accessToken.token,
          },
        });

        // Generate random verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000);

        const mailOptions = {
          from: process.env.GMAIL_USER,
          to: email,
          subject: 'Your Verification Code',
          text: `Your verification code is: ${verificationCode}`,
        };
    
        // Send email
        await transporter.sendMail(mailOptions);
    
        reply.send({ status: true, message: 'Verification code sent', code: verificationCode, userDet: req.body });
      } catch (error) {
        console.log(error);
        reply.send({ status: false, errors: {email: "please enter a valid email", password1: "", password2: ""} });
      }

  }

static async signup(req, reply) {

    console.log('now inside SIGN-UP controller');
    console.log(req.body);

  try {
    const user1 = await prisma.user1.create({
      data: {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        tribe: req.body.tribe,
        clan: req.body.clan,
      },
      //select: { id: true },
    });
    
    const token = createToken(user1.id);
    console.log(user1.id);

    reply
    .setCookie('jwt', token, {
      withCredentials: true,
      httpOnly: false,            // Ensures cookie is only accessible via HTTP(S), not JavaScript
      maxAge: maxAge,             // Set cookie expiration time in seconds
      //secure: true,             //comment out in dev, activate in deployment (Ensures the cookie is only sent over HTTPS)
      //domain: '.clanpraises.com',       //comment out in dev, activate in deployment
      path: '/',
    })
    .send({ status: true, userID: user1.id, userName: user1.username, message: 'jwt cookie sent to client' });
    } 
    catch (error) {
      console.log(error);
      console.log(error.code);
      console.log(error.meta.target[0]);

      //const errors = handleErrors(error);
      return reply.send({status: false, error11: "oops! (this is awkward) It looks like site is currentyly under maintainance, plsease try again later"});
      //reply.status(500).send({ error: 'An error occurred while saving user details'});
    }
  }

  static async signin(req, reply) {
    console.log('now inside SIGN-IN server controller')

    const email = req.body.email;
    const password = req.body.password;

    try{
      const userExists = await prisma.user1.findUnique({
        where: { email: email},
        select: {id: true, username: true, password: true}  
      });
      if (userExists) {
        console.log(userExists.password);
        console.log(userExists.id);
          if (password == userExists.password) {

            const token = createToken(userExists.id);
            console.log(token) 

            reply.setCookie('jwt', token, {
              withCredentials: true, 
              //secure: true,                     //comment out in dev, activate in deployment
              httpOnly: false, 
              //domain: '.clanpraises.com',               //comment out in dev, activate in deployment
              sameSite: 'lax', 
              path: '/', 
              maxAge: maxAge})
            .send({ status: true, userName: userExists.username, userID: userExists.id, message: 'signed in successfully'});
          }
          reply.send({ status: false, errors: {email: "", password: "Incorrect password"}});
        }
      reply.send({ status: false, errors: {email: "Email is not registered", password: ""}});
    }
    catch(error){
      console.log(error);
    }
  }
}