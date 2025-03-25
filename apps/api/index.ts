import express from "express"
import { authMiddleware } from "./middleware";
import { prismaclient } from "db/client";

const app = express();
app.use(express.json());

app.post("/api/v1/website", authMiddleware ,async  (req,res)=> {
   const userId  =req.userId!;                  // if error comes for type => undefined .... use this
   const { url } =req.body;

   const data=await prismaclient.website.create({
    data : {
        userId,
        url
    }
   })
    res.json({
    id: data.id    
   })
})


app.get("/api/v1/website/status", authMiddleware,async  (req,res)=> {
  const websiteId = req.query.websiteId! as unknown as string;    // remove this line to see the error it generates without using it
  const userId = req.userId;
  const data=await prismaclient.website.findFirst({
    where : {
        id : websiteId,
        userId,
        disabled : false
    },
    include : {
        ticks : true
    }
  })
  res.json(data);
})


app.get("/api/v1/websites" , authMiddleware, async (req,res)=> {
 const userId = req.userId!;
 const websites=await prismaclient.website.findMany({
    where : {
        userId,
        disabled : false
    }
  }) 
   res.json({
     websites
  }) 
 })


app.delete("/api/v1/website/" , authMiddleware,async (req,res)=> {
 const websiteId = req.body.websiteId;
 const userId = req.userId;
 await prismaclient.website.update({
    where : {
        id : websiteId,
        userId
    },
    data : {
        disabled : true
    }
 })
 res.json({
    message : "deleted website successfully"
 })
})


app.listen(3000);