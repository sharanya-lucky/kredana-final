import React, { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { db, auth } from "../../firebase";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  addDoc,
  setDoc, // 🔥 ADD THIS
  serverTimestamp,
} from "firebase/firestore";

import dayjs from "dayjs";
const inputClass =
  "h-11 px-3 w-full border border-orange-400 rounded-md bg-white outline-none focus:border-2 focus:border-orange-500";
const categories = [
  "Martial Arts",
  "Team Ball Sports",
  "Racket Sports",
  "Fitness",
  "Target & Precision Sports",
  "Equestrian Sports",
  "Adventure & Outdoor Sports",
  "Ice Sports",
  "Aquatic Sports",
  "Wellness",
  "Dance",
];

const subCategoryMap = {
  "Martial Arts": [
    "Karate",
    "Kung Fu",
    "Krav Maga",
    "Muay Thai",
    "Taekwondo",
    "Judo",
    "Brazilian Jiu-Jitsu",
    "Aikido",
    "Jeet Kune Do",
    "Capoeira",
    "Sambo",
    "Silat",
    "Kalaripayattu",
    "Hapkido",
    "Wing Chun",
    "Shaolin",
    "Ninjutsu",
    "Kickboxing",
    "Boxing",
    "Wrestling",
    "Shorinji Kempo",
    "Kyokushin",
    "Goju-ryu",
    "Shotokan",
    "Wushu",
    "Savate",
    "Lethwei",
    "Bajiquan",
    "Hung Gar",
    "Praying Mantis Kung Fu"
  ],
  "Team Ball Sports": [
    "Football / Soccer",
    "Basketball",
    "Handball",
    "Rugby",
    "Futsal",
    "Field Hockey",
    "Lacrosse",
    "Gaelic Football",
    "Volleyball",
    "Beach Volleyball",
    "Sepak Takraw",
    "Roundnet (Spikeball)",
    "Netball",
    "Cricket",
    "Baseball",
    "Softball",
    "Wheelchair Rugby",
    "Dodgeball",
    "Korfball"
  ],
  "Racket Sports": [
    "Tennis",
    "Table Tennis",
    "Badminton",
    "Squash",
    "Racquetball",
    "Padel",
    "Pickleball",
    "Platform Tennis",
    "Real Tennis",
    "Soft Tennis",
    "Frontenis",
    "Speedminton (Crossminton)",
    "Paddle Tennis (POP Tennis)",
    "Speed-ball",
    "Chaza",
    "Totem Tennis (Swingball)",
    "Matkot",
    "Jombola"
  ],
  Fitness: [
    "Gym Workout",
    "Weight Training",
    "Bodybuilding",
    "Powerlifting",
    "CrossFit",
    "Calisthenics",
    "Circuit Training",
    "HIIT",
    "Functional Training",
    "Core Training",
    "Mobility Training",
    "Stretching",
    "Resistance Band Training",
    "Kettlebell Training",
    "Boot Camp Training",
    "Spinning",
    "Step Fitness",
    "Pilates",
    "Yoga",
  ],
  "Target & Precision Sports": [
    "Archery",
    "Golf",
    "Bowling",
    "Darts",
    "Snooker",
    "Pool",
    "Billiards",
    "Target Shooting",
    "Clay Pigeon Shooting",
    "Air Rifle Shooting",
    "Air Pistol Shooting",
    "Croquet",
    "Petanque",
    "Bocce",
    "Lawn Bowls",
    "Carom Billiards",
    "Nine-Pin Bowling",
    "Disc Golf",
    "Kubb",
    "Pitch and Putt",
    "Shove Ha’penny",
    "Toad in the Hole",
    "Bat and Trap",
    "Boccia",
    "Gateball"
  ],
  "Equestrian Sports": [
    "Horse Racing",
    "Barrel Racing",
    "Rodeo",
    "Mounted Archery",
    "Tent Pegging",
  ],
  "Adventure & Outdoor Sports": [
    "Rock Climbing",
    "Mountaineering",
    "Trekking",
    "Hiking",
    "Mountain Biking",
    "Sandboarding",
    "Orienteering",
    "Obstacle Course Racing",
    "Skydiving",
    "Paragliding",
    "Hang Gliding",
    "Parachuting",
    "Hot-air Ballooning",
    "Skiing",
    "Snowboarding",
    "Ice Climbing",
    "Heli-skiing",
    "Bungee Jumping",
    "BASE Jumping",
    "Canyoning",
    "Kite Buggy",
    "Zorbing",
    "Zip Lining",
  ],
  "Aquatic Sports": [
    "Swimming",
    "Water Polo",
    "Surfing",
    "Scuba Diving",
    "Snorkeling",
    "Freediving",
    "Kayaking",
    "Canoeing",
    "Rowing",
    "Sailing",
    "Windsurfing",
    "Kite Surfing",
    "Jet Skiing",
    "Wakeboarding",
    "Water Skiing",
    "Stand-up Paddleboarding",
    "Whitewater Rafting",
    "Dragon Boat Racing",
    "Artistic Swimming",
    "Open Water Swimming",
  ],
  "Ice Sports": [
    "Ice Skating",
    "Figure Skating",
    "Ice Hockey",
    "Speed Skating",
    "Ice Dance",
    "Synchronized Skating",
    "Curling",
    "Broomball",
    "Bobsleigh",
    "Skiboarding",
    "Ice Dragon Boat Racing",
    "Ice Cross Downhill",
  ],
  Wellness: [
    "Yoga & Meditation",
    "Spa & Relaxation",
    "Mental Wellness",
    "Fitness",
    "Nutrition",
    "Traditional & Alternative Therapies",
    "Rehabilitation",
    "Lifestyle Coaching"
  ],
  Dance: [
    "Bharatanatyam",
    "Kathak",
    "Kathakali",
    "Kuchipudi",
    "Odissi",
    "Mohiniyattam",
    "Manipuri",
    "Sattriya",
    "Chhau",
    "Yakshagana",
    "Lavani",
    "Ghoomar",
    "Kalbelia",
    "Garba",
    "Dandiya Raas",
    "Bhangra",
    "Bihu",
    "Dollu Kunitha",
    "Theyyam",
    "Ballet",
    "Contemporary",
    "Hip Hop",
    "Breakdance",
    "Jazz Dance",
    "Tap Dance",
    "Modern Dance",
    "Street Dance",
    "House Dance",
    "Locking",
    "Popping",
    "Krumping",
    "Waacking",
    "Voguing",
    "Salsa",
    "Bachata",
    "Merengue",
    "Cha-Cha",
    "Rumba",
    "Samba",
    "Paso Doble",
    "Jive",
    "Tango",
    "Waltz",
    "Foxtrot",
    "Quickstep",
    "Flamenco",
    "Irish Stepdance",
    "Scottish Highland Dance",
    "Morris Dance",
    "Hula",
    "Maori Haka",
    "African Tribal Dance",
    "Zumba",
    "K-Pop Dance",
    "Shuffle Dance",
    "Electro Dance",
    "Pole Dance",
    "Ballroom Dance",
    "Line Dance",
    "Square Dance",
    "Folk Dance",
    "Contra Dance",
  ],
};

