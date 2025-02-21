import { useState } from 'react';
import { MapPin, Mail, Phone, Send } from 'lucide-react'; // Import des icônes

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ici, vous pouvez ajouter la logique pour envoyer le formulaire
    console.log('Form Data:', formData);
    alert('Votre message a été envoyé avec succès !');
    setFormData({ name: '', email: '', message: '' }); // Réinitialiser le formulaire
  };

  return (
    <div className="bg-white min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Titre de la page */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">Nous Contactez</h1>
          <p className="mt-4 text-lg text-gray-600">
            Nous sommes là pour répondre à vos questions. N'hésitez pas à nous contacter !
          </p>
        </div>

        {/* Grille pour le formulaire et les informations de contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulaire de contact */}
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Nom complet
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10a899] focus:border-[#10a899] outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Adresse e-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10a899] focus:border-[#10a899] outline-none"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10a899] focus:border-[#10a899] outline-none"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-[#10a899] text-white px-6 py-3 rounded-lg hover:bg-[#0d8a7a] transition-colors flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Envoyer
                </button>
              </div>
            </form>
          </div>

          {/* Informations de contact et carte */}
          <div className="space-y-8">
            {/* Informations de contact */}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Nos Coordonnées</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-[#10a899]" />
                  <p className="ml-3 text-gray-700">
                    123 Rue de l'Exemple, 75001 Paris, France
                  </p>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-[#10a899]" />
                  <p className="ml-3 text-gray-700">contact@navishka.com</p>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-[#10a899]" />
                  <p className="ml-3 text-gray-700">+33 1 23 45 67 89</p>
                </div>
              </div>
            </div>

            {/* Carte intégrée (Google Maps) */}
            <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Où nous trouver</h2>
              <div className="overflow-hidden rounded-lg">
                <iframe
                  title="Localisation"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.9916256937595!2d2.292292615674389!3d48.858370079287475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0!2sTour%20Eiffel!5e0!3m2!1sfr!2sfr!4v1633018226784!5m2!1sfr!2sfr"
                  width="100%"
                  height="300"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;