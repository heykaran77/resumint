import {
  FilePenIcon,
  PencilIcon,
  PlusIcon,
  Trash2Icon,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { dummyResumeData } from "../assets/dummyData";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const [allResumes, setallResumes] = useState([]);
  const [showUploadResume, setShowUploadResume] = useState(false);
  const [showCreateResume, setShowCreateResume] = useState(false);
  const [title, setTitle] = useState("");
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState("");

  const loadAllResumes = async () => {
    setallResumes(dummyResumeData);
  };

  const createResume = (e) => {
    e.preventDefault();
    setShowCreateResume(false);
    navigate(`/app/builder/res123`);
  };

  useEffect(() => {
    loadAllResumes();
  }, []);

  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <p className="text-2xl mb-6 font-medium bg-linear-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent sm:hidden">
          Welcome, Karan
        </p>

        <div className="flex gap-4">
          <button
            onClick={() => setShowCreateResume(true)}
            className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-green-500 hover:shadow-md transition-all duration-300">
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-linear-to-r from-indigo-600 to-indigo-400 text-white rounded-full" />
            <p className="text-sm group-hover:text-green-600 transition-all duration-300">
              {" "}
              Create Resume
            </p>
          </button>
          <button className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-green-500 hover:shadow-md transition-all duration-300">
            <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-linear-to-r from-purple-600 to-purple-400 text-white rounded-full" />
            <p className="text-sm group-hover:text-green-600 transition-all duration-300">
              {" "}
              Upload Existing
            </p>
          </button>
        </div>

        <hr className="border-slate-300 my-6 sm:w-[305px]" />

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, idx) => {
            const baseColor = colors[idx % colors.length];

            return (
              <button
                key={idx}
                className="relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border group hover:shadow-lg transition-all duration-300"
                style={{
                  background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`,
                  borderColor: baseColor + "40",
                }}>
                <FilePenIcon
                  className="size-7 group-hover:scale-105 transition-all"
                  style={{
                    color: baseColor,
                  }}
                />
                <p
                  className="text-sm transition-all group-hover:scale-105 px-2 text-center"
                  style={{
                    color: baseColor,
                  }}>
                  {resume.title}
                </p>
                <p
                  className="absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2 text-center"
                  style={{
                    color: baseColor + "90",
                  }}>
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>

                <div className="absolute top-1 right-1 group-hover:flex items-center hidden">
                  <Trash2Icon className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors" />
                  <PencilIcon className="size-7 p-1.5 hover:bg-white/50 rounded text-slate-700 transition-colors" />
                </div>
              </button>
            );
          })}
        </div>

        {showCreateResume && (
          <form
            onSubmit={createResume}
            onClick={() => setShowCreateResume(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-10 flex items-center justify-center">
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6">
              <h2 className="text-xl font-bold mb-4">Create Resume</h2>
              <input
                type="text"
                placeholder="Enter resume title"
                required
                className="w-full px-4 py-2 mb-4 focus:border-green-600 ring-green-600 rounded-lg"
              />
              <button className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors">
                Create Resume
              </button>
              <XIcon
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors"
                onClick={() => {
                  setShowCreateResume(false);
                  setTitle("");
                }}
              />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
