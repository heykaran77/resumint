import { Briefcase, Plus, Sparkles, Trash2 } from "lucide-react";
import React from "react";

const ExperienceForm = ({ data, onChange }) => {
  const addExpreience = () => {
    const newExperience = {
      company: "",
      position: "",
      start_date: "",
      end_date: "",
      description: "",
      is_current: false,
    };

    onChange([...data, newExperience]);
  };

  const removeExperience = (idx) => {
    const updated = data.filter((_, i) => i != idx);
    onChange(updated);
  };

  const updateExperience = (idx, field, value) => {
    const updated = [...data];
    updated[idx] = { ...updated[idx], [field]: value };
    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg gap-2 flex items-center font-semibold text-gray-900">
            Professional Experience
          </h3>
          <p className="text-sm text-gray-500">Add your job experience.</p>
        </div>
        <button
          className="flex items-center gap-2 px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors"
          onClick={addExpreience}>
          <Plus size={18} />
          Add Experience
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Briefcase size={40} className="mx-auto mb-3 text-gray-300" />
          <p>No work experience added yet.</p>
          <p>Click "Add Experience" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((exp, idx) => (
            <div
              key={idx}
              className="p-4 border border-gray-200 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <h4>Experience #{idx + 1}</h4>
                <button
                  className="text-red-500 hover:text-red-700 transition-colors"
                  onClick={() => removeExperience(idx)}>
                  <Trash2 size={18} />
                </button>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                <input
                  value={exp.company || ""}
                  type="text"
                  placeholder="Company Name"
                  className="px-3 py-2 text-sm rounded-lg"
                  onChange={(e) =>
                    updateExperience(idx, "company", e.target.value)
                  }
                />
                <input
                  value={exp.position || ""}
                  type="text"
                  placeholder="Position"
                  className="px-3 py-2 text-sm rounded-lg"
                  onChange={(e) =>
                    updateExperience(idx, "position", e.target.value)
                  }
                />
                <input
                  value={exp.start_date || ""}
                  type="month"
                  className="px-3 py-2 text-sm rounded-lg"
                  onChange={(e) =>
                    updateExperience(idx, "start_date", e.target.value)
                  }
                />
                <input
                  value={exp.end_date || ""}
                  type="month"
                  className="px-3 py-2 text-sm rounded-lg disabled:bg-gray-100"
                  disabled={exp.is_current}
                  onChange={(e) =>
                    updateExperience(idx, "end_date", e.target.value)
                  }
                />
              </div>

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={exp.is_current || false}
                  onChange={(e) =>
                    updateExperience(
                      idx,
                      "is_current",
                      e.target.checked ? true : false
                    )
                  }
                  className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">
                  Currently working here.
                </span>
              </label>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">
                    Job Description
                  </label>
                  <button className="flex items-center gap-1 px-3 py-2 text-xs bg-purple-100 text-purple-700 rounded hover:bg-purple-200 transition-colors disabled:opacity-50">
                    <Sparkles size={18} />
                    Enhance with AI
                  </button>
                </div>
                <textarea
                  rows={4}
                  value={exp.description || ""}
                  onChange={(e) =>
                    updateExperience(idx, "description", e.target.value)
                  }
                  className="w-full text-sm px-3 py-2"
                  placeholder="Describe your key responsibilities & achievements..."
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExperienceForm;
