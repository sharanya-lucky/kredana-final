import React, { useEffect, useState } from "react";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../../../firebase";
import { useAuth } from "../../../../context/AuthContext";

const MediaGallery = ({ setStep }) => {
  const { user } = useAuth();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    trainingImages: [],
    facilityImages: [],
    equipmentImages: [],
    uniformImages: []
  });


  // ================= LOAD DATA =================
  useEffect(() => {
    const fetchData = async () => {
      if (!user?.uid) return;

      try {
        const docRef = doc(db, "myactivity", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().mediaGallery) {
          setFormData(docSnap.data().mediaGallery);
        }
      } catch (error) {
        console.error("Error loading:", error);
      }

      setLoading(false);
    };

    fetchData();
  }, [user]);

  // ================= FILE CHANGE =================
const handleFileChange = (e) => {
  const { name, files } = e.target;
  if (!files[0]) return;

  const selectedFiles = Array.from(files);

  setFormData((prev) => {
    const existingImages = prev[name] || [];

    const newImages = selectedFiles.map((file) =>
      URL.createObjectURL(file)
    );

    return {
      ...prev,
      [name]: [...existingImages, ...newImages]
    };
  });
};


  // ================= SAVE =================
  const handleSave = async () => {
    if (!user?.uid) return;

    try {
      setSaving(true);

      await setDoc(
        doc(db, "myactivity", user.uid),
        {
          mediaGallery: formData,
          updatedAt: serverTimestamp()
        },
        { merge: true }
      );

      alert("Saved Successfully!");
    } catch (error) {
      console.error("Error saving:", error);
      alert("Error saving data");
    }

    setSaving(false);
  };

  // ================= CANCEL =================
  const handleCancel = () => {
    setFormData({
      trainingImages: [],
      facilityImages: [],
      equipmentImages: [],
      uniformImages: []
    });

  };

  if (loading) {
    return <p className="text-gray-500 p-6">Loading...</p>;
  }

  return (
    <div className="w-full">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-md p-6 sm:p-8">

        {/* BACK */}
        <div
          onClick={() => setStep(5)}
          className="flex items-center gap-2 text-orange-500 font-medium mb-4 cursor-pointer hover:text-orange-600 transition"
        >
          ← Back
        </div>

        <div className="border-b border-gray-300 mb-6"></div>

        <h2 className="text-orange-500 font-semibold text-lg sm:text-xl mb-6">
          Media & Gallery
        </h2>

        {/* SINGLE COLUMN LAYOUT */}
        <div className="grid grid-cols-1 gap-6">

          {[
            { label: "Training Images", name: "trainingImages" },
            { label: "Facility Images", name: "facilityImages" },
            { label: "Equipment Images", name: "equipmentImages" },
            { label: "Uniform Images", name: "uniformImages" }
          ].map((field) => (
            <div key={field.name} className="flex flex-col">

              <label className="text-sm font-medium mb-2">
                {field.label}
              </label>

              <label className="cursor-pointer">
                <input
                  type="file"
                  name={field.name}
                  accept="image/*"
                  multiple
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="border border-gray-300 rounded-md px-3 py-2 flex justify-between items-center hover:border-orange-500 transition">
                  <span className="text-gray-500">
                    {formData[field.name]?.length > 0
                      ? `${formData[field.name].length} image(s) uploaded`
                      : "Upload Images"}
                  </span>
                  <img src="/upload.png" alt="upload" className="w-5 h-5" />
                </div>
              </label>

            </div>
          ))}

        </div>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
          <button
            type="button"
            onClick={handleCancel}
            className="text-orange-500 font-medium hover:text-orange-600 transition"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md transition shadow-sm"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

      </div>
    </div>
  );
};

export default MediaGallery;