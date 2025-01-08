import { useState, useEffect } from "react";
import { getDatabase, ref, push, onValue } from "firebase/database";

interface Testimonial {
  name: string;
  email: string;
  content: string;
  timestamp: string;
}

const TestimonialForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Charger les témoignages depuis Firebase
  useEffect(() => {
    const db = getDatabase();
    const testimonialsRef = ref(db, "testimonials");

    const unsubscribe = onValue(testimonialsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const loadedTestimonials = Object.values(data) as Testimonial[]; // Transformer l'objet en tableau
        setTestimonials(loadedTestimonials);
      } else {
        setTestimonials([]); // Si pas de témoignages
      }
    });

    return () => unsubscribe(); // Nettoyage lors du démontage
  }, []);

  // Soumettre un témoignage
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !content) {
      setError("Tous les champs sont obligatoires.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Veuillez saisir une adresse e-mail valide.");
      return;
    }

    const db = getDatabase();
    const testimonialsRef = ref(db, "testimonials");

    try {
      await push(testimonialsRef, {
        name,
        email,
        content,
        timestamp: new Date().toISOString(),
      });
      setName("");
      setEmail("");
      setContent("");
      setError("");
      alert("Témoignage soumis avec succès !");
      setIsModalOpen(false); // Fermer le modal
    } catch (err) {
      setError("Erreur lors de l'envoi du témoignage.");
    }
  };

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
        Témoignages de nos utilisateurs
      </h1>

      <button
        onClick={() => setIsModalOpen(true)}
        className="btn bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:btn bg-green-600 focus:ring-2 focus:ring-blue-400 focus:outline-none mx-auto block"
      >
        Partagez aussi votre expérience
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              &#x2715;
            </button>

            <h2 className="text-2xl font-bold text-center mb-4">
              Partagez votre expérience
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <p className="text-red-500 text-sm font-semibold text-center">{error}</p>
              )}
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Votre nom"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre e-mail"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Votre témoignage"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none h-32"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-semibold px-4 py-3 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              >
                Soumettre
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Liste des témoignages */}
      <div className="mt-10 space-y-6 max-w-3xl mx-auto">
        {testimonials.length === 0 ? (
          <p className="text-center text-gray-500">Chargement...</p>
        ) : (
          testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-lg shadow-md p-6 hover:shadow-lg"
            >
              <p className="text-lg italic text-gray-700">"{testimonial.content}"</p>
              <p className="text-right font-semibold text-gray-800 mt-4">
                - {testimonial.name}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// Validation de l'email
const validateEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export default TestimonialForm;