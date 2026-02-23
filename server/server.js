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
//import userAnalyticsPlugin from './plugins/userAnalytics.js';
import fetch from "node-fetch"
import AuthController from "./Controllers/Auth-Controller.js"
import oauth from "./plugins/oauth.js"




const prisma = new PrismaClient()

dotenv.config()

const app = fastify({trustProxy: true}) //trustProxy: true, // Enable this if your app is behind a reverse proxy (like Nginx or Heroku) to correctly handle IP addresses and cookies

app.decorate('prisma', prisma);

app.register(cookie, { secret: process.env.COOKIE_SECRET })

app.register(sensible)

app.register(clanPraiseRoutes);

await app.register(oauth);


//await app.register(userAnalyticsPlugin);




app.register(cors, {
  origin: [
    'https://clanpraises.com',
    'https://www.clanpraises.com',
    'http://localhost:3000',
    'http://192.168.1.172:3000',
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});


//await app.register(import("./Routes/authroutes.js"));


app.listen({port: process.env.PORT_SERVER, host: process.env.HOST_SERVER},()=>{            //0.0.0.0 for prod                        //tells our app to be live on localhost:3001
  console.log("Server started")
})

async function commitToDb(promise) {
  const [error, data] = await app.to(promise)
  if (error) {
    console.error("DB error:", error);
   //throw app.httpErrors.internalServerError(error.message);
   return res.status(500).json([]); // ✅ return safe empty array
  }
  return data
}

/*
const CURRENT_USER_ID = (
  await prisma.user.findFirst({ where: { name: "Sally" } })
).id
*/

const maxAge = 3 *24*60*60;   
//const jwt = jsonwebtoken();

const createToken = (id) => {                               //creates signed web session id 
    return jwt.sign({id}, process.env.COOKIE_SECRET, {                      //process.env.COOKIE_SECRET secret key, make sure is in envir var whn deploying to server
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
  console.log('now inside onRequest ADDHOOK dala VISITOR_ID server');
  console.log("METHOD:", req.method);
  console.log("URL:", req.url);
  console.log(req.cookies);
  console.log("FOKKKKKKKKKIIIIIIIIIIIIIIIIIIIIIII")

  let visitorId = req.cookies.visitorId
  console.log(visitorId);
  console.log(!visitorId);

  if (!visitorId) {
    visitorId = uuidv4();
    res.setCookie('visitorId', visitorId, {
      path: '/',
      //domain: '.clanpraises.com',                    //comment out in dev, activate in deployment
      httpOnly: false,
      //secure: true,                          //comment out in dev, activate in deployment
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
  page: true,
  parentId: true,
  createdAt: true,
  user: {
    select: {
      id: true,
      username: true,
    },
  },
}

app.get('/analytics', async (req, res) => {

  const data = await prisma.userAnalytics.findMany();
  return data;
});

app.get("/headers/:id", async (req, res) => {

  return await commitToDb(
    prisma.post
      .findUnique({
        where: { id: req.params.id },
        select: {
          id: true,
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
            jwt.verify(jwtCookie, process.env.COOKIE_SECRET, (err, decoded) => {
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
          praises_Singular: true,
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
    select:{id: true, praises_Singular: true, praises_Plural: true}
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
 .then(async post => {
            
    return {
      post,
      tribeId
    }
  })
 
})


app.get("/posts", async (req, res) => {
  console.log("now inside get posts server");

    return await commitToDb(
       prisma.post.findMany({ 
        select:{
          id: true,
          title: true,
          tribe: true,
          tribe_: { select: { praises_Singular: true } },
          },
      })
    )
})


const TIME_SPANS = [
  1, // 24 hours
  3, // 3 days
  7, // 1 week
  14, // 2 weeks
  30, // 1 month
  90, // 3 months
  180, // 6 months
  365, // 1 year
  730, // 2 years
  1095, // 3 years
  1825, // 5 years
];

app.get("/mostPopularposts", async (req, res) => {
  console.log("now in MOST ENGAGED WITH POSTS server");
  try {
    for (const span of TIME_SPANS) {
      const since = new Date();
      since.setDate(since.getDate() - span);

      const posts = await prisma.post.findMany({
        where: {
          OR: [
            { views: { some: { createdAt: { gte: since } } } },
            /*{ reviews: { some: { createdAt: { gte: since } } } },
            { comments: { some: { createdAt: { gte: since } } } },
            {
              definitions: {
                some: {
                  OR: [
                    { createdAt: { gte: since } },
                    { reviews: { some: { createdAt: { gte: since } } } },
                    { comments: { some: { createdAt: { gte: since } } } },
                    { likes: { some: { createdAt: { gte: since } } } },
                    { disLikes: { some: { createdAt: { gte: since } } } },
                  ],
                },
              },
            },*/
          ],
        },
        include: {
          user: { select: { username: true } },
          views: { where: { createdAt: { gte: since } }, select: { id: true } },
          /*reviews: {
            where: { createdAt: { gte: since } },
            orderBy: { createdAt: "desc" },
            select: COMMENT_SELECT_FIELDS,
          },
          comments: { where: { createdAt: { gte: since } }, select: { id: true } },
          definitions: {
            where: { createdAt: { gte: since } },
            include: {
              reviews: { where: { createdAt: { gte: since } }, select: { id: true } },
              comments: { where: { createdAt: { gte: since } }, select: { id: true } },
              likes: { where: { createdAt: { gte: since } }, select: { definitionId: true } },
              disLikes: { where: { createdAt: { gte: since } }, select: { definitionId: true } },
            },
          },*/
        },
      });

      if (posts.length === 0) continue;

      const postIds = posts.map(obj => obj.id);

      const postsNumbers = await prisma.post.findMany({
        where: {
          id: { in: postIds },
        },
        select: {
          id: true,
          _count: {
            select: {
              views: true,
              definitions: true,
            },
          },
          reviews: {
            where: { definitionId: null },
            select: {
              ...COMMENT_SELECT_FIELDS,
            },
          },
          comments: {
            where: { definitionId: null },
            select: {
              ...COMMENT_SELECT_FIELDS,
            },
          },
        },
      });

      const scoredPosts = posts.map(post => {
        /*const defEngagement = post.definitions.reduce((sum, def) => {
          return sum +
            def.reviews.length +
            def.comments.length +
            def.likes.length +
            def.disLikes.length;
        }, 0);*/

        const totalEngagement = post.views.length
          //post.reviews.length +
          //post.comments.length +
          //defEngagement;

        const numbers = postsNumbers.find(p => p.id === post.id);

        return {
          ...post,
          engagementScore: totalEngagement,
          numbers,
        };
      });

      scoredPosts.sort((a, b) => b.engagementScore - a.engagementScore);

      if (scoredPosts.length >= 6) {
        return res.send(scoredPosts);
      }
    }

    return res.send({ message: "Not enough posts with engagement found in the last 3 months." });
  } catch (err) {
    console.error("Error fetching most engaged posts:", err);
    return res.status(500).send({ error: "Internal Server Error" });
  }
});


app.get("/posts/:tribe/:clanName", async (req, res) => {
  console.log("now inside get posts by tribe & clanName server");

  console.log("SIFUNA MANYALANI LANA?")

    return await commitToDb(
       prisma.post.findMany({ 
        where: {tribe: req.params.tribe,
                title: req.params.clanName,
               },
        select:{
          id: true,
          title: true,
          tribe: true,
          tribe_: {select: {praises_Singular: true}},
          body: true,
          location: true,
          related: true,
          forbidden_foods: true,
          createdAt: true,
          userId: true,
          user: {select: {username: true}},
          _count: {select: {views: true, definitions: true}}, //likesCP: true,
          reviews: {
            where: { definitionId: null },
            select: {
              ...COMMENT_SELECT_FIELDS,
            },
          },
          comments: {
            where: { definitionId: null },
            select: {
              ...COMMENT_SELECT_FIELDS,
            },
          },
        },
      })
    )
    
   
})


app.get("/posts/:id", async (req, res) => {
  console.log("now inside get post(id) server");

  const jwtCookie = req.cookies.jwt
      
      console.log(req.body)
      
      console.log("GOLO LENJA")
      console.log(req.params);
      console.log(req)
      console.log("MSUNU WAGOLO")
      console.log(req.cookies);
      console.log(!jwtCookie);

      if (!jwtCookie){

        return await commitToDb(
          prisma.post
            .findUnique({
              where: { id: req.params.id },
              select: {
                body: true,
                bodyEnglish: true,
                bodySiswati: true,
                title: true,
                tribe: true,
                tribe_: {select: {praises_Singular: true}},
                location: true,
                related: true,
                forbidden_foods: true,
                createdAt: true,
                user: {select: {id: true, username: true, email: true, tribe: true, clan: true, createdAt: true}},
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

              console.log(post.title)
              console.log("MALEBENJA")

              const relatedTittles  = (post.related ?? "").replace(/X/g, "").split(/\s+/).filter(Boolean).map(word => word.toLowerCase());

                  console.log(relatedTittles);

                  const relatedPosts = await prisma.post.findMany({
                    where: {
                      title: {
                        in: relatedTittles,
                      },
                    },
                    select:{
                      id: true,
                      title: true,
                      tribe: true,
                      tribe_: {select: {praises_Singular: true}},
                      body: true,
                      bodyEnglish: true,
                      bodySiswati: true,
                      location: true,
                      related: true,
                      forbidden_foods: true,
                      createdAt: true,
                      userId: true,
                      user: {select: {username: true},
                      },
                      _count: {select: {views: true, definitions: true}}, //likesCP: true,
                      reviews: {
                        where: { definitionId: null },
                        select: {
                          ...COMMENT_SELECT_FIELDS,
                        },
                      },
                      comments: {
                        where: { definitionId: null },
                        select: {
                          ...COMMENT_SELECT_FIELDS,
                        },
                      },
                    },
                  });
                  console.log(relatedPosts);
            
              return {
                ...post,
                relatedPosts,
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
        console.log("now in Fvking else part");
      
      try{
        const decodedToken = await new Promise((resolve, reject) => {
          jwt.verify(jwtCookie, process.env.COOKIE_SECRET, (err, decoded) => {
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
              bodyEnglish: true,
              bodySiswati: true,
              title: true,
              tribe: true,
              tribe_: {select: {praises_Singular: true}},
              location: true,
              related: true,
              forbidden_foods: true,
              createdAt: true,
              user: {select: {id: true, username: true, email: true, tribe: true, clan: true, createdAt: true}},
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

            const relatedTittles  = (post.related ?? "").replace(/X/g, "").split(/\s+/).filter(Boolean).map(word => word.toLowerCase());

            console.log(relatedTittles);

            const relatedPosts = await prisma.post.findMany({
              where: {
                title: {
                  in: relatedTittles,
                },
              },
              select:{
                id: true,
                title: true,
                tribe: true,
                tribe_: {select: {praises_Singular: true}},
                body: true,
                bodyEnglish: true,
                bodySiswati: true,
                location: true,
                related: true,
                forbidden_foods: true,
                createdAt: true,
                userId: true,
                user: {select: {username: true},
                },
                _count: {select: {views: true, definitions: true}}, //likesCP: true,
                reviews: {
                  where: { definitionId: null },
                  select: {
                    ...COMMENT_SELECT_FIELDS,
                  },
                },
                comments: {
                  where: { definitionId: null },
                  select: {
                    ...COMMENT_SELECT_FIELDS,
                  },
                },
              },
            });
            console.log(relatedPosts);

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
              relatedPosts,
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
                bodyEnglish: true,
                bodySiswati: true,
                title: true,
                tribe: true,
                tribe_: {select: {praises_Singular: true}},
                location: true,
                related: true,
                forbidden_foods: true,
                createdAt: true,
                user: {select: {id: true, username: true, email: true,tribe: true, clan: true, createdAt: true}},
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

              const relatedTittles  = (post.related ?? "").replace(/X/g, "").split(/\s+/).filter(Boolean).map(word => word.toLowerCase());

              console.log(relatedTittles);

              const relatedPosts = await prisma.post.findMany({
                where: {
                  title: {
                    in: relatedTittles,
                  },
                },
                select:{
                  id: true,
                  title: true,
                  tribe: true,
                  tribe_: {select: {praises_Singular: true}},
                  body: true,
                  bodyEnglish: true,
                  bodySiswati: true,
                  location: true,
                  related: true,
                  forbidden_foods: true,
                  createdAt: true,
                  userId: true,
                  user: {select: {username: true},
                  },
                  _count: {select: {views: true, definitions: true}}, //likesCP: true,
                  reviews: {
                    where: { definitionId: null },
                    select: {
                      ...COMMENT_SELECT_FIELDS,
                    },
                  },
                  comments: {
                    where: { definitionId: null },
                    select: {
                      ...COMMENT_SELECT_FIELDS,
                    },
                  },
                },
              });
              console.log(relatedPosts);
            
              return {
                ...post,
                relatedPosts,
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

app.post(`/posts/:id/viewpost`, async (req, res) => {
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
          jwt.verify(token, process.env.COOKIE_SECRET, (err, decoded) => {
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


app.post("/finishSignUp", async (req, res) => {
  console.log("now inside FINISH SIGN-UP server");
  
  console.log(req.body);

  try{
      
      return await commitToDb (prisma.user1.create({
        where: { id: req.body.userID },
        data: {
          tribe: req.body.tribe,
          clan: req.body.clan,
        },
      })
      .then(finishup => {
        res.send({isFinishSignUp: true})
      })
    )  
   }
   catch(error){
    console.log(error)
    res.send({isFinishSignUp: false, error: "error while finishing sign up"})
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


app.post("/feedback", async (req, res) => {
  console.log("now inside SEND FEEDBACK controller");
  
  console.log(req.body);
  //console.log(req.cookies)

  try{
      
      return await commitToDb (prisma.feedback.create({
        data: {
          message: req.body.message,
        },
      })
      .then(feedback => {
        res.send({isFeedbackSent: true})
        //return {
         //reportLogged: "report successfully logged"
        //}
      })
    )  //res.send({reportLogged: true, message: LoggedReport})
   }
   catch(error){
    console.log(error)
    res.send({isFeedbackSent: false, error: error})
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
    jwt.verify(jwtCookie, process.env.COOKIE_SECRET, (err, decoded) => {
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
    jwt.verify(jwtCookie, process.env.COOKIE_SECRET, (err, decoded) => {
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
    jwt.verify(jwtCookie, process.env.COOKIE_SECRET, (err, decoded) => {
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
    jwt.verify(jwtCookie, process.env.COOKIE_SECRET, (err, decoded) => {
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

app.post("/validateCommentGuestInput", async (req, reply) => {
  console.log("inside VALIDATE COMMENT INPUT server")
  console.log(req.body)

  try {

   const emailExists = await prisma.user1.findUnique({
        where: { email: req.body.yourEmail },
        select: { username: true }
      });

      if (emailExists) {
        console.log("email exists...");

        if (emailExists.username !== req.body.yourName) {
          console.log("email exists & yourName does not match...");

          return reply.send({ status: false, errors: {message:"", 
            yourName:`continue as ${emailExists.username}`, 
            yourEmail: ""},
            existingName: emailExists.username,
           //values: {clanName: clanName, tribe:tribe, clanPraise:clanPraise, yourName:emailExists.username, yourEmail: req.body.yourEmail}
          }); 

        }
        else {
          console.log("email exists & yourName matches...");

          return reply.send({ status: true, errors: {message:"", yourName: "", yourEmail: ""} });
        }
      }
      else {
        console.log("email does not exist...");

                  const usernameExists = await prisma.user1.findUnique({
                    where: { username: req.body.yourName},  
                  });

                  console.log(usernameExists);
        
                  if (usernameExists) {
                    return reply.send({ status: false, errors: {message:"",  
                          yourName:"this username is already taken, please choose another name" ,
                          yourEmail:"",
                          existingName: "" }});
                  }
        
                  /*const verifyEmailDeliverability = async (email) => {
                    const apiKey = process.env.MAILBOXLAYER_API_KEY;
                    const res = await fetch(`https://apilayer.net/api/check?access_key=${apiKey}&email=${email}&smtp=1&format=1`);
                    const data = await res.json();
                    return data;
                  };
        
                  const emailValidation = await verifyEmailDeliverability(req.body.yourEmail);*/

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

                console.log(emailValidation)

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
                  /*if (!emailValidation.smtp_check || !emailValidation.mx_found) {
                    return reply.send({
                      status: false,
                      errors: {
                        message: "",
                        yourName: "",
                        yourEmail: "please enter a valid email",
                      }
                    });
                  }*/
                  else{
                    console.log("email is valid & does not exist...");

                    const newUserGuest = await prisma.user1.create({
                      data: {
                        username: req.body.yourName,
                        email: req.body.yourEmail,
                      },
                      select: {id: true}
                    });

                    return reply.send({ status: true, errors: {message:"", yourName: "", yourEmail: ""},
                       guestEmail: req.body.yourEmail , guestUserID: newUserGuest.id});

                  }

      }

    } catch (error) {
      console.error("Error validating comment input:", error);
      return reply.status(500).send({ status: false, error: "Internal Server Error" });
    }
  
})

app.post("/posts/:id/comments", async (req, reply) => {
  console.log("inside CREATE COMMENT server")
  console.log(req.body)
  //console.log(req.body.message)
  console.log(req.params)

  if (req.body.message.yourName === undefined && req.body.message.yourEmail === undefined) {

    const jwtCookie = req.cookies.jwt
    console.log(jwtCookie);

    const decodedToken = await new Promise((resolve, reject) => {
      jwt.verify(jwtCookie, process.env.COOKIE_SECRET, (err, decoded) => {
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
            message: req.body.message.message,
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
  }
  else {

    try {

          const userID = await prisma.user1.findUnique({
                  where: { email: req.body.message.yourEmail },
                  select: { id: true }
                }); 

          return await commitToDb(
            prisma.comment
              .create({
                data: {
                  message: req.body.message.message,
                  userId: userID.id,
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

        }
        catch (error) {
          console.log(error);
        }
    }
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
    jwt.verify(jwtCookie, process.env.COOKIE_SECRET, (err, decoded) => {
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
    jwt.verify(jwtCookie, process.env.COOKIE_SECRET, (err, decoded) => {
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
    jwt.verify(jwtCookie, process.env.COOKIE_SECRET, (err, decoded) => {
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
          jwt.verify(jwtCookie, process.env.COOKIE_SECRET, (err, decoded) => {
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
  console.log(req.cookies.jwt)

  if (req.body.yourEmail === undefined || req.body.yourEmail === null) {
    console.log("vip user adding note...")

    const jwtCookie = req.cookies.jwt
    console.log(jwtCookie);

    const decodedToken = await new Promise((resolve, reject) => {
      jwt.verify(jwtCookie, process.env.COOKIE_SECRET, (err, decoded) => {
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
            page: req.body.page,
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

  }
  else{
    console.log("guest user adding note...")
    try {
      const userID = await prisma.user1.findUnique({
        where: { email: req.body.yourEmail },
        select: { id: true }
      }); 

      return await commitToDb(prisma.definition.create({
      data: {
            message: req.body.message,
            rating: req.body.rating,
            index: req.body.index,
            page: req.body.page,
            userId: userID.id,
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
          
    }
    catch (error) {
      console.log(error);
    }
  }

})


app.post("/reviewDefinition", async (req, res) => {

  console.log("now inside REVIEW DEFINITION server")

  console.log(req.body);

  console.log(req.params)
  console.log(req.body.message[1])

  if (req.body.yourName === undefined && req.body.yourEmail === undefined) {

    const jwtCookie = req.cookies.jwt
    console.log(jwtCookie);

    const decodedToken = await new Promise((resolve, reject) => {
      jwt.verify(jwtCookie, process.env.COOKIE_SECRET, (err, decoded) => {
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
  }
  else{

    const userID = await prisma.user1.findUnique({
        where: { email: req.body.yourEmail },
        select: { id: true }
      }); 

    try{
    return await commitToDb(
      prisma.review
        .create({
          data: {
            message: req.body.message,
            rating: req.body.rating,
            index: req.body.index,
            userId: userID.id,
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
    jwt.verify(jwtCookie, process.env.COOKIE_SECRET, (err, decoded) => {
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
    jwt.verify(jwtCookie, process.env.COOKIE_SECRET, (err, decoded) => {
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
    jwt.verify(jwtCookie, process.env.COOKIE_SECRET, (err, decoded) => {
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
    jwt.verify(jwtCookie, process.env.COOKIE_SECRET, (err, decoded) => {
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




