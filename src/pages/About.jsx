import React from "react";
import Author from "../components/Author";

function About() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800">
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-6">
          <h1 className="text-3xl font-bold">About Us</h1>
          <p className="mt-2 text-lg">Learn more about our mission and team</p>
        </div>
      </header>
      <main className="container mx-auto px-6 py-10">
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-lg">
            Our mission is to provide the best services and solutions to our
            customers. We aim to improve lives through innovation and commitment
            to excellence.
          </p>
        </section>
        <Author/>
        <section>
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-lg mb-4">
            We would love to hear from you. Please reach out to us via email or
            phone.
          </p>
          <p className="text-lg">
            Email:{" "}
            <a
              href="mailto:info@company.com"
              className="text-blue-600 hover:underline"
            >
              info@company.com
            </a>
          </p>
          <p className="text-lg">
            Phone:{" "}
            <a href="tel:+123456789" className="text-blue-600 hover:underline">
              +1 234 567 89
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}

export default About;
