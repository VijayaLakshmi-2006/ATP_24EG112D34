import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";
import { useAuth } from "../store/authStore";

function AuthorArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const user = useAuth((state) => state.currentUser);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }
    const fetchArticles = async () => {
      try {
        //set loading true
        setLoading(true);
        //make get request to get all articles of author
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/author/articles`, {
          withCredentials: true,
        });
        if (res.status === 200) {
          setArticles(res.data.payload || []);
        }
      } catch (err) {
        console.log(err);
        setError(err.response?.data?.message || "Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  if (loading) return <div className="p-4 text-center">Loading articles...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;

  return (
    <div>
      {articles.length === 0 ? (
        <p className="text-gray-500 text-center py-10">No articles found. Start writing!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <div key={article._id} className="p-6 bg-[#f8f9fa] rounded-2xl flex flex-col h-full">
              {/* Header: Category & Status */}
              <div className="flex justify-between items-start mb-4">
                <span className="text-sm text-gray-400 lowercase">
                  {article.category}
                </span>
                {article.isArticleActive ? (
                  <span className="bg-green-100 text-green-700 text-[0.65rem] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                    Active
                  </span>
                ) : (
                  <span className="bg-red-100 text-red-700 text-[0.65rem] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                    Deleted
                  </span>
                )}
              </div>

              {/* Title & Content */}
              <h3 className="text-[1.1rem] font-bold text-gray-900 mb-2 leading-snug">
                {article.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-grow">
                {article.content?.substring(0, 100)}...
              </p>

              {/* Action */}
              <div className="text-center mt-auto">
                <Link
                  to={`/article/${article._id}`}
                  state={article}
                  className="text-blue-600 hover:text-blue-800 text-[0.9rem] font-semibold transition"
                >
                  Read Article →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AuthorArticles;
