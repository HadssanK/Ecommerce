import { useState } from "react";  // Import React hooks if not already

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);  // State to handle form submission

  const onSubmit = async (event) => {
   
    setIsSubmitting( alert("your email is send successfully"))
  }

  return (
    <section className="py-16 bg-gradient-to-r from-indigo-200 to-yellow-100" id="contact">
      <div className="max-w-screen-xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-12">
          {/* Left Side Text */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">Get in Touch</h2>
            <p className="text-lg text-gray-600">
              Have a question or want to collaborate? Feel free to reach out using the form on the right. I’m always excited to connect!
            </p>
          </div>

          {/* Right Side Form */}
          <div className="w-full md:w-1/2">
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="block text-gray-700">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full p-3 border border-gray-300 rounded-lg"
                  rows="5"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300"
                disabled={isSubmitting}  // Disable the button while submitting
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
