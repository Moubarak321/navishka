import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Link } from "react-router-dom";

interface BlogPost {
    id: string;
    title: string;
    content: string;
    author: string;
    image: string;
    createdAt: string;
}

function Blog() {
    const [blogs, setBlogs] = useState<BlogPost[]>([]);

    useEffect(() => {
        const unsubscribe = onSnapshot(collection(db, "blogs"), (snapshot) => {
            const blogsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as BlogPost[];
            setBlogs(blogsData);
        });

        return () => unsubscribe();
    }, []);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div>
            <h1 className="text-3xl font-bold">Nos article Blog</h1>
            {blogs.length === 0 ? (
                <p className="text-gray-600 mt-4">Chargement.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="border rounded-lg p-4">
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <h2 className="text-lg font-semibold">{blog.title}</h2>
                            <p className="text-sm text-gray-500">{formatDate(blog.createdAt)}</p>
                            <p className="text-gray-700 mt-2 line-clamp-3">{blog.content}</p>
                            <Link
                                to={`/blog/${blog.id}`} // Redirige vers la page de l'article complet
                                className="text-blue-600 hover:underline mt-2 inline-block"
                            >
                                Read More
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Blog;