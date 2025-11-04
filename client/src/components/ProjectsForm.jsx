import { GithubIcon, Plus, Trash2 } from "lucide-react";

const ProjectsForm = ({ data, onChange }) => {
  const addProject = () => {
    const newProject = {
      name: "",
      type: "",
      description: "",
    };
    onChange([...data, newProject]);
  };

  const removeProject = (idx) => {
    const updated = data.filter((_, i) => i !== idx);
    onChange(updated);
  };

  const updateProject = (idx, field, value) => {
    const updated = [...data];
    updated[idx] = { ...updated[idx], [field]: value };

    onChange(updated);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold text-gray-900">
            Project Details
          </h4>
          <p className="text-sm text-gray-500">Add your project details.</p>
        </div>

        <button
          onClick={addProject}
          className="flex items-center text-green-700 hover:bg-green-200 bg-green-100 px-3 py-2 rounded-lg gap-2 text-sm">
          <Plus size={18} />
          Add Project
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-gray-500 py-8 text-center">
          <GithubIcon size={56} className="mx-auto mb-3 text-gray-300" />
          <p>No projects added yet.</p>
          <p className="text-sm">Click "Add Project" to get started.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((project, idx) => (
            <div
              key={idx}
              className="p-4 border border-gray-200 space-y-3 rounded-lg">
              <div className="flex items-start justify-between">
                <h3>Project #{idx + 1}</h3>
                <button
                  onClick={() => removeProject(idx)}
                  className="text-red-500 hover:text-red-700 transition-colors">
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-3">
                <input
                  type="text"
                  value={project.name || ""}
                  onChange={(e) => updateProject(idx, "name", e.target.value)}
                  placeholder="Project Name"
                  className="px-3 py-2 rounded-lg text-sm"
                />
                <input
                  type="text"
                  value={project.type || ""}
                  onChange={(e) => updateProject(idx, "type", e.target.value)}
                  placeholder="Project Type"
                  className="px-3 py-2 rounded-lg text-sm"
                />
                <textarea
                  type="text"
                  rows={4}
                  value={project.description || ""}
                  onChange={(e) =>
                    updateProject(idx, "description", e.target.value)
                  }
                  placeholder="Describe your project..."
                  className="px-3 py-2 rounded-lg text-sm md:col-span-2"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProjectsForm;
