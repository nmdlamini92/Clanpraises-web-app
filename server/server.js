import fastify from "fastify"
import sensible from "@fastify/sensible"
import cors from "@fastify/cors"
import cookie from "@fastify/cookie"
import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client"
import jwt from "jsonwebtoken";
import { google } from "googleapis"
import clanPraiseRoutes from "./Routes/All-Routes.js"
import { v4 as uuidv4 } from "uuid"

dotenv.config()

const app = fastify()
app.register(sensible)
app.register(clanPraiseRoutes);

app.register(cookie, { secret: process.env.COOKIE_SECRET })
app.register(cors, {
  origin: ['*', process.env.CLIENT_URL, 'http://localhost:3000', 'http://192.168.1.172:3000', 'http://192.168.1.185:3000'],
  method: ["GET", "POST"],
  credentials: true,
})
const prisma = new PrismaClient()

/*
const CURRENT_USER_ID = (
  await prisma.user.findFirst({ where: { name: "Sally" } })
).id
*/

const maxAge = 3 *24*60*60;   
//const jwt = jsonwebtoken();

const createToken = (id) => {                               //creates signed web session id 
    return jwt.sign({id}, "ligusha", {                      //"ligusha" secret key, make sure is in envir var whn deploying to server
        expiresIn: maxAge,
    });   
};

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GMAIL_CLIENT_ID,
  process.env.GMAIL_CLIENT_SECRET,
  process.env.GMAIL_REDIRECT_URI
);

oauth2Client.setCredentials({
  refresh_token: process.env.GMAIL_REFRESH_TOKEN,
});

app.addHook("onRequest", (req, res, done) => {
  console.log('sent request to server');
  console.log(req.cookies);
  /*
  const cookieZero = req.cookies.userId;
  console.log(cookieZero);

  if (req.cookies.userId !== CURRENT_USER_ID) {
    req.cookies.userId = CURRENT_USER_ID
    res.clearCookie("userId")
    res.setCookie("userId", CURRENT_USER_ID)
    console.log('you are now the user Kyle');
  } */

  let visitorId = req.cookies.visitorId
  console.log(visitorId);
  console.log(!visitorId);

  if (!visitorId) {
    visitorId = uuidv4();
    res.setCookie('visitorId', visitorId, {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000) // 1 year expiration
    });
  }
  done()
})

const COMMENT_SELECT_FIELDS = {
  id: true,
  message: true,
  rating: true,
  index: true,
  parentId: true,
  createdAt: true,
  user: {
    select: {
      id: true,
      username: true,
    },
  },
}

app.get("/headers/:id", async (req, res) => {

  return await commitToDb(
    prisma.post
      .findUnique({
        where: { id: req.params.id },
        select: {
          body: true,
          title: true,
          tribe: true,
        }
      })
    )

})

app.get("/users", async (req, res) => {
  console.log("now inside get users server");

    return await commitToDb(
       prisma.user1.findMany({ select:{
          id: true,
          username: true
          }
        })
    )
})


app.post("/getUserId", async (req, res) => {
  console.log("THIS IS GET USER ID THIS IS GET USER ID");

    console.log(req.body);

    const jwtCookie = req.cookies.jwt
  
          const decodedToken = await new Promise((resolve, reject) => {
            jwt.verify(jwtCookie, "ligusha", (err, decoded) => {
              if (err) {
                reject(err);
              } else {
                resolve(decoded);
              }
            });
          });
          console.log(decodedToken);
          res.send({status: true, decodedToken: decodedToken.id})
  }
)


app.get("/tribes", async (req, res) => {
  console.log("now inside GET TRIBES server");

    return await commitToDb(
       prisma.tribe.findMany({ select:{
          id: true,
          tribe: true,
          praises_Plural: true,
          _count: {select: {clanpraises: true}}
       }
     })
    )
})

app.get("/clanNames", async (req, res) => {
  console.log("now inside get clan names server");

  return await commitToDb(
    prisma.post.findMany({ select:{
       //id: true,
       title: true,
    }
  })
 )

})

app.get("/clanNames/:tribe", async (req, res) => {
  console.log("now inside get clan names by tribe server");

  console.log(req.params.tribe);

  const tribeId =  await prisma.tribe.findUnique({ 
    where: {tribe: req.params.tribe},
    select:{id: true}
  })
  console.log(tribeId)

  if (tribeId==null) {
    return []
  }

  return await commitToDb(
    prisma.post.findMany({ 
      where: { tribeId: tribeId.id },
      select: { 
        id: true,
        title: true },
  })
 )
 
})


