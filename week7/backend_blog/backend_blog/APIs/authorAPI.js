import exp from 'express'
import { UserModel } from '../models/userModel.js'
import { ArticleModel } from '../models/articleModel.js'
import { verifyToken } from '../middlewares/verifyToken.js'
export const authorApp = exp.Router()


//write article(protected)
//express will call middleware this verify one is not middleware
authorApp.post("/article", verifyToken("AUTHOR"), async (req, res) => {
    //get articleobj from client
    const articleObj = req.body
    console.log(req.user)
    let user = req.user
    //check if author exists
    let author = await UserModel.findById(articleObj.author)
    if (!author) {
        return res.status(404).json({ message: "invalid author" })
    }
    //check if author matches the logged in user
    if (author.email !== user.email) {
        return res.status(403).json({ message: "u r not authorized" })
    }
    //create article
    const articleDoc = new ArticleModel(articleObj)
    //save article
    await articleDoc.save()
    //send response
    res.status(201).json({ message: "Article created successfully", payload: articleDoc })
})



//read own article the user who loggged into the application only can read his own articles
authorApp.get("/articles", verifyToken("AUTHOR"), async (req, res) => {
    //get author id from token
    const authorIdOfToken = req.user?.id
    //get articles of author
    const articles = await ArticleModel.find({ author: authorIdOfToken }).populate("author").populate("comments.user")
    //send response
    // if(!articles){
    //     return res.status(404).json({message:"No articles found"})
    // }
    res.status(200).json({ message: "articles", payload: articles })
})



//edit article
authorApp.put("/articles", verifyToken("AUTHOR"), async (req, res) => {
    //get author id from token
    const authorIdToken = req.user?.id
    //get modified article from client
    const { articleId, title, category, content } = req.body
    const modifiedArticleArticle = await ArticleModel.findOneAndUpdate(
        { _id: articleId, author: authorIdToken },
        { $set: { title, category, content } },
        { new: true }
)
    if (!modifiedArticleArticle) {
        return res.status(403).json({ message: "No autthorized to edit article" })
    }
    //send response
    res.status(200).json({ message: "Article updated successfully", payload: modifiedArticleArticle })
})


//delete article (own)(soft delete) delete and restore 
authorApp.patch("/articles", verifyToken("AUTHOR"), async (req, res) => {
    //get article obj withrespect to article id and author id
    const authorIdToken = req.user?.id
    //get modified article from client
    const { articleId, isArticleActive } = req.body
    //get article by id 
    const articleofDB = await ArticleModel.findOne({ _id: articleId, author: authorIdToken })
    if (!articleofDB) {
        return res.status(404).json({ message: "Article not found" })
    }
    //check status 
    if (isArticleActive === articleofDB.isArticleActive) {
        return res.status(200).json({ message: "article already in same state" })
    }
    //update article\
    articleofDB.isArticleActive = isArticleActive
    await articleofDB.save()
    //send response
    res.status(200).json({ message: "Article modified", payload: articleofDB })
})

