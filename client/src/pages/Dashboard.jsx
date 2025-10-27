import { FilePenIcon, PlusIcon, UploadCloudIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { dummyResumeData } from "../assets/dummyData";

const Dashboard = () => {
  const colors = ["#9333ea", "#d97706", "#dc2626", "#0284c7", "#16a34a"];

  const [allResumes, setallResumes] = useState([]);
  const loadAllResumes = async () => {
    setallResumes(dummyResumeData);
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
          <button className="w-full bg-white sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-green-500 hover:shadow-md transition-all duration-300">
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
                    color: baseColor + "40",
                  }}>
                  Updated on {new Date(resume.updatedAt).toLocaleDateString()}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
