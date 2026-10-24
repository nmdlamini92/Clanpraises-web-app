
//import ClanPraiseModel from "../Models/ClanPraise-Model.js"
import ClanPraiseModel from "../Models/ClanPraise-Model.js";
import jwt from "jsonwebtoken"
import { PrismaClient } from "@prisma/client";
import fetch from "node-fetch"
import { Resend } from "resend";

const prisma = new PrismaClient()

export default class ClanPraiseController {

    static async addClanPraise(req, reply) {
        console.log("now inside ADD CLAN-PRAISE server");
        console.log(req.body.siswatiVersion)
        console.log(req.body)

        //const clanName = req.body.clanName;
        //const tribe = req.body.tribe;
        //const clanPraise = req.body.clanPraise;
        console.log(req.body.tribeId);

        const token = req.cookies.jwt;
      
        const resend = new Resend(process.env.RESEND_API_KEY);

        try {
          const decodedToken = await new Promise((resolve, reject) => {
            jwt.verify(token.split(",")[0], process.env.COOKIE_SECRET, (err, decoded) => {
              if (err) {
                reject(err);
              } else {
                resolve(decoded);
              }
            });
          });

          if (req.body.tribeId === null){

            const newTribe = await prisma.tribe.create({
            data: {tribe: req.body.tribe.trim()},
            select: {id: true}
          });
          console.log(newTribe);

         const comment = await prisma.post.create({
            data: {
              title: req.body.clanName.trim(),
              tribe: req.body.tribe.trim(),
              tribe_: { connect: {id: newTribe.id} },
              body: req.body.clanPraise,
              bodyEnglish: req.body.englishVersion,
              bodySiswati: req.body.siswatiVersion,
              location: req.body.location,
              related: req.body.related,
              forbidden_foods: req.body.forbidden_foods,
              user: {
                connect: { id: decodedToken.id } // Use connect to link the post to a user by id
              },
            },
          });
          console.log(comment); 
          reply.send({status: true, clanPraisePost: comment});

          if (comment){
          //Start background process to send notification to admin
          console.log('STARTED BG PROCESS TO NOTIFY ADMIN OF ADDED CLANPRAISE')
            setTimeout(async () => {

          const postStillExists = await prisma.post.findUnique({ 
                  where: { id: comment.id },
                  select: { user: { select: { id: true, username: true } }}
          })

          console.log(postStillExists)
          console.log(!postStillExists)

          if (postStillExists) {

              try {

                const { data, error } = await resend.emails.send({
                  from: 'clanpraises@clanpraises.com',
                  to: 'nmdlamini92@gmail.com',
                  subject: `A ${comment.title} Clanpraise was added to ${comment.tribe} clanpraise`,
                  html: `
                    <p>
                      <strong>${postStillExists.user.username}</strong> added a <strong>${comment.title}</strong> clanpraise.
                      <a href="https://clanpraises.com/${comment.tribe}/${comment.title}/${comment.id}">
                        <strong>>>Click here to view clanpraise<<</strong>
                      </a>
                    </p>
                  `,
                });

                if (error) {
                  console.error(`Failed to send ADDED CLANPRAISE NOTIFICATION`, error);
                }

                console.log(`successfully sent ADDED CLANPRAISE NOTIFICATION`, data);
                reply.send({ status: true, message: 'successfully sent ADDED CLANPRAISE NOTIFICATION'});
              } catch (err) {
                console.error(`Failed to send ADDED CLANPRAISE NOTIFICATION`, err);
                reply.send({ status: false, message: 'Failed to send ADDED CLANPRAISE NOTIFICATION'});
              }
          }
          else{
            console.log('ABORTED SENDING ADDED-CLANPRAISE NOTIFICATION BCZ CLANPRAISE NO MORE EXISTS (GOT DELETED) ')
          }
          }, 30_000);
        }

        }
        else {

          const comment = await prisma.post.create({
            data: {
              title: req.body.clanName.trim(),
              tribe: req.body.tribe.trim(),
              tribe_: { connect: {id: req.body.tribeId} },
              body: req.body.clanPraise,
              bodyEnglish: req.body.englishVersion,
              bodySiswati: req.body.siswatiVersion,
              location: req.body.location,
              related: req.body.related,
              forbidden_foods: req.body.forbidden_foods,
              user: {
                connect: { id: decodedToken.id } // Use connect to link the post to a user by id
              },
            },
          });
          console.log(comment);
          reply.send({status: true, clanPraisePost: comment});


          if (comment){ 
          //Start background process to send notification to admin 
          console.log('STARTED BG PROCESS TO NOTIFY ADMIN OF ADDED CLANPRAISE')            
            setTimeout(async () => {

          const postStillExists = await prisma.post.findUnique({ 
                  where: { id: comment.id },
                  select: { user: { select: { id: true, username: true } }}
          })

          console.log(postStillExists)
          console.log(!postStillExists)

          if (postStillExists) {

              try {

                const { data, error } = await resend.emails.send({
                  from: 'clanpraises@clanpraises.com',
                  to: 'nmdlamini92@gmail.com',
                  subject: `A new Clanpraise was added to the website`,
                  html: `
                    <p>
                      <strong>${postStillExists.user.username}</strong> added a <strong>${comment.title} (${comment.tribe})</strong> clanpraise.
                      <a href="https://clanpraises.com/${comment.tribe}/${comment.title}/${comment.id}">
                        <strong>>>Click here to view clanpraise<<</strong>
                      </a>
                    </p>
                  `,
                });

                if (error) {
                  console.error(`Failed to send ADDED CLANPRAISE NOTIFICATION`, error);
                }

                console.log(`successfully sent ADDED CLANPRAISE NOTIFICATION`, data);
                reply.send({ status: true, message: 'successfully sent ADDED CLANPRAISE NOTIFICATION'});
              } catch (err) {
                console.error(`Failed to send ADDED CLANPRAISE NOTIFICATION`, err);
                reply.send({ status: false, message: 'Failed to send ADDED CLANPRAISE NOTIFICATION'});
              }
          }
          else{
            console.log('ABORTED SENDING ADDED-CLANPRAISE NOTIFICATION BCZ CLANPRAISE NO MORE EXISTS (GOT DELETED) ')
          }
          }, 30_000);
        }

        }
        
        } catch (error) {
          console.log(error);
          reply.send({status: false, errors: error});
        }
    }


