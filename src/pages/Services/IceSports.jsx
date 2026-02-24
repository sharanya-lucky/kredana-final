import React from "react";
import { useNavigate } from "react-router-dom";

const IceSports = () => {
  const navigate = useNavigate();
  const [selectedSubCategory, setSelectedSubCategory] = React.useState(null);
  const [showChoice, setShowChoice] = React.useState(false);

  const categories = [
    { name: "Ice Skating", desc: "Glide across ice with grace and balance.", image: "/images/ice-skating.jpeg" },
    { name: "Figure Skating", desc: "Artistic skating with jumps and spins.", image: "/images/figure-skating.jpeg" },
    { name: "Ice Hockey", desc: "Fast-paced team sport played on ice.", image: "/images/ice-hockey.jpeg" },
    { name: "Speed Skating", desc: "High-speed racing on ice tracks.", image: "/images/speed-skating.jpeg" },
    { name: "Ice Dance", desc: "Partner-based artistic skating discipline.", image: "/images/ice-dance.jpeg" },
    { name: "Synchronized Skating", desc: "Team skating performed in unison.", image: "/images/synchronized-skating.jpeg" },
    { name: "Curling", desc: "Strategic ice sport requiring precision and teamwork.", image: "/images/curling.jpeg" },
    { name: "Broomball", desc: "Ice sport similar to hockey but played with brooms.", image: "/images/broomball.jpeg" },
    { name: "Bobsleigh", desc: "High-speed winter sliding sport.", image: "/images/bobsleigh.jpeg" },
    { name: "Skiboarding", desc: "Short-ski sport performed on snow and ice.", image: "/images/skiboarding.jpeg" },
    { name: "Ice Dragon Boat Racing", desc: "Dragon boat racing on frozen tracks.", image: "/images/ice-dragon-boat-racing.jpeg" },
    { name: "Ice Cross Downhill", desc: "Extreme downhill race on icy tracks.", image: "/images/ice-cross-downhill.jpeg" },
  ];

  return (
    <div className="font-sans bg-gray-50 text-gray-800 min-h-screen">
      <section className="max-w-7xl mx-auto px-6 py-12">

        <button
          onClick={() => navigate("/categories")}
          className="text-orange-500 text-lg flex items-center gap-2 mb-6 font-medium"
        >
          ← Back to categories
        </button>

        <h1 className="text-4xl font-extrabold mb-2">Ice Sports</h1>

        <p className="text-gray-600 mb-8">
          Experience thrilling and artistic sports performed on ice and snow
        </p>

        {/* RESPONSIVE GRID - 4 PER ROW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((item) => (
            <div
              key={item.name}
              onClick={() => {
                setSelectedSubCategory(item.name);
                setShowChoice(true);
              }}
              className="bg-white rounded-2xl border border-orange-200 overflow-hidden cursor-pointer
                         transition-all duration-300
                         hover:-translate-y-1
                         hover:shadow-[0_10px_30px_rgba(249,115,22,0.35)]"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-5">
                <h3 className="text-orange-600 font-bold text-lg mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {showChoice && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-sm text-center">
            <h3 className="text-xl font-bold mb-4">
              View {selectedSubCategory} as
            </h3>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => {
                  navigate(
                    `/viewtrainers?category=Ice Sports&subCategory=${encodeURIComponent(
                      selectedSubCategory
                    )}`
                  );
                  setShowChoice(false);
                }}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg"
              >
                Trainers
              </button>

              <button
                onClick={() => {
                  navigate(
                    `/viewinstitutes?category=Ice Sports&subCategory=${encodeURIComponent(
                      selectedSubCategory
                    )}`
                  );
                  setShowChoice(false);
                }}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg"
              >
                Institutes
              </button>
            </div>

            <button
              onClick={() => setShowChoice(false)}
              className="mt-4 text-sm text-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default IceSports;