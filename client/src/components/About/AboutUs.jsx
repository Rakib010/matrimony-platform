
const AboutUs = () => {
  return (
    <section className="bg-pink-100 my-20 p-10 ">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-pink-600 mb-6">About Us</h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-6">
          Welcome to our Matrimony platform, where we believe in connecting
          hearts and building lifelong relationships. Our mission is to provide
          a safe and trusted platform for individuals to find their perfect
          match. With advanced features and a user-friendly interface, we ensure
          your journey toward finding a life partner is seamless and enjoyable.
        </p>
        <img
          src="https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="About us"
          className="rounded-lg shadow-md mx-auto w-50 h-100 "
        />
      </div>
    </section>
  );
};

export default AboutUs;
