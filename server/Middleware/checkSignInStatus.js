import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()


export default class checkSignInStatus {

    static async checkLoginStatus(req, reply) {

        console.log('now inside MVC server verifyuser controller');

        console.log(req.body)
        console.log(req.cookies);
        const token = req.body.cookies.jwt;
        console.log(token);
      
        if (!token) {
          return reply.send({status: false, error: 'Token not provided' });
        }
      
        try {
          const decodedToken = await new Promise((resolve, reject) => {
            jwt.verify(token, "ligusha", (err, decoded) => {
              if (err) {
                console.error('ErrorERR:', err);
                //if (err.name === 'TokenExpiredError') {

                //}
                reject(err);
              } else {
                resolve(decoded);
              }
            });
          });

          console.log(decodedToken)
      
          const user = await prisma.user1.findUnique({
            where: { id: decodedToken.id },  // Assuming decodedToken has user id
            select: {id:true, username: true, tribe: true, clan: true}
          });

          console.log(user)
      
          const userId = decodedToken.id;
      
          if (!user) {
            return reply.send({status:false, error: 'user not found'})
          }
      
          console.log(user.id);
          return reply.send({status: true, UserId: user.id, UserName: user.username, userTribe: user.tribe, userClan: user.clan});
      
        } catch (err) {
          console.error('ErrorNAYI:', err);
          return reply.send({status: false, error: 'Internal Server Error', errorDetails: err });
        }
      }
    }
