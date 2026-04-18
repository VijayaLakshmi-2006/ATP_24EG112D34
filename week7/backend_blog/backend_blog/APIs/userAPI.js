import exp from 'express'
import {UserModel}  from '../models/userModel.js'
import { ArticleModel } from "../models/articleModel.js";
import { verifyToken } from "../middlewares/verifyToken.js";
//import {hash,compare} from 'bcrypt'
export const userApp = exp.Router()


//Read all articles(protected route)
userApp.get("/articles", verifyToken("USER"), async (req, res) => {
  //read articles of all authors which are active
  const articles = await ArticleModel.find({ isArticleActive: true }).populate("author").populate("comments.user");
  //send res
  res.status(200).json({ message: "all articles", payload: articles });
});

//Read article by ID(protected route)
userApp.get("/article/:articleId", verifyToken("USER", "AUTHOR", "ADMIN"), async (req, res) => {
  const articleId = req.params.articleId;
  const article = await ArticleModel.findOne({ _id: articleId, isArticleActive: true })
        .populate("author")
        .populate("comments.user");
  
  if (!article) {
    return res.status(404).json({ message: "Article not found" });
  }
  
  res.status(200).json({ message: "article found", payload: article });
});

// //Add comment to an article(protected route)
// userApp.put("/articles", verifyToken("USER"), async (req, res) => {
//   //get comment obj from req
//   const { user, articleId, comment } = req.body;
//   //check user(req.user)
//   console.log(req.user);
//   if (user !== req.user.userId) {
//     return res.status(403).json({ message: "Forbidden" });
//   }
//   //find artcleby id and update
//   let articleWithComment = await ArticleModel.findOneAndUpdate(
//     { _id: articleId, isArticleActive: true },
//     { $push: { comments: { user, comment } } },
//     { new: true, runValidators: true },
//   );

//   //if article not found
//   if (!articleWithComment) {
//     return res.status(404).json({ message: "Article not found" });
//   }
//   //send res
//   res.status(200).json({ message: "comment added successfully", payload: articleWithComment });
// });



userApp.put("/articles",verifyToken("USER"),async(req,res)=>{
  //get the article and comment from the request body
  const {articleId,comment} = req.body
  //check article
  const articleDocument=await ArticleModel.findOne({_id:articleId,isArticleActive:true}).populate("comments.user")
  console.log(articleDocument)
  //if article not found
  if(!articleDocument){
    return res.status(404).json({message:"Article not found"})
  }


  //get userid 
  const userId = req.user?.id
  //add comments
  articleDocument.comments.push({user:userId,comment:comment})
  await articleDocument.save()
  
  await articleDocument.populate("comments.user");
  
  //send res
  res.status(200).json({message:"comment added successfully",payload:articleDocument})
})


// Delete comment
userApp.delete("/article/:articleId/comment/:commentId", verifyToken("USER"), async (req, res) => {
  const { articleId, commentId } = req.params;
  const userId = req.user?.id;

  try {
    const articleDocument = await ArticleModel.findById(articleId);
    if (!articleDocument) return res.status(404).json({ message: "Article not found" });

    const comment = articleDocument.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });

    if (comment.user.toString() !== userId) return res.status(403).json({ message: "Unauthorized to delete this comment" });

    articleDocument.comments.pull(commentId);
    await articleDocument.save();
    await articleDocument.populate("comments.user");

    res.status(200).json({ message: "Comment deleted successfully", payload: articleDocument });
  } catch (error) {
    res.status(500).json({ message: "Error deleting comment", error: error.message });
  }
});


//change password
userApp.put("/password",verifyToken("USER","ADMIN","AUTHOR"),async(req,res)=>{
  //check current password and new password are same 
  const {currentPassword,newPassword}=req.body
  //get current paaword of user/admin/author
  const user = await UserModel.findById(req.user?.id)
  //check the current password of the request and user are not same
  if(user.password !== currentPassword){
    return res.status(401).json({message:"Invalid current password"})
  }
  //hash new password and replace the current password with hashenewpassword and save it and send response 
  user.password = newPassword
  await user.save()
  res.status(200).json({message:"Password changed successfully",payload:user})


})