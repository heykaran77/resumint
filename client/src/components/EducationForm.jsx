import { GraduationCap, Plus, Trash2 } from "lucide-react";

const EducationForm = ({ data, onChange }) => {
  const addEducation = () => {
    const newEducation = {
      institution: "",
      degree: "",
      field: "",
      graduation_date: "",
      gpa: "",
    };
    onChange([...data, newEducation]);
  };

  const removeEducation = (idx) => {
    const updated = data.filter((_, i) => i !== idx);
    onChange(updated);
  };

  const updateEducation = (idx, field, value) => {
    const updated = [...data];
    updated[idx] = { ...updated[idx], [field]: value };

    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Education Details
          </h3>
          <p className="text-sm text-gray-500">Add your education details.</p>
        </div>
        <button
          onClick={addEducation}
          className="text-green-700 flex items-center gap-2 px-3 py-2 text-sm bg-green-100 rounded-lg hover:bg-green-200 transition-colors">
          <Plus size={18} />
          Add Education
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <GraduationCap size={56} className="mx-auto mb-3 text-gray-300" />
          <p>No education added yet.</p>
          <p className="text-sm">Click "Add Education" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((education, idx) => (
            <div
              key={idx}
              className="p-4 border border-gray-200 rounded-lg space-y-3">
              <div className="flex justify-between items-start">
                <h4>Education #{idx + 1}</h4>
                <button
                  onClick={() => removeEducation(idx)}
                  className="text-red-500 hover:text-red-700 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={education.institution || ""}
                  onChange={(e) =>
                    updateEducation(idx, "institution", e.target.value)
                  }
                  placeholder="Institute Name"
                  className="px-3 py-2 text-sm rounded-lg"
                />
                <input
                  type="text"
                  value={education.degree || ""}
                  placeholder="Degree (eg. Bachelor's or Master's)"
                  onChange={(e) =>
                    updateEducation(idx, "degree", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg"
                />
                <input
                  type="text"
                  value={education.field || ""}
                  placeholder="Field of study (eg. Computer Science or Business)"
                  onChange={(e) =>
                    updateEducation(idx, "field", e.target.value)
                  }
                  className="px-3 py-2 text-sm rounded-lg"
                />
                <input
                  type="month"
                  className="px-3 py-2 text-sm rounded-lg"
                  value={education.graduation_date || ""}
                  onChange={(e) =>
                    updateEducation(idx, "graduation_date", e.target.value)
                  }
                />
                <input
                  type="text"
                  className="px-3 py-2 text-sm rounded-lg"
                  value={education.gpa || ""}
                  onChange={(e) => updateEducation(idx, "gpa", e.target.value)}
                  placeholder="GPA (optional)"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EducationForm;
