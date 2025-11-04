import { Plus, Sparkles, X } from "lucide-react";
import { useState } from "react";

const SkillsForm = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState("");

  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()]);
      setNewSkill("");
    }
  };

  const removeSkill = (idx) => {
    onChange(data.filter((_, i) => i !== idx));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg text-gray-900 font-semibold">Skill Details</h4>
        <p className="text-sm text-gray-500">Add your skills.</p>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter a skill eg. (Project management, JS)"
          className="px-3 py-2 text-sm flex-1"
          onChange={(e) => setNewSkill(e.target.value)}
          value={newSkill}
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={addSkill}
          disabled={!newSkill.trim()}
          className="text-green-700 hover:bg-green-200 bg-green-100 px-3 py-2 flex items-center rounded-lg text-sm disabled:cursor-not-allowed disabled:opacity-50">
          <Plus size={18} />
          Add Skill
        </button>
      </div>

      {data.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {data.map((skill, idx) => (
            <span
              key={idx}
              className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm select-none">
              {skill}
              <button
                onClick={() => removeSkill(idx)}
                className="ml-1 hover:bg-blue-200 rounded-full p-0.5 transition-colors">
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-gray-500">
          <Sparkles size={56} className="mx-auto mb-3 text-gray-300" />
          <p>No Skills added yet.</p>
          <p className="text-sm">Add your technical & soft skills above.</p>
        </div>
      )}

      <div className="p-3 bg-green-50 rounded-lg">
        <p className="text-sm text-green-800">
          <strong>Tip: </strong>
          Add 8–12 relevant skills — focus on the ones most relevant to the role
          and include a balanced mix of technical and soft skills.
        </p>
      </div>
    </div>
  );
};

export default SkillsForm;
