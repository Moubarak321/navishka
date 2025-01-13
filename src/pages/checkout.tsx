// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useCartStore } from '../store/useCartStore';


// function Checkout() {
//   const navigate = useNavigate();
//   const { items, clearCart } = useCartStore();
//   const [formData, setFormData] = useState({
//     email: '',
//     name: '',
//     address: '',
//     city: '',
//     country: '',
//     zip: '',
//   });

//   const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     // Here you would typically:
//     // 1. Validate the form
//     // 2. Send order to your backend
//     // 3. Initialize Stripe payment
//     // 4. Handle success/error
//     clearCart();
//     navigate('/success');
//   };

//   return (
//     <div className="max-w-4xl mx-auto">
//       <h1 className="text-3xl font-bold mb-8">Checkout</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Checkout Form */}
//         <div className="space-y-6">
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label htmlFor="email" className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 className="input"
//                 value={formData.email}
//                 onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="name" className="block text-sm font-medium text-gray-700">
//                 Full Name
//               </label>
//               <input
//                 type="text"
//                 id="name"
//                 className="input"
//                 value={formData.name}
//                 onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                 required
//               />
//             </div>

//             <div>
//               <label htmlFor="address" className="block text-sm font-medium text-gray-700">
//                 Address
//               </label>
//               <input
//                 type="text"
//                 id="address"
//                 className="input"
//                 value={formData.address}
//                 onChange={(e) => setFormData({ ...formData, address: e.target.value })}
//                 required
//               />
//             </div>

//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label htmlFor="city" className="block text-sm font-medium text-gray-700">
//                   City
//                 </label>
//                 <input
//                   type="text"
//                   id="city"
//                   className="input"
//                   value={formData.city}
//                   onChange={(e) => setFormData({ ...formData, city: e.target.value })}
//                   required
//                 />
//               </div>
//               <div>
//                 <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
//                   ZIP Code
//                 </label>
//                 <input
//                   type="text"
//                   id="zip"
//                   className="input"
//                   value={formData.zip}
//                   onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
//                   required
//                 />
//               </div>
//             </div>

//             <button type="submit" className="w-full btn btn-primary bg-green-600 text-white">
//               Place Order (${total.toFixed(2)})
//             </button>
//           </form>
//         </div>

//         {/* Order Summary */}
//         <div className="bg-white rounded-lg shadow-sm p-6">
//           <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
//           <div className="space-y-4">
//             {items.map((item) => (
//               <div key={item.id} className="flex justify-between">
//                 <span>
//                   {item.name} x {item.quantity}
//                 </span>
//                 <span>${(item.price * item.quantity).toFixed(2)}</span>
//               </div>
//             ))}
//             <div className="border-t pt-4">
//               <div className="flex justify-between font-semibold">
//                 <span>Total</span>
//                 <span>${total.toFixed(2)}</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Checkout;





// --------------------








import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/useCartStore';

function Checkout() {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    country: '',
  });

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const generateWhatsAppMessage = () => {
    const orderDetails = items
      .map(
        (item) =>
          `- ${item.name} x ${item.quantity} : ${(item.price * item.quantity).toLocaleString()} Fcfa`
      )
      .join('\n');

    return `
Nouvelle commande :
Nom : ${formData.name}
Adresse : ${formData.address}, ${formData.city}, ${formData.country}

Détails de la commande :
${orderDetails}

Total : ${total.toLocaleString()} Fcfa
    `.trim();
  };

  const sendWhatsAppMessage = () => {
    const adminPhoneNumber = '22962003202'; // Remplacez par le numéro de l'administrateur
    const message = encodeURIComponent(generateWhatsAppMessage());
    window.open(`https://wa.me/${adminPhoneNumber}?text=${message}`, '_blank');
    clearCart();
    navigate('/success');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="space-y-6">
          <form onSubmit={(e) => {
            e.preventDefault();
            sendWhatsAppMessage();
          }} className="space-y-4">
            {/* <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div> */}

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nom
              </label>
              <input
                type="text"
                id="name"
                className="input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                type="text"
                id="address"
                className="input"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  Ville
                </label>
                <input
                  type="text"
                  id="city"
                  className="input"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  required
                />
              </div>
              {/* <div>
                <label htmlFor="zip" className="block text-sm font-medium text-gray-700">
                  ZIP Code
                </label>
                <input
                  type="text"
                  id="zip"
                  className="input"
                  value={formData.zip}
                  onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                  required
                />
              </div> */}
            </div>

            <button type="submit" className="w-full btn  bg-green-600 text-white">
              Valider via WhatsApp ({total.toLocaleString()} Fcfa)
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold mb-4">Résumé de la commande</h2>
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between">
                <span>
                  {item.name} x {item.quantity}
                </span>
                <span>{(item.price * item.quantity).toLocaleString()} Fcfa</span>
              </div>
            ))}
            <div className="border-t pt-4">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{total.toLocaleString()} Fcfa</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