app.get("/posts", async (req, res) => {
  console.log("now inside get posts server");

    return await commitToDb(
       prisma.post.findMany({ 
        select:{
          id: true,
          title: true,
          tribe: true,
          },
      })
    )
})


app.get("/posts/:tribe/:clanName", async (req, res) => {
  console.log("now inside get posts by tribe & clanName server");

    return await commitToDb(
       prisma.post.findMany({ 
        where: {tribe: req.params.tribe,
                title: req.params.clanName,
               },
        select:{
          id: true,
          title: true,
          tribe: true,
          body: true,
          createdAt: true,
          userId: true,
          user: {select: {username: true},
          },
          _count: {select: {views: true, reviews: true, comments: true}}, //likesCP: true,
          reviews: { orderBy: {createdAt: "desc",},
                      select: {...COMMENT_SELECT_FIELDS },
                  },
        },
      })
    )
    
})


app.get("/posts/:id", async (req, res) => {
  console.log("now inside get post(id) server");

  const jwtCookie = req.cookies.jwt
      console.log(req.params);
      console.log(req.cookies);
      console.log(!jwtCookie);

      if (!jwtCookie){

        return await commitToDb(
          prisma.post
            .findUnique({
              where: { id: req.params.id },
              select: {
                body: true,
                title: true,
                tribe: true,
                createdAt: true,
                user: {select: {id: true, username: true} },
                _count: {select: {views: true, reviews: true, comments: true}}, 
                reviews: {
                  orderBy: {createdAt: "desc",},
                  select: {...COMMENT_SELECT_FIELDS, definitionId: true,
                          _count: {select: { likes: true, disLikes: true}},},
                },
                comments: {
                  orderBy: {createdAt: "desc",},
                  select: {...COMMENT_SELECT_FIELDS, definitionId: true,
                    _count: {select: { likes: true, disLikes: true }},
                  }},
                definitions: {
                  orderBy: {createdAt: "desc",},
                  select: {...COMMENT_SELECT_FIELDS, index: true, 
                          _count: {select: { likes: true, disLikes: true, reviews: true }},
                          },
                  },
              },
            })
            .then(async post => {
            
              return {
                ...post,
                reviews: post.reviews.map(review => {
                  const { _count, ...reviewFields } = review
                  return {
                    ...reviewFields,
                    _count: _count,
                    likedByMe: false,
                    disLikedByMe: false,
                  }
                }),
                comments: post.comments.map(comment => {
                  const { _count, ...commentFields } = comment
                  return {
                    ...commentFields,
                    _count: _count,
                    likedByMe: false,
                    disLikedByMe: false,
                    likeCount: _count.likes,
                    disLikeCount: _count.disLikes,
                  }
                }),
                definitions: post.definitions.map(definition => {
                  const { _count, ...definitionFields } = definition
                  return {
                    ...definitionFields,
                    _count: _count,
                    likedByMe: false,
                    disLikedByMe: false,
                    likeCount: _count.likes,
                    disLikeCount: _count.disLikes,
                  }
                })
              }
            })
          )
      }
      else{
        console.log("now in else part");
      
      try{
        const decodedToken = await new Promise((resolve, reject) => {
          jwt.verify(jwtCookie, "ligusha", (err, decoded) => {
            if (err) {
              reject(err);
              //console.log(decodedToken);
              console.log(err);
              //reject(err);
            } else {
              resolve(decoded);
            }
          });
        });
     
        //const data = {userId: decodedToken.id, postId: req.params.id}

      return await commitToDb(
        prisma.post.findUnique({
            where: { id: req.params.id },
            select: {
              body: true,
              title: true,
              tribe: true,
              createdAt: true,
              user: {select: {id: true, username: true} },
              _count: {select: {views: true, comments: true}}, 
              reviews: {
                orderBy: {createdAt: "desc",},
                select: {...COMMENT_SELECT_FIELDS, definitionId: true, 
                  _count: {select: { likes: true, disLikes: true}},},
              },
              comments: {
                orderBy: {createdAt: "desc",},
                select: {...COMMENT_SELECT_FIELDS, definitionId: true, 
                  _count: {select: { likes: true, disLikes: true }},},
              },
              definitions: {
                orderBy: {createdAt: "desc",},
                select: {...COMMENT_SELECT_FIELDS, index: true,
                  _count: {select: { likes: true, disLikes: true, reviews: true }},},
              },

            },
          })
          .then(async post => {

            const likesRev = await prisma.like_on_Review.findMany({
              where: {
                userId: decodedToken.id,
                reviewId: { in: post.reviews.map(review => review.id) },
              },
            }) 
            const disLikesRev = await prisma.disLike_on_Review.findMany({
              where: {
                userId: decodedToken.id,
                reviewId: { in: post.reviews.map(review => review.id) },
              },
            }) 

            const likesDef = await prisma.like_on_Definition.findMany({
              where: {
                userId: decodedToken.id,
                definitionId: { in: post.definitions.map(definition => definition.id) },
              },
            }) 
            const disLikesDef = await prisma.disLike_on_Definition.findMany({
              where: {
                userId: decodedToken.id,
                definitionId: { in: post.definitions.map(definition => definition.id) },
              },
            }) 

            const likesCom = await prisma.like_on_Comment.findMany({
              where: {
                userId: decodedToken.id,
                commentId: { in: post.comments.map(comment => comment.id) },
              },
            }) 
            const disLikesCom = await prisma.disLike_on_Comment.findMany({
              where: {
                userId: decodedToken.id,
                commentId: { in: post.comments.map(comment => comment.id) },
              },
            }) 
        
            return {
              ...post,
              reviews: post.reviews.map(review => {
                const { _count, ...reviewFields } = review
                return {
                  _count: _count,
                  ...reviewFields, 
                  likedByMe: likesRev.find(like => like.reviewId === review.id),
                  disLikedByMe: disLikesRev.find(disLike => disLike.reviewId === review.id),
                }
              }),
              comments: post.comments.map(comment => {
                const { _count, ...commentFields } = comment
                return {
                  _count: _count,
                  ...commentFields,
                  likedByMe: likesCom.find(like => like.commentId === comment.id),
                  disLikedByMe: disLikesCom.find(disLike => disLike.commentId === comment.id),
                  likeCount: _count.likes,
                  disLikeCount: _count.disLikes,
                }
              }),
              definitions: post.definitions.map(definition => {
                const { _count, ...definitionFields } = definition
                return {
                  _count: _count,
                  ...definitionFields,
                  likedByMe: likesDef.find(like => like.definitionId === definition.id),
                  disLikedByMe: disLikesDef.find(disLike => disLike.definitionId === definition.id),
                  likeCount: _count.likes,
                  disLikeCount: _count.disLikes,
                }
              })
            }
          })
        )
      }
      catch(err){
        console.log({FOOOKKKKK: err});

        return await commitToDb(
          prisma.post
            .findUnique({
              where: { id: req.params.id },
              select: {
                body: true,
                title: true,
                tribe: true,
                createdAt: true,
                user: {select: {id: true, username: true} },
                _count: {select: {views: true, comments: true}}, 
                reviews: {
                  orderBy: {createdAt: "desc",},
                  select: {...COMMENT_SELECT_FIELDS, definition: true,
                    _count: {select: { likes: true, disLikes: true}},},
                },
                comments: {
                  orderBy: {createdAt: "desc",},
                  select: {...COMMENT_SELECT_FIELDS, definitionId: true,
                    _count: {select: { likes: true, disLikes: true}},},
                },
                definitions: {
                  orderBy: {createdAt: "desc",},
                  select: {...COMMENT_SELECT_FIELDS, index: true, 
                    _count: {select: { likes: true, disLikes: true, reviews: true}},},
                },  
              },
            })
            .then(async post => {
            
              return {
                ...post,
                reviews: post.reviews.map(review => {
                  const { _count, ...reviewFields } = review
                  return {
                    ...reviewFields,
                    _count: _count,
                    likedByMe: false,
                    disLikedByMe: false,
                    likeCount: _count.likes,
                    disLikeCount: _count.disLikes,
                  }
                }),
                comments: post.comments.map(comment => {
                  const { _count, ...commentFields } = comment
                  return {
                    ...commentFields,
                    _count: _count,
                    likedByMe: false,
                    disLikedByMe: false,
                    likeCount: _count.likes,
                    disLikeCount: _count.disLikes,
                  }
                }),
                definitions: post.definitions.map(definition => {
                  const { _count, ...definitionFields } = definition
                  return {
                    ...definitionFields,
                    _count: _count,
                    likedByMe: false,
                    disLikedByMe: false,
                    likeCount: _count.likes,
                    disLikeCount: _count.disLikes,
                  }
                })
              }
            })
          )
      }
    }
})

