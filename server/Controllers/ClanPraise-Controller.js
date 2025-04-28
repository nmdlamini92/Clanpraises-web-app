
//import ClanPraiseModel from "../Models/ClanPraise-Model.js"
import ClanPraiseModel from "../Models/ClanPraise-Model.js";
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default class ClanPraiseController {

    static async addClanPraise(req, reply) {
        console.log("now inside ADD CLAN-PRAISE server");
        console.log(req.body)

        const clanName = req.body.clanName;
        const tribe = req.body.tribe;
        const clanPraise = req.body.clanPraise;
        console.log(req.body.tribeId);

        const token = req.cookies.jwt;

        try {
          const decodedToken = await new Promise((resolve, reject) => {
            jwt.verify(token, "ligusha", (err, decoded) => {
              if (err) {
                reject(err);
              } else {
                resolve(decoded);
              }
            });
          });

          if (req.body.tribeId){

          const comment = await prisma.post.create({
            data: {
              title: req.body.clanName,
              tribe: req.body.tribe,
              tribe_: { connect: {id: req.body.tribeId} },
              body: req.body.clanPraise,
              user: {
                connect: { id: decodedToken.id } // Use connect to link the post to a user by id
              },
            },
          });
          console.log(comment);
          reply.send({status: true, clanPraisePost: comment});
        }
        else {
          const comment = await prisma.post.create({
            data: {
              title: req.body.clanName,
              tribe: req.body.tribe,
              body: req.body.clanPraise,
              user: {
                connect: { id: decodedToken.id } // Use connect to link the post to a user by id
              },
            },
          });
          console.log(comment);
          reply.send({status: true, clanPraisePost: comment});
        }
        
        } catch (error) {
          console.log(error);
          reply.send({status: false, errors: error});
        }
    }
}
//module.exports = ClanPraiseController;