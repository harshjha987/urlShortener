const CTA = () => {
    return (
      <section className="bg-blue-600 text-white py-16 text-center">
        <div className="max-w-3xl mx-auto px-6">
          {/* Heading */}
          <h2 className="text-4xl font-bold mb-4">🚀 Shorten. Share. Track.</h2>
          <p className="text-lg mb-6">
            Turn long URLs into short, trackable links in seconds. Fast, secure, and free to use!
          </p>
  
          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-200 transition">
              🔗 Shorten Your First Link
            </button>
            <button className="bg-gray-100 text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-gray-200 transition">
              📊 Explore Features
            </button>
          </div>
        </div>
      </section>
    );
  };
  
  export default CTA;
  