    static async addClanPraiseGuest(req, reply) {
        console.log("now inside GUEST ADD-CLAN-PRAISE GUEST server");
        console.log(req.body)

        const clanName = req.body.clanName;
        const tribe = req.body.tribe;
        const clanPraise = req.body.clanPraise;
        const email = req.body.yourEmail;
        console.log(req.body.tribeId);

        //const token = req.cookies.jwt;

    try{

          const emailExists = await prisma.user1.findUnique({
            where: { email: req.body.yourEmail},
            select: { username: true }  
          });

        if (emailExists) {

              if (emailExists.username !== req.body.yourName) {

               return reply.send({ status: false, errors: {clanName:"", tribe:"", clanPraise:"", 
                  yourName:`continue as ${emailExists.username}`, 
                  yourEmail: ``},
                  existingName: emailExists.username,
                  //values: {clanName: clanName, tribe:tribe, clanPraise:clanPraise, yourName:emailExists.username, yourEmail: req.body.yourEmail}
                });

              }
              else {
    
                const userID = await prisma.user1.findUnique({
                  where: { email: req.body.yourEmail },
                  select: { id: true }
                });

                if (req.body.tribeId === null){

                  const newTribe = await prisma.tribe.create({
                    data: {tribe: req.body.tribe.trim()},
                    select: {id: true}
                    });
                    console.log(newTribe);

                  const comment = await prisma.post.create({
                      data: {
                        title: req.body.clanName.trim(),
                        tribe: req.body.tribe.trim(),
                        tribe_: { connect: {id: newTribe.id} },
                        body: req.body.clanPraise,
                        user: {
                          connect: { id: userID.id } // Use connect to link the post to a user by id
                        },
                      },
                    });
                    console.log(comment); 

                    reply.send({status: true, clanPraisePost: comment, guestEmail: req.body.yourEmail});

                  }
                  else {

                    const comment = await prisma.post.create({
                      data: {
                        title: req.body.clanName.trim(),
                        tribe: req.body.tribe.trim(),
                        tribe_: { connect: {id: req.body.tribeId} },
                        body: req.body.clanPraise,
                        user: {
                          connect: { id: userID.id } // Use connect to link the post to a user by id
                        },
                      },
                    });
                    console.log(comment);
                    reply.send({status: true, clanPraisePost: comment, guestEmail: req.body.yourEmail});
                  }

              }
        }
        else {
          console.log("email does not exist, creating new user"); 

          const usernameExists = await prisma.user1.findUnique({
            where: { username: req.body.yourName},  
          });
        console.log(usernameExists);

          if (usernameExists) {
            return reply.send({ status: false, errors: {clanName:"", tribe:"", clanPraise:"", 
                  yourName:"this name is linked to another email, please choose another name" ,
                  yourEmail:"",
                  existingName: "" }});
          }

          const verifyEmailDeliverability = async (email) => {
            const apiKey = process.env.MAILBOXLAYER_API_KEY;
            const res = await fetch(`https://apilayer.net/api/check?access_key=${apiKey}&email=${email}&smtp=1&format=1`);
            const data = await res.json();
            return data;
          };

          const emailValidation = await verifyEmailDeliverability(req.body.yourEmail);

          if (!emailValidation.smtp_check || !emailValidation.mx_found) {
            return reply.send({
              status: false,
              errors: {
                yourEmail: "please enter a valid email",
                yourName: "",
                clanName: "",
                tribe: "",
                clanPraise: ""
              }
            });
          }

          console.log("email seems valid, adding guest user & adding clan praise post...");

          const newUserGuest = await prisma.user1.create({
            data: {
              username: req.body.yourName,
              email: req.body.yourEmail,
            },
            select: {id: true}
          });

        if (req.body.tribeId === null){

            const newTribe = await prisma.tribe.create({
            data: {tribe: req.body.tribe.trim()},
            select: {id: true}
          });
          console.log(newTribe);

         const comment = await prisma.post.create({
            data: {
              title: req.body.clanName.trim(),
              tribe: req.body.tribe.trim(),
              tribe_: { connect: {id: newTribe.id} },
              body: req.body.clanPraise,
              user: {
                connect: { id: newUserGuest.id } // Use connect to link the post to a user by id
              },
            },
          });
          console.log(comment); 


          reply.send({status: true, clanPraisePost: comment, guestEmail: req.body.yourEmail });

        }
        else {

          const comment = await prisma.post.create({
            data: {
              title: req.body.clanName.trim(),
              tribe: req.body.tribe.trim(),
              tribe_: { connect: {id: req.body.tribeId} },
              body: req.body.clanPraise,
              user: {
                connect: { id: newUserGuest.id } // Use connect to link the post to a user by id
              },
            },
          });
          console.log(comment);
          reply.send({status: true, clanPraisePost: comment, guestEmail: req.body.yourEmail});
        }
      }

    } catch (error) {
        console.log(error);
        reply.send({status: false, errors: error});
    }
  }


    static async followPost(req, reply) {

    const verifyEmailDeliverability = async (email) => {
                const apiKey = process.env.MAILBOXLAYER_API_KEY;
                const res = await fetch(`https://apilayer.net/api/check?access_key=${apiKey}&email=${email}&smtp=1&format=1`);
                const data = await res.json();
                return data;
              };
    
              const emailValidation = await verifyEmailDeliverability(req.body.email);
    
              if (!emailValidation.smtp_check || !emailValidation.mx_found) {
                return reply.send({
                  status: false,
                  errors: {
                    email: "please enter a valid email",
                    //yourName: "",
                  }
                });
              }

  }

}
//module.exports = ClanPraiseController;