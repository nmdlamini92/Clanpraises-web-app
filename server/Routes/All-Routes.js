
import ClanPraiseController from "../Controllers/ClanPraise-Controller.js"
import AuthController from "../Controllers/Auth-Controller.js";
import checkSignInStatus from "../Middleware/checkSignInStatus.js";

//import app from "./server/"

export default async function clanPraiseRoutes(fastify, options) {

    fastify.post('/addclanpraise', ClanPraiseController.addClanPraise);
    fastify.post('/sendVcode', AuthController.sendVcode);
    fastify.post('/signup', AuthController.signup);
    fastify.post('/signin', AuthController.signin);
    fastify.post('/verifyuser', checkSignInStatus.checkLoginStatus);  
}

//module.exports = clanPraiseRoutes;