app.post("/posts/:id/viewpost", async (req, res) => {
  console.log("now inside viewpost server");
  console.log(req.body);
  console.log(req.cookies);

  const postId = req.body.postId;
  const visitorId = req.cookies.visitorId;
  const token = req.cookies.jwt;

  console.log(postId);
  console.log(visitorId);
  console.log(token);

    try{
      if (token){
        const decodedToken = await new Promise((resolve, reject) => {
          jwt.verify(token, "ligusha", (err, decoded) => {
            if (err) {
              reject(err);
            } else {
              resolve(decoded);
            }
          });
        });

        const lastViewByUser = await prisma.views.findFirst({
          where: { vieweeId: decodedToken.id },
          orderBy: { createdAt: 'desc' },
        });

        if (lastViewByUser){
          const createdAt = new Date(lastViewByUser.createdAt);
          const now = new Date();
          const lastViewByUserAge = Math.floor((now - createdAt) / 1000);

          if (lastViewByUserAge > 15){
            return await prisma.views.create({ 
              data: {
                post: {connect: { id: postId }},
                vieweeId: decodedToken.id
              },
            })
          .then(res.send({status: true, message: "another (registered) user view added"}));
          }
          else{
            return res.send({status: false, message: "no user view added - not enough time passed since last view by signed-in user"});
          }
        }
        else{
          return await prisma.views.create({ 
            data: {
              post: {connect: { id: postId }},
              vieweeId: decodedToken.id
            },
          })
        .then(res.send({status: true, message: "first (signed-in) user view added"}));
        }
      }
      else{

        const lastViewByVisitor = await prisma.views.findFirst({
          where: { vieweeId: visitorId },
          orderBy: { createdAt: 'desc' },
        });

        if (lastViewByVisitor){
          const createdAt = new Date(lastViewByVisitor.createdAt);
          const now = new Date();
          const lastViewByVisitorAge = Math.floor((now - createdAt) / 1000);

          if (lastViewByVisitorAge > 15){
            return await prisma.views.create({ 
              data: {
                post: {connect: { id: postId }},
                vieweeId: visitorId
              },
            })
          .then(res.send({status: true, message: "another (visitor) user view added"}));
          }
          else{
            return res.send({status: false, message: "no visotor view added - not enough time passed since last view by visitor"});
          }
        }
        else{
          return await prisma.views.create({ 
            data: {
              post: {connect: { id: postId }},
              vieweeId: visitorId
            },
          })
        .then(res.send({status: true, message: "first (visitor) user view added"}));
        } 
      }
    }
    catch(error){
      console.log(error);
      return res.send({status: false, message: error});
    }
})

 
app.post("/reports", async (req, res) => {
  console.log("now inside report clan praise controller");
  console.log(req.body);
  console.log(req.cookies)

  try{
      //const LoggedReport = await
      return await commitToDb (prisma.report.create({
        data: {
          //type: req.body.type,
          message: req.body.message,
          postId:  req.body.postId,                    //post: {connect: { id: req.body.postId }}
          definitionId: req.body.definitionId,
          commentId: req.body.commentId,
          reviewId: req.body.reviewId,
        },
      })
      .then(report => {
        return {
         reportLogged: "report successfully logged"
        }
      })
    )  //res.send({reportLogged: true, message: LoggedReport})
   }
   catch(error){
    console.log(error)
    res.send({reportLogged: false, error: error})
   }
})



