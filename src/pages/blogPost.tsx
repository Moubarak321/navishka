import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  image: string;
  createdAt: string;
}

function BlogPost() {
  const { id } = useParams<{ id: string }>(); // Récupère l'ID de l'article depuis l'URL
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!id) return;

      try {
        const docRef = doc(db, "blogs", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setBlog({ id: docSnap.id, ...docSnap.data() } as BlogPost);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching blog post:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto p-4 text-center">
        <p className="text-red-500 text-lg">Blog post not found.</p>
        <Link to="/blog" className="text-blue-600 hover:underline mt-4 inline-block">
          &larr; Back to Blog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Bouton de retour */}
      <Link
        to="/blog"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 transition duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
        Back to Blog
      </Link>

      {/* Titre de l'article */}
      <h1 className="text-4xl font-bold mt-6 text-gray-900">{blog.title}</h1>

      {/* Informations sur l'auteur et la date */}
      <div className="mt-4 flex items-center text-sm text-gray-600">
        <span>By {blog.author}</span>
        <span className="mx-2">•</span>
        <span>Published on {formatDate(blog.createdAt)}</span>
      </div>

      {/* Image de l'article */}
      <img
        src={blog.image}
        alt={blog.title}
        className="w-full h-96 object-cover rounded-lg mt-6 shadow-lg"
      />

      {/* Contenu de l'article */}
      <div className="mt-8 prose prose-lg max-w-none text-gray-700">
        <p className="whitespace-pre-line">{blog.content}</p>
      </div>

      {/* Bouton de retour en bas de la page */}
      <div className="mt-8 text-center">
        <Link
          to="/blog"
          className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Back to Blog
        </Link>
      </div>
    </div>
  );
}

export default BlogPost;
