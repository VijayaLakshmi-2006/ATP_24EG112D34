import { useParams, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../store/authStore";
import {
  articlePageWrapper,
  articleHeader,
  articleCategory,
  articleMainTitle,
  articleAuthorRow,
  authorInfo,
  articleContent,
  articleFooter,
  articleActions,
  editBtn,
  deleteBtn,
  loadingClass,
  errorClass,
  inputClass,
  commentsWrapper,
  commentCard,
  commentHeader,
  commentUserRow,
  avatar,
  commentUser,
  commentTime,
  commentText,
} from "../styles/common.js";
import { useForm } from "react-hook-form";

function ArticleByID() {

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const user = useAuth((state) => state.currentUser);

  const [article, setArticle] = useState(location.state || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Always fetch the latest article data to avoid stale state from location.state (e.g. after a page refresh)
    const getArticle = async () => {
      if (!article) setLoading(true); // Only show loading if we don't have initial state
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/user/article/${id}`, { withCredentials: true });
        setArticle(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.error || "Error fetched article");
      } finally {
        setLoading(false);
      }
    };

    getArticle();
  }, [id]);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // delete & restore article
  const toggleArticleStatus = async () => {
    const newStatus = !article.isArticleActive;

    const confirmMsg = newStatus ? "Restore this article?" : "Delete this article?";
    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_BACKEND_URL}/author/articles`,
        { articleId: id, isArticleActive: newStatus },
        { withCredentials: true },
      );

      console.log("SUCCESS:", res.data);

      setArticle(res.data.payload);

      // toast.success(res.data.message);
    } catch (err) {
      console.log("ERROR:", err.response);

      const msg = err.response?.data?.message;

      if (err.response?.status === 400) {
        alert(msg); // already deleted/active case
      } else {
        setError(msg || "Operation failed");
      }
    }
  };

  //edit article
  const editArticle = (articleObj) => {
    navigate("/edit-article", { state: articleObj });
  };

  //post comment by user
  const addComment = async (commentObj) => {
    //add artcileId
    commentObj.articleId = article._id;
    console.log(commentObj);
    try {
      let res = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/user/articles`, commentObj, { withCredentials: true });
      if (res.status === 200) {
        setArticle(res.data.payload);
        reset(); // Clear the form input
      }
    } catch (err) {
      console.log("ERROR:", err);
      alert(err.response?.data?.message || "Failed to add comment");
    }
  };

  //delete comment 
  const deleteComment = async (commentId) => {
    if (!window.confirm("Delete this comment?")) return;
    try {
      let res = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/user/article/${article._id}/comment/${commentId}`, { withCredentials: true });
      if (res.status === 200) {
        setArticle(res.data.payload);
      }
    } catch (err) {
      console.log("ERROR:", err);
      alert(err.response?.data?.message || "Failed to delete comment");
    }
  };

  if (loading) return <p className={loadingClass}>Loading article...</p>;
  if (error) return <p className={errorClass}>{error}</p>;
  if (!article) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <span className="text-blue-600 text-sm font-bold uppercase tracking-wide block mb-3">
          {article.category}
        </span>

        <h1 className="text-[2.5rem] font-bold text-black uppercase leading-tight mb-8">
          {article.title}
        </h1>

        <div className="flex items-center justify-between text-sm py-4 border-t border-b border-gray-200 mt-6 mb-8 text-gray-500">
          <div className="flex items-center gap-2 font-medium text-black">
            ✍️ {article.author?.firstName || "Author"}
          </div>

          <div>
            {formatDate(article.createdAt)}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="text-gray-700 text-[1.05rem] leading-[1.9] whitespace-pre-line mb-12">
        {article.content}
      </div>

      {/* AUTHOR actions */}
      {user?.role === "AUTHOR" && (
        <div className="flex gap-4">
          <button className="bg-blue-600 text-white font-medium px-5 py-2 rounded-full hover:bg-blue-700 transition" onClick={() => editArticle(article)}>
            Edit
          </button>

          <button className="bg-red-500 text-white font-medium px-5 py-2 rounded-full hover:bg-red-600 transition" onClick={toggleArticleStatus}>
            {article.isArticleActive ? "Delete" : "Restore"}
          </button>
        </div>
      )}
      {/* form to add comment if role is USER */}
      {/* USER actions */}
      {user?.role === "USER" && (
        <div className={articleActions}>
          <form onSubmit={handleSubmit(addComment)}>
            <input
              type="text"
              {...register("comment")}
              className={inputClass}
              placeholder="Write your comment here..."
            />
            <button type="submit" className="bg-amber-600 text-white px-5 py-2 rounded-2xl mt-5">
              Add comment
            </button>
          </form>

        </div>
      )}

      {/* comments */}
      {/* Comments */}
      <div className={commentsWrapper}>
        {article.comments?.length === 0 && <p className="text-[#a1a1a6] text-sm text-center">No comments yet</p>}

        {article.comments?.map((commentObj, index) => {
          const name = commentObj.user?.firstName
            ? `${commentObj.user.firstName} ${commentObj.user.lastName || ''}`.trim()
            : commentObj.user?.email || "User";
          const firstLetter = name.charAt(0).toUpperCase();

          return (
            <div key={index} className={commentCard}>
              {/* Header */}
              <div className={commentHeader}>
                <div className={commentUserRow}>
                  <div className={avatar}>{firstLetter}</div>

                  <div>
                    <p className={commentUser}>{name}</p>
                    <p className={commentTime}>{formatDate(commentObj.createdAt || new Date())}</p>
                  </div>
                </div>
                {/* Delete Button for User's own comments */}
                {user?.email === commentObj.user?.email && (
                  <button
                    onClick={() => deleteComment(commentObj._id)}
                    className="text-red-500 hover:text-red-700 text-sm font-medium transition"
                  >
                    Delete
                  </button>
                )}
              </div>

              {/* Comment */}
              <p className={commentText}>{commentObj.comment}</p>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className={articleFooter}>Last updated: {formatDate(article.updatedAt)}</div>
    </div>
  );
}

export default ArticleByID;

// {
//   "user":"6989799b7013502767d3f82b",
//   "articleId":"6989750220ce5bf826ec4f7e",
//   "comment":"good article"

// }