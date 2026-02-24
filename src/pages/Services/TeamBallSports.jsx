import React from "react";
import { useNavigate } from "react-router-dom";

const TeamBallPage = () => {
  const navigate = useNavigate();
  const [selectedSubCategory, setSelectedSubCategory] = React.useState(null);
  const [showChoice, setShowChoice] = React.useState(false);

  const categories = [
    { name: "Football / Soccer", desc: "Fast-paced global sport focused on teamwork and endurance.", image: "/images/football.jpg" },
    { name: "Basketball", desc: "Dynamic court sport emphasizing skill, speed, and strategy.", image: "/images/basketball.jpg" },
    { name: "Handball", desc: "Indoor team sport combining speed and strength.", image: "/images/handball.jpg" },
    { name: "Rugby", desc: "Physically demanding sport built on unity and power.", image: "/images/rugby.jpg" },
    { name: "Futsal", desc: "Indoor version of football focused on ball control.", image: "/images/futsal.jpg" },
    { name: "Field Hockey", desc: "High-speed field sport requiring teamwork and precision.", image: "/images/field-hockey.jpg" },
    { name: "Lacrosse", desc: "Fast-paced sport combining speed and skill.", image: "/images/lacrosse.jpg" },
    { name: "Gaelic Football", desc: "Traditional Irish team sport mixing soccer and rugby.", image: "/images/gaelic-football.jpg" },
    { name: "Volleyball", desc: "Net-based team sport focused on agility and coordination.", image: "/images/volleyball.jpg" },
    { name: "Beach Volleyball", desc: "Outdoor volleyball played on sand courts.", image: "/images/beach-volleyball.jpg" },
    { name: "Sepak Takraw", desc: "Southeast Asian sport using feet over a net.", image: "/images/sepak-takraw.jpg" },
    { name: "Roundnet (Spikeball)", desc: "Fast 360-degree net sport played in teams.", image: "/images/roundnet-spikeball.jpg" },
    { name: "Netball", desc: "Strategic passing sport popular in Commonwealth nations.", image: "/images/netball.jpg" },
    { name: "Cricket", desc: "Bat-and-ball sport emphasizing tactics and teamwork.", image: "/images/cricket.jpg" },
    { name: "Baseball", desc: "Classic bat-and-ball sport known for precision and teamwork.", image: "/images/baseball.jpg" },
    { name: "Softball", desc: "Variant of baseball played with a larger ball.", image: "/images/softball.jpg" },
    { name: "Wheelchair Rugby", desc: "Adaptive contact sport for wheelchair athletes.", image: "/images/wheelchair-rugby.jpg" },
    { name: "Dodgeball", desc: "Team sport focused on agility and reflexes.", image: "/images/dodgeball.jpg" },
    { name: "Korfball", desc: "Mixed-gender team sport played with a basket goal.", image: "/images/korfball.jpg" },
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

        <h1 className="text-4xl font-extrabold mb-2">Team Ball Sports</h1>
        <p className="text-gray-600 mb-8">
          Build teamwork, strategy, and resilience through team-based sports
        </p>

        {/* 4 PER ROW GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {categories.map((item, index) => (
            <div
              key={index}
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
                    `/viewtrainers?category=TeamBall&subCategory=${encodeURIComponent(
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
                    `/viewinstitutes?category=TeamBall&subCategory=${encodeURIComponent(
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

export default TeamBallPage;