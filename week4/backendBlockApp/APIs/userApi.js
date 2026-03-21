
import exp from 'express'
import { verifyToken } from '../middlewares/VerifyToken.js'
import { ArticleModel } from '../models/ArticleModel.js' 
export const userApp=exp.Router()

//read articles of all authors
userApp.get("/article",verifyToken,async(req,res)=>{
    //read all articles
    const articleList=await ArticleModel.find()
    //send res
    res.status(200).json({message:"articles",payload:articleList})
})
// add comment to an article
userApp.put("/articles",verifyToken,async(req,res)=>{
    //get body from req 
    const {articleId,comment}=req.body
    //check articles
    const articleDocument=await ArticleModel.findOne({ _id:articleId,isArticleNotFound})
    //if article not found
    if(!articleDocumenrt)
    {
        return res.status(404).json({message:"article not found"}
        )

    }
    //add comment to comments array of articleDocument
    articleDocument.comments.push({user:userId,comment:comment});
    //save
    await articleDocument.save();
    //send res
    res.status(200).json({message:"comment added successfully",payload:articleDocument});
})