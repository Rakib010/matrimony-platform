const ContactUs = () => {
  return (
    <section className="bg-gray-100 p-10 my-20 border rounded-md ">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Contact Us
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Got a question or feedback? We’d love to hear from you!
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Get in Touch
            </h3>
            <p className="text-gray-600 mb-2">
              <strong>Email:</strong> support@example.com
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Phone:</strong> +1 (123) 456-7890
            </p>
            <p className="text-gray-600">
              <strong>Address:</strong> 123 Main Street, Anytown, USA
            </p>
          </div>

          {/* Contact Form */}
          <div>
            <form className="bg-gray-100 border p-6 rounded-lg shadow-lg">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter your name"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                  placeholder="Write your message"
                  rows="4"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