export default function StudentPerformanceReport() {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedMonth, setSelectedMonth] = useState(dayjs().format("YYYY-MM"));
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const categoryRef = useRef(null);
  const subCategoryRef = useRef(null);

  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showSubCategoryDropdown, setShowSubCategoryDropdown] = useState(false);
  const [availableSubCategories, setAvailableSubCategories] = useState([]);
  const [attendancePercent, setAttendancePercent] = useState(null);
  /* 🔽 AUTO-FILL EXISTING REPORT STATE */
  const [existingReportId, setExistingReportId] = useState(null);

  const [attendanceStats, setAttendanceStats] = useState({
    total: 0,
    present: 0,
  });

  const [metrics, setMetrics] = useState({
    attendance: "",
    focus: "",
    skill: "",
    coach: "",
    fitness: "",
    team: "",
    discipline: "",
  });

  const [metricObservations, setMetricObservations] = useState({
    focus: "",
    skill: "",
    coach: "",
    fitness: "",
    team: "",
    discipline: "",
  });

  /* 🔽 NEW STATE ONLY */
  const [showPhysicalFitness, setShowPhysicalFitness] = useState(false);

  /* 🔽 NEW STATE (LOGIC ONLY, NO UI CHANGE) */
  const [physicalFitness, setPhysicalFitness] = useState({
    speed: { value: "", observation: "" },
    strength: { value: "", observation: "" },
    flexibility: { value: "", observation: "" },
    stamina: { value: "", observation: "" },
    agility: { value: "", observation: "" },
  });

  useEffect(() => {
    console.log("[INIT] Component Mounted");
    fetchInstituteStudents();
  }, []);

  useEffect(() => {
    console.log("[MONTH CHANGE]", selectedMonth);
    filterByMonth();
  }, [selectedMonth, students]);

  useEffect(() => {
    console.log("[STUDENT SELECTED]", selectedStudent);
    if (selectedStudent) {
      fetchAttendance();
      fetchExistingPerformance(); // 🔥 new
    }
  }, [selectedStudent, selectedMonth]);

  const fetchInstituteStudents = async () => {
    try {
      const user = auth.currentUser;
      console.log("[AUTH USER]", user?.uid);
      if (!user) return;

      console.log("[FETCH MODE] instituteId based student fetch");

      const q = query(
        collection(db, "trainerstudents"),
        where("trainerId", "==", user.uid),
      );

      const snap = await getDocs(q);

      console.log("[INSTITUTE STUDENTS COUNT]", snap.size);

      const list = [];
      snap.forEach((d) => {
        console.log("[STUDENT FOUND]", d.id, d.data());
        list.push({ id: d.id, ...d.data() });
      });

      console.log("[FINAL STUDENT LIST]", list);
      setStudents(list);
    } catch (err) {
      console.error("[ERROR fetchInstituteStudents]", err);
    }
  };

  const filterByMonth = () => {
    console.log("[FILTER BY MONTH] START");
    const month = dayjs(selectedMonth);
    const filtered = students.filter((s) => {
      if (!s.createdAt) {
        console.log("[NO CREATEDAT]", s.id);
        return false;
      }
      const joinDate = dayjs(s.createdAt.toDate());
      const valid =
        joinDate.isSame(month, "month") || joinDate.isBefore(month, "month");
      console.log("[MONTH FILTER]", s.id, joinDate.format(), valid);
      return valid;
    });
    console.log("[FILTERED STUDENTS]", filtered);
    setFilteredStudents(filtered);
  };

  const fetchAttendance = async () => {
    try {
      const user = auth.currentUser;
      if (!user || !selectedStudent) return;

      console.log("[FETCH ATTENDANCE] START");

      const start = dayjs(selectedMonth).startOf("month").format("YYYY-MM-DD");
      const end = dayjs(selectedMonth).endOf("month").format("YYYY-MM-DD");

      console.log("[MONTH RANGE]", start, "→", end);
      const colPath = `trainers/${user.uid}/attendance`;

      const snap = await getDocs(collection(db, colPath));

      const records = [];

      snap.forEach((d) => {
        const data = d.data();

        // 🔥 MATCHING NEW DATA STRUCTURE
        if (
          data.studentId === selectedStudent &&
          typeof data.date === "string" &&
          data.date >= start &&
          data.date <= end
        ) {
          records.push(data);
        }
      });

      console.log("[ATTENDANCE RECORDS]", records);

      if (records.length === 0) {
        console.log("[NO ATTENDANCE DATA]");
        setAttendancePercent(null);
        setAttendanceStats({ total: 0, present: 0 });
        setMetrics((prev) => ({ ...prev, attendance: "No Data" }));
        return;
      }

      let total = records.length;

      let present = records.filter(
        (r) => String(r.status).toLowerCase() === "present",
      ).length;

      const percent = ((present / total) * 100).toFixed(2);

      console.log("[ATTENDANCE CALC]", { total, present, percent });

      setAttendanceStats({ total, present });
      setAttendancePercent(percent);
      setMetrics((prev) => ({ ...prev, attendance: `${percent}%` }));
    } catch (err) {
      console.error("[ERROR fetchAttendance]", err);
    }
  };
  const fetchExistingPerformance = async () => {
    try {
      const user = auth.currentUser;
      if (!user || !selectedStudent || !selectedMonth) return;

      const monthKey = dayjs(selectedMonth).format("YYYY-MM");

      console.log("[CHECK EXISTING PERFORMANCE]", selectedStudent, monthKey);

      const q = query(
        collection(db, `trainers/${user.uid}/performancestudents`),
        where("studentId", "==", selectedStudent),
        where("month", "==", monthKey),
      );

      const snap = await getDocs(q);

      if (snap.empty) {
        console.log("[NO EXISTING REPORT]");
        setExistingReportId(null);
        return;
      }

      // Only one doc should exist (secure uniqueness)
      const docSnap = snap.docs[0];
      const data = docSnap.data();

      console.log("[EXISTING REPORT FOUND]", docSnap.id, data);

      setExistingReportId(docSnap.id);

      // 🔽 AUTO FILL
      setSelectedCategory(data.category || "");
      setSelectedSubCategory(data.subCategory || "");

      setAttendancePercent(data.attendance || null);
      setAttendanceStats(data.attendanceStats || { total: 0, present: 0 });

      setMetrics(
        data.metrics || {
          attendance: "",
          focus: "",
          skill: "",
          coach: "",
          fitness: "",
          team: "",
          discipline: "",
        },
      );
      if (data.metricObservations) {
        setMetricObservations({
          focus: data.metricObservations.focus || "",
          skill: data.metricObservations.skill || "",
          coach: data.metricObservations.coach || "",
          fitness: data.metricObservations.fitness || "",
          team: data.metricObservations.team || "",
          discipline: data.metricObservations.discipline || "",
        });
      }

      if (data.physicalFitness) {
        setPhysicalFitness({
          speed: data.physicalFitness.speed || { value: "", observation: "" },
          strength: data.physicalFitness.strength || {
            value: "",
            observation: "",
          },
          flexibility: data.physicalFitness.flexibility || {
            value: "",
            observation: "",
          },
          stamina: data.physicalFitness.stamina || {
            value: "",
            observation: "",
          },
          agility: data.physicalFitness.agility || {
            value: "",
            observation: "",
          },
        });
      }
    } catch (err) {
      console.error("[ERROR fetchExistingPerformance]", err);
    }
  };

  const handleSave = async () => {
    try {
      const user = auth.currentUser;
      if (!user || !selectedStudent) return;

      const monthKey = dayjs(selectedMonth).format("YYYY-MM");
      const savePath = `trainers/${user.uid}/performancestudents`;

      const payload = {
        studentId: selectedStudent,
        month: monthKey,
        category: selectedCategory,
        subCategory: selectedSubCategory,
        attendance: attendancePercent,
        attendanceStats,
        metrics,
        metricObservations,

        physicalFitness: {
          speed: physicalFitness.speed,
          strength: physicalFitness.strength,
          flexibility: physicalFitness.flexibility,
          stamina: physicalFitness.stamina,
          agility: physicalFitness.agility,
        },

        updatedAt: serverTimestamp(),
        updatedBy: user.uid,
      };

      if (existingReportId) {
        // 🔁 UPDATE MODE
        console.log("[UPDATE MODE]", existingReportId);

        await setDoc(doc(db, savePath, existingReportId), payload, {
          merge: true,
        });

        alert("Performance Report Updated Successfully ✅");
      } else {
        // ➕ CREATE MODE
        console.log("[CREATE MODE]");

        await addDoc(collection(db, savePath), {
          ...payload,
          createdAt: serverTimestamp(),
          createdBy: user.uid,
        });

        alert("Performance Report Saved Successfully ✅");
      }
    } catch (err) {
      console.error("[ERROR SAVE]", err);
    }
  };
  useEffect(() => {
    const handleClickOutside = (e) => {

      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setShowCategoryDropdown(false);
      }

      if (subCategoryRef.current && !subCategoryRef.current.contains(e.target)) {
        setShowSubCategoryDropdown(false);
      }

    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">
            Student <span className="text-orange-500">Performance</span> Report
          </h2>
          <p className="text-gray-500">
            Create comprehensive performance evaluations for students
          </p>
        </div>
        <select
          className="bg-orange-500 text-white px-4 py-2 rounded-lg w-full sm:w-auto"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          {Array.from({ length: 12 }).map((_, i) => {
            const m = dayjs().month(i).format("YYYY-MM");
            return (
              <option key={i} value={m}>
                {dayjs(m).format("MMMM YYYY")}
              </option>
            );
          })}
        </select>
      </div>

      {/* FILTERS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
        <select
          className="border border-orange-300 rounded-lg p-3 w-full"
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
        >
          <option value="">Select Student Name*</option>
          {filteredStudents.map((s) => (
            <option key={s.id} value={s.id}>
              {s.firstName} {s.lastName}
            </option>
          ))}
        </select>

        <div ref={categoryRef} className="relative">
          <button
            type="button"
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            className={`${inputClass} flex items-center justify-between text-left`}
          >
            <span>
              {selectedCategory ? selectedCategory : "Select Category"}
            </span>

            <ChevronDown
              size={18}
              className={`ml-2 transition-transform ${showCategoryDropdown ? "rotate-180" : ""
                }`}
            />
          </button>

          {showCategoryDropdown && (
            <div className="absolute z-50 mt-1 w-full left-0 bg-white border rounded-lg shadow-md max-h-48 overflow-y-auto">

              {categories.map((cat) => (
                <div
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedSubCategory("");
                    setAvailableSubCategories(
                      subCategoryMap[cat] ? [...subCategoryMap[cat]] : []
                    );
                    setShowSubCategoryDropdown(false);
                    setShowCategoryDropdown(false);
                  }}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {cat}
                </div>
              ))}

            </div>
          )}
        </div>
        <div ref={subCategoryRef} className="relative">
          <button
            type="button"
            disabled={!selectedCategory}
            onClick={() =>
              selectedCategory &&
              setShowSubCategoryDropdown(!showSubCategoryDropdown)
            }
            className={`${inputClass} flex items-center justify-between text-left ${!selectedCategory && "bg-gray-100 cursor-not-allowed"
              }`}
          >
            <span>
              {selectedSubCategory
                ? selectedSubCategory
                : selectedCategory
                  ? "Select Sub Category"
                  : "Select Category First"}
            </span>

            <ChevronDown
              size={18}
              className={`ml-2 transition-transform ${showSubCategoryDropdown ? "rotate-180" : ""
                }`}
            />
          </button>

          {showSubCategoryDropdown && (
            <div className="absolute z-50 mt-1 w-full left-0 bg-white border rounded-lg shadow-md max-h-48 overflow-y-auto">

              {availableSubCategories.map((sub) => (
                <div
                  key={sub}
                  onClick={() => {
                    setSelectedSubCategory(sub);
                    setShowSubCategoryDropdown(false);
                  }}
                  className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                >
                  {sub}
                </div>
              ))}

            </div>
          )}
        </div>

        <select className="border border-orange-300 rounded-lg p-3">
          <option value="">Select Age</option>
          <option>01 – 10 years Kids</option>
          <option>11 – 20 years Teenage</option>
          <option>21 – 45 years Adults</option>
          <option>45 – 60 years Middle Age</option>
          <option>61 – 100 years Senior Citizens</option>
        </select>
        <select className="border border-orange-300 rounded-lg p-3">
          <option value="">Select Belt</option>
          <option>White</option>
          <option>Yellow</option>
          <option>Orange</option>
          <option>Blue</option>
          <option>Brown</option>
          <option>Black</option>
          <option>Green</option>
        </select>
      </div>

      {/* GENERAL METRICS */}
      <div className="mt-8">
        <h3 className="font-semibold text-lg mb-3">General Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {/* Attendance Auto */}
          <div className="border border-orange-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-orange-500">Attendance</p>
            <input
              className="w-full mt-2 p-2 border border-orange-300 rounded-lg bg-gray-100"
              value={metrics.attendance}
              readOnly
            />
            <p className="text-xs text-gray-500 mt-1">
              {attendanceStats.total > 0
                ? `${attendanceStats.present}/${attendanceStats.total} classes`
                : "No Data"}
            </p>
          </div>

          {["focus", "skill", "coach", "fitness", "team", "discipline"].map(
            (key, i) => (
              <div
                key={i}
                className="border border-orange-200 rounded-xl p-4 flex flex-col"
              >
                <p className="text-sm font-semibold text-orange-500">
                  {key.toUpperCase()}
                </p>
                <input
                  className="w-full mt-2 p-2 border border-orange-300 rounded-lg"
                  placeholder="Score Rating (Eg : 8/10)"
                  value={metrics[key]}
                  onChange={(e) =>
                    setMetrics({ ...metrics, [key]: e.target.value })
                  }
                />
                <input
                  className="w-full mt-2 p-2 border border-orange-300 rounded-lg"
                  placeholder="Add Observation"
                  value={metricObservations[key]}
                  onChange={(e) =>
                    setMetricObservations({
                      ...metricObservations,
                      [key]: e.target.value,
                    })
                  }
                />
              </div>
            ),
          )}
        </div>
      </div>

      {/* PHYSICAL FITNESS */}
      <div className="mt-6">
        <div
          onClick={() => setShowPhysicalFitness(!showPhysicalFitness)}
          className="bg-slate-800 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-between"
        >
          <span>Physical Fitness</span>
          <span className="text-lg flex items-center">
            {showPhysicalFitness ? "▲" : "▼"}
          </span>
        </div>

        {showPhysicalFitness && (
          <div className="mt-4 space-y-4">
            {["Speed", "Strength", "Flexibility", "Stamina", "Agility"].map(
              (item, i) => (
                <div
                  key={i}
                  className="border border-orange-200 rounded-xl p-4 bg-orange-50"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <p className="font-semibold text-orange-500">{item}</p>
                      <p className="text-xs text-gray-500">
                        Rate 1-10 or add custom value
                      </p>
                    </div>

                    <div>
                      <p className="text-sm font-semibold">Measured Value</p>
                      <input
                        className="w-full mt-2 p-2 border border-orange-300 rounded-lg bg-white"
                        placeholder="Value"
                        value={physicalFitness[item.toLowerCase()]?.value || ""}
                        onChange={(e) =>
                          setPhysicalFitness((prev) => ({
                            ...prev,
                            [item.toLowerCase()]: {
                              ...prev[item.toLowerCase()],
                              value: e.target.value,
                            },
                          }))
                        }
                      />
                      ...
                      <input
                        className="w-full mt-2 p-2 border border-orange-300 rounded-lg bg-white"
                        placeholder="Observation"
                        value={
                          physicalFitness[item.toLowerCase()]?.observation || ""
                        }
                        onChange={(e) =>
                          setPhysicalFitness((prev) => ({
                            ...prev,
                            [item.toLowerCase()]: {
                              ...prev[item.toLowerCase()],
                              observation: e.target.value,
                            },
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <div className="flex flex-col sm:flex-row justify-end gap-4 mt-10">
        <button className="text-orange-500 font-semibold">Back</button>
        <button
          onClick={handleSave}
          className="bg-orange-500 text-white px-6 py-2 rounded-lg font-semibold w-full sm:w-auto"
        >
          Save
        </button>
      </div>
    </div>
  );
}