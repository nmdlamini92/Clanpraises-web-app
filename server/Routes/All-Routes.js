
import ClanPraiseController from "../Controllers/ClanPraise-Controller.js"
import AuthController from "../Controllers/Auth-Controller.js";
import checkSignInStatus from "../Middleware/checkSignInStatus.js";
import { googleCallback } from "../Controllers/googleAuthController.js";
import { facebookCallback } from "../Controllers/facebookAuthController.js";
import oauth from "../plugins/oauth.js";

//import app from "./server/"

export default async function clanPraiseRoutes(fastify, options) {

    fastify.post('/addclanpraise', ClanPraiseController.addClanPraise);
    fastify.post('/addclanpraiseGuest', ClanPraiseController.addClanPraiseGuest);
    fastify.post('/sendVcode', AuthController.sendVcode);
    fastify.post('/checkUsernameAvailability', AuthController.checkUsernameAvailability);
    fastify.post('/checkEmailValidity', AuthController.checkEmailValidity);
    fastify.post('/followPost', ClanPraiseController.followPost);
    //fastify.get('/auth/google/callback', AuthController.googleCallback); 
    //fastify.get('/auth/facebook/callback', AuthController.facebookCallback);
    fastify.post('/signup', AuthController.signup);
    fastify.post('/signin', AuthController.signin);
    fastify.post('/verifyuser', checkSignInStatus.checkLoginStatus);  
    fastify.get("/auth/google/callback", googleCallback);
    fastify.get("/auth/facebook/callback", facebookCallback);
    
}
//module.exports = clanPraiseRoutes