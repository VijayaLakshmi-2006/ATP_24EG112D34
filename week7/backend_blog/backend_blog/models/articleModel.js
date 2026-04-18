import { Schema, model, Types } from 'mongoose'

//create comment schema
const commentSchema = new Schema({
    //take meaning f
    user: {
        type: Types.ObjectId,
        ref: "user",
        required: [true, "User ID is required"]
    },
    comment: {
        type: String
    }
})

const articleSchema = new Schema({

    author: {
        type: Types.ObjectId,
        ref: "user",
        required: [true, "Author ID is required"]
    },
    title: {
        type: String,
        required: [true, "Title is required"]
    },
    category: {
        type: String,
        required: [true, "Category is required"]
    },
    content: {
        type: String,
        required: [true, "Content is required"]
    },
    comments: [{ type: commentSchema, default: [] }],
    isArticleActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,//date of creation and modification
    versionKey: false,
    strict: "throw"
})

export const ArticleModel = model("article", articleSchema)