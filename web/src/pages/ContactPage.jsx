// const ContactPage = () => {
//   return (
//     <section className="flex flex-col items-center justify-center min-h-screen text-center px-4">
//       <h1 className="text-4xl font-bold">Contact Page</h1>
//     </section>
//   );
// };
// export default ContactPage;

const ContactPage = () => {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-10 px-4">
      <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
      <p className="text-lg text-gray-600 max-w-2xl text-center mb-8">
        We are here to assist you! Reach out to us for any inquiries, feedback,
        or support. Our team will be happy to help.
      </p>

      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-3xl">
        <h3 className="text-2xl font-semibold mb-4">Reach Out to Us</h3>
        <p className="text-gray-600 mb-4">Email: support@opms.com</p>
        <p className="text-gray-600 mb-4">Phone: 1-800-123-4567</p>
      </div>
    </section>
  );
};

export default ContactPage;