app.post("/delete_ClanPraise", async (req, res) => {
  console.log("now inside DELETE CLAN PRAISE controller");

  const post = req.body.post;
  console.log(post);
  console.log(post.id);

    try{
  
      const backUpClanPraise = await prisma.trashCan_ClanPraises.create({
          data: {
            clan: post.title,
            tribe: post.tribe,
            body: post.body,
            definitions: JSON.stringify(post.definitions),
            reviews: JSON.stringify(post.reviews),
            comments: JSON.stringify(post.definitions),
          },
        })
  
          const deleted_ClanPraiseID =  await
              prisma.post.delete({
                where: { id: post.id },
                select: { id: true },
              })
          
        res.send({isDeleted: true, message:"deleted clan praise successfully"})
      }
      catch(error){
        console.log(error);
        res.send({isDeleted: false, error: error})
      }
})
 
app.post("/posts/:id/reviews", async (req, res) => {
  console.log(req.body);
  console.log(req.body.message[1])

  if (req.body.message[0] === "" && req.body.message[1] !== null) {

    return res.send(app.httpErrors.badRequest("Message is f**kn required"))
  }
  if (req.body.message[0] !== "" && req.body.message[1] === null) {
    return res.send(app.httpErrors.badRequest("Rating is required"))
  }
  if (req.body.message[0] === "" && req.body.message[1] == null) {
    return res.send(app.httpErrors.badRequest("Rating and comment required"))
  }

  const jwtCookie = req.cookies.jwt
  console.log(jwtCookie);

  const decodedToken = await new Promise((resolve, reject) => {
    jwt.verify(jwtCookie, "ligusha", (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });

  return await commitToDb(
    prisma.review
      .create({
        data: {
          message: req.body.message[0],
          rating: req.body.message[1],
          userId: decodedToken.id,
          parentId: req.body.parentId,
          postId: req.params.id,
        },
        select: {...COMMENT_SELECT_FIELDS, _count: {select: { likes: true, disLikes: true}},},
      })
      .then(review => {
        return {
          ...review,
          likeCount: 0,
          disLikeCount: 0,
          likedByMe: false,
          disLikedByMe: false,
        }
      })
  )
})


app.put("/posts/:postId/reviews/:reviewId", async (req, res) => {
  if (req.body.message === "" || req.body.message == null) {
    return res.send(app.httpErrors.badRequest("Message is required"))
  }

  const { userId } = await prisma.review.findUnique({
    where: { id: req.params.reviewId },
    select: { userId: true },
  })
  if (userId !== req.cookies.jwt) {
    return res.send(
      app.httpErrors.unauthorized(
        "You do not have permission to edit this message"
      )
    )
  }

  return await commitToDb(
    prisma.comment.update({
      where: { id: req.params.reviewId },
      data: { message: req.body.message },
      select: { message: true },
    })
  )
})

app.delete("/posts/:postId/reviews/:reviewId", async (req, res) => {
  console.log("now inside DELETE REVIEW controller");
  console.log(req.body);
  console.log(req.params);
  console.log(req.cookies);
  const jwtCookie = req.cookies.jwt

  const decodedToken = await new Promise((resolve, reject) => {
    jwt.verify(jwtCookie, "ligusha", (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });

  const { userId } = await prisma.review.findUnique({
    where: { id: req.params.reviewId },
    select: { userId: true },
  })
  console.log(userId);
  console.log(decodedToken.id);
  
  if (userId !== decodedToken.id) {
    return res.send(
      app.httpErrors.unauthorized(
        "You do not have permission to delete this message"
      )
    )
  }

  return await commitToDb(
    prisma.review.delete({
      where: { id: req.params.reviewId },
      select: { id: true },
    })
  )
})

app.post("/posts/:postId/reviews/:reviewId/toggleLike", async (req, res) => {
  console.log("now inside LIKE REVIEW server")

  console.log(req.params)
  console.log(req.cookies)
  const jwtCookie = req.cookies.jwt 
  
  const decodedToken = await new Promise((resolve, reject) => {
    jwt.verify(jwtCookie, "ligusha", (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });

  const data = {
    reviewId: req.params.reviewId,
    userId: decodedToken.id,
  }


  const like = await prisma.like_on_Review.findUnique({
    where: { userId_reviewId: data },
  })
  console.log(like)

  if (like == null) {
    return await commitToDb(prisma.like_on_Review.create({ data: data })).then(() => {
      return { addLike: true }
    })
  } else {
    return await commitToDb(
      prisma.like_on_Review.delete({ where: { userId_reviewId: data } })
    ).then(() => {
      return { addLike: false }
    })
  }
})

app.post("/posts/:postId/reviews/:reviewId/toggleDisLike", async (req, res) => {
  console.log("now inside DISLIKE REVIEW server")

  console.log(req.params)
  console.log(req.cookies)
  const jwtCookie = req.cookies.jwt 
  
  const decodedToken = await new Promise((resolve, reject) => {
    jwt.verify(jwtCookie, "ligusha", (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
  console.log(decodedToken)

  const data = {
    reviewId: req.params.reviewId,
    userId: decodedToken.id,
  }

  const dislike = await prisma.disLike_on_Review.findUnique({
    where: { userId_reviewId: data },
  })
  console.log(dislike)

  if (dislike == null) {
    return await commitToDb(prisma.disLike_on_Review.create({ data: data })).then(() => {
      return { addDisLike: true }
    })
  } else {
    return await commitToDb(
      prisma.disLike_on_Review.delete({ where: { userId_reviewId: data } })
    ).then(() => {
      return { addDisLike: false }
    })
  }
})

app.post("/posts/:id/comments", async (req, res) => {
  console.log("inside CREATE COMMENT server")
  console.log(req.body)
  console.log(req.params)

  if (req.body.message === "" || req.body.message == null) {
    return res.send(app.httpErrors.badRequest("Message is f**kn required"))
  }

  const jwtCookie = req.cookies.jwt
  console.log(jwtCookie);

   const decodedToken = await new Promise((resolve, reject) => {
    jwt.verify(jwtCookie, "ligusha", (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });

  return await commitToDb(
    prisma.comment
      .create({
        data: {
          message: req.body.message,
          userId: decodedToken.id,
          parentId: req.body.parentId,
          postId: req.params.id,
          definitionId: req.body.definitionId,
          index: req.body.index,
        },
        select: {...COMMENT_SELECT_FIELDS, definitionId: true,}
          //_count: {select: { likes: true, disLikes: true}},},
      })
      .then(comment => {
        return {
          ...comment,
          likeCount: 0,
          disLikeCount: 0,
          likedByMe: false,
          disLikeCount: false,
        }
      })
  )
})

app.put("/posts/:postId/comments/:commentId", async (req, res) => {
  if (req.body.message === "" || req.body.message == null) {
    return res.send(app.httpErrors.badRequest("Message is required"))
  }

  const { userId } = await prisma.comment.findUnique({
    where: { id: req.params.commentId },
    select: { userId: true },
  })
  if (userId !== req.cookies.jwt) {
    return res.send(
      app.httpErrors.unauthorized(
        "You do not have permission to edit this message"
      )
    )
  }

  return await commitToDb(
    prisma.comment.update({
      where: { id: req.params.commentId },
      data: { message: req.body.message },
      select: { message: true },
    })
  )
})

app.delete("/posts/:postId/comments/:commentId", async (req, res) => {
    console.log("now inside DELETE COMMENT server")

  const jwtCookie = req.cookies.jwt 

  const decodedToken = await new Promise((resolve, reject) => {
    jwt.verify(jwtCookie, "ligusha", (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });

  const { userId } = await prisma.comment.findUnique({
    where: { id: req.params.commentId },
    select: { userId: true },
  })

  if (userId !== decodedToken.id) {
    return res.send(
      app.httpErrors.unauthorized(
        "You do not have permission to delete this message"
      )
    )
  }

  return await commitToDb(
    prisma.comment.delete({
      where: { id: req.params.commentId },
      select: { id: true },
    })
  )
})

app.post("/posts/:postId/comments/:commentId/toggleLike", async (req, res) => {
  console.log("now inside LIKE COMMENT server")

  console.log(req.params)
  console.log(req.cookies)
  const jwtCookie = req.cookies.jwt 

  const decodedToken = await new Promise((resolve, reject) => {
    jwt.verify(jwtCookie, "ligusha", (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });

  const data = {
    commentId: req.params.commentId,
    userId: decodedToken.id,
  }

  const like = await prisma.like_on_Comment.findUnique({
    where: { userId_commentId: data },
  })

  if (like == null) {
    return await commitToDb(prisma.like_on_Comment.create({ data: data })).then(() => {
      return { addLike: true }
    })
  } else {
    return await commitToDb(
      prisma.like_on_Comment.delete({ where: { userId_commentId: data } })
    ).then(() => {
      return { addLike: false }
    })
  }
})

app.post("/posts/:postId/comments/:commentId/toggleDisLike", async (req, res) => {
  console.log("now inside DISLIKE COMMENT server")

  console.log(req.params)
  console.log(req.cookies)
  const jwtCookie = req.cookies.jwt 

  const decodedToken = await new Promise((resolve, reject) => {
    jwt.verify(jwtCookie, "ligusha", (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });

  const data = {
    commentId: req.params.commentId,
    userId: decodedToken.id,
  }

  const dislike = await prisma.disLike_on_Comment.findUnique({
    where: { userId_commentId: data },
  })

  if (dislike == null) {
    return await commitToDb(prisma.disLike_on_Comment.create({ data: data })).then(() => {
      return { addDisLike: true }
    })
  } else {
    return await commitToDb(
      prisma.disLike_on_Comment.delete({ where: { userId_commentId: data } })
    ).then(() => {
      return { addDisLike: false }
    })
  }
})


app.post("/getLineDefinitions", async (req, res) => {
  console.log("now inside get DEFINITIONS server");

  console.log(req.cookies);
  const jwtCookie = req.cookies.jwt
  console.log(!jwtCookie);

      console.log(req.body);

      const data = {
        postId: req.body.postId,
        index: req.body.index,
      }
      
      if (!jwtCookie){

      try{
        const Definitions_Array1 = await prisma.definition.findMany({ 
          where: data,
          select: {
            ...COMMENT_SELECT_FIELDS,
            reviews: {
              orderBy: {createdAt: "desc",},
              select: {...COMMENT_SELECT_FIELDS, _count: {select: { likes: true, disLikes: true }},},
            },
            comments: {
              orderBy: {createdAt: "desc",},
              select: {...COMMENT_SELECT_FIELDS, _count: {select: { likes: true, disLikes: true}},},
            },
            _count: {select: { likes: true, disLikes: true }},
            }
          }
        )

        console.log(Definitions_Array1)

        const Definitions_Array = Definitions_Array1.map(definition => ({
                ...definition, likedByMe: false, disLikedByMe: false,
                likeCount: definition._count.likes, disLikeCount:definition._count.disLikes
        }));


        console.log(Definitions_Array);
        res.send({status: true, Definitions_Array: Definitions_Array})
      }
      catch(error){
        console.log(error);
        res.send({error: error})
      }
    }
    else{
      try{
        const Definitions_Array1 = await prisma.definition.findMany({ 
          where: data,
          select: {
            ...COMMENT_SELECT_FIELDS,
            reviews: {
              orderBy: {createdAt: "desc",},
              select: {...COMMENT_SELECT_FIELDS, _count: {select: { likes: true, disLikes: true }},},
            },
            comments: {
              orderBy: {createdAt: "desc",},
              select: {...COMMENT_SELECT_FIELDS, _count: {select: { likes: true, disLikes: true}},},
            },
            likes: {
              select: {userId: true, definitionId: true}
            },
            disLikes: {
              select: {userId: true, definitionId: true}
            },
            _count: {select: { likes: true, disLikes: true }},
            }
          }
        )
        
        const decodedToken = await new Promise((resolve, reject) => {
          jwt.verify(jwtCookie, "ligusha", (err, decoded) => {
            if (err) {
              reject(err);
            } else {
              resolve(decoded);
            }
          });
        });
        console.log(decodedToken);

        const Definitions_Array = Definitions_Array1.map(definition => ({
                  ...definition,
                  likeCount: definition._count.likes, disLikeCount: definition._count.disLikes,
                  likedByMe: definition.likes.find(like => like.userId === decodedToken.id),
                  disLikedByMe: definition.disLikes.find(disLike => disLike.userId === decodedToken.id),
        }));

        console.log(Definitions_Array);
        res.send({status: true, Definitions_Array: Definitions_Array})
      }
      catch(error){
        console.log(error);
        res.send({error: error})
      }
    }
})


app.post("/posts/:id/definitions", async (req, res) => {

  console.log("now inside CREATE DEFINITION server")
  console.log(req.body);
  console.log(req.params)
  console.log(req.body.message)

  const jwtCookie = req.cookies.jwt
  console.log(jwtCookie);

  const decodedToken = await new Promise((resolve, reject) => {
    jwt.verify(jwtCookie, "ligusha", (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
  console.log(decodedToken.id);

  return await commitToDb(prisma.definition.create({
    data: {
          message: req.body.message,
          rating: req.body.rating,
          index: req.body.index,
          userId: decodedToken.id,
          //parentId: req.body.parentId,
          postId: req.params.id,
        },
        select: COMMENT_SELECT_FIELDS
      })
      .then(definition => {
        return {
          ...definition,
          _count: {likes: 0, disLikes: 0},
          likedByMe: false,
          disLikedByMe: false,
           likeCount: 0,
          disLikeCount: 0,
        }
      })
  ) 
})

app.post("/reviewDefinition", async (req, res) => {

  console.log("now inside REVIEW DEFINITION server")

  console.log(req.body);

  console.log(req.params)
  console.log(req.body.message[1])

  const jwtCookie = req.cookies.jwt
  console.log(jwtCookie);

  const decodedToken = await new Promise((resolve, reject) => {
    jwt.verify(jwtCookie, "ligusha", (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
  console.log(decodedToken.id);

      try{
  return await commitToDb(
    prisma.review
      .create({
        data: {
          message: req.body.message,
          rating: req.body.rating,
          index: req.body.index,
          userId: decodedToken.id,
          parentId: req.body.parentId,
          postId: req.body.postId,
          definitionId: req.body.definitionId,
        },
        select: {...COMMENT_SELECT_FIELDS, definitionId: true,
          _count: {select: { likes: true, disLikes: true}},},
      })
      .then(async review => {

        const updated_DefRating = await prisma.definition.update({
          where: {id: req.body.definitionId},
          data: {rating: req.body.newDefRating},
          select: {id: true, rating: true},
           // _count: {select: { likes: true, disLikes: true}},},
        })
        console.log(updated_DefRating)

        return {
          ...review,
          likeCount: 0,
          disLikeCount: 0,
          likedByMe: false,
          disLikedByMe: false,
        }
      })
    )
  }catch(error){
    console.log({errorName: "ERRRRRROR HERE", errorDesc: error})
  }

})


app.post("/commentOnDefinition", async (req, res) => {

  console.log("now inside COMMENT ON DEFINITION server")

  console.log(req.body);

  console.log(req.params)
  console.log(req.body.message[1])

  const jwtCookie = req.cookies.jwt
  console.log(jwtCookie);

  const decodedToken = await new Promise((resolve, reject) => {
    jwt.verify(jwtCookie, "ligusha", (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
  console.log(decodedToken.id);

      try{
  return await commitToDb(
    prisma.comment
      .create({
        data: {
          message: req.body.message,
          index: req.body.index,
          userId: decodedToken.id,
          parentId: req.body.parentId,
          postId: req.body.postId,
          definitionId: req.body.definitionId,
        },
        select: {...COMMENT_SELECT_FIELDS, definitionId: true,
          _count: {select: { likes: true, disLikes: true}},},
      })
      .then(async comment => {

        return {
          ...comment,
          likeCount: 0,
          disLikeCount: 0,
          likedByMe: false,
          disLikedByMe: false,
        }
      })
    )
  }catch(error){
    console.log({errorName: "ERRRRRROR HERE", errorDesc: error})
  }

})


app.put("/posts/:postId/definitions/:definitionId", async (req, res) => {

  console.log("now inside UPDATE DEFINITION RATING server")

  return await commitToDb(
    prisma.definition.update({
      where: { id: req.params.definitionId },
      data: { rating: req.body.rating },
      select: { id: true, rating: true },
    })
  )
})

app.delete("/posts/:postId/definitions/:definitionId", async (req, res) => {
  console.log("now inside DELETE DEFINITION controller");

  console.log(req.body)

  const jwtCookie = req.cookies.jwt

  const decodedToken = await new Promise((resolve, reject) => {
    jwt.verify(jwtCookie, "ligusha", (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });

  const { userId } = await prisma.definition.findUnique({
    where: { id: req.params.definitionId },
    select: { userId: true },
  })
  if (userId !== decodedToken.id) {
    return res.send(
      app.httpErrors.unauthorized(
        "You do not have permission to delete this message"
      )
    )
  }

  const backUpDefinition = await prisma.trashCan_Definitions.create({
    data: {
      clanPraiseId: req.body.definition.id,
      clan: req.body.clan,
      tribe: req.body.tribe,
      body: req.body.definition.message,
      reviews: JSON.stringify(req.body.reviews),
      comments: JSON.stringify(req.body.comments),
    },
  })

  return await commitToDb(
    prisma.definition.delete({
      where: { id: req.params.definitionId },
      select: { id: true },
    })
  )
})

app.post("/posts/:postId/definitions/:definitionId/toggleLike", async (req, res) => {
  console.log("now inside LIKE DEFINITION server")

  console.log(req.body)
  console.log(req.params)
  console.log(req.cookies)
  const jwtCookie = req.cookies.jwt 

  const decodedToken = await new Promise((resolve, reject) => {
    jwt.verify(jwtCookie, "ligusha", (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
  console.log(decodedToken)

  const data = {
    definitionId: req.params.definitionId,
    userId: decodedToken.id,
  }

  const like = await prisma.like_on_Definition.findUnique({
    where: { userId_definitionId: data },
  })

  if (like == null) {
    return await commitToDb(prisma.like_on_Definition.create({ data: data })).then(() => {
      return { addLike: true }
    })
  } else {
    return await commitToDb(
      prisma.like_on_Definition.delete({ where: { userId_definitionId: data } })
    ).then(() => {
      return { addLike: false }
    })
  }
})

app.post("/posts/:postId/definitions/:definitionId/toggleDisLike", async (req, res) => {

  console.log("now inside DISLIKE DEFINITION server");
  console.log(req.body);
  console.log(req.params);
  console.log(req.cookies);

  const jwtCookie = req.cookies.jwt;

  const decodedToken = await new Promise((resolve, reject) => {
    jwt.verify(jwtCookie, "ligusha", (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });

  console.log(decodedToken.id);

  const data = {
    definitionId: req.params.definitionId,
    userId: decodedToken.id,
  }

  const dislike = await prisma.disLike_on_Definition.findUnique({
    where: { userId_definitionId: data },
  })

  if (dislike == null) {
    return await commitToDb(prisma.disLike_on_Definition.create({ data: data })).then(() => {
      return { addDisLike: true }
    })
  } else {
    return await commitToDb(
      prisma.disLike_on_Definition.delete({ where: { userId_definitionId: data } })
    ).then(() => {
      return { addDisLike: false }
    })
  }
})

async function commitToDb(promise) {
  const [error, data] = await app.to(promise)
  if (error) return app.httpErrors.internalServerError(error.message)
  return data
}

app.listen({port: process.env.PORT, host: "0.0.0.0"},()=>{                                    //tells our app to be live on localhost:3001
  console.log("Server started on portland 3001")
})


