import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { dummyResumeData } from "../assets/dummyData";
import Loader from "../components/Loader";
import ResumePreview from "../components/ResumePreview";
import { ArrowLeft } from "lucide-react";
import api from "../configs/api";

const Preview = () => {
  const { resumeID } = useParams();
  const [resumeData, setResumeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadResume = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get(`/api/resumes/public/${resumeID}`);
      setResumeData(data.resume);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadResume();
  }, []);

  return resumeData ? (
    <div className="bg-slate-100">
      <div className="max-w-3xl mx-auto py-10">
        <ResumePreview
          data={resumeData}
          template={resumeData.template}
          accentColor={resumeData.accent_color}
          classess="py-4 bg-white"
        />
      </div>
    </div>
  ) : (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex items-center flex-col justify-center h-screen">
          <p className="text-center text-3xl md:text-6xl text-slate-400 font-medium">
            Resume not found.
          </p>
          <a
            href="/"
            className="mt-6 bg-green-100 hover:bg-green-200 text-green-600 rounded-full px-6 py-1 m-1 ring-offset-1 ring-1 ring-green-400 flex items-center gap-2">
            <ArrowLeft className="size-4" />
            return to home
          </a>
        </div>
      )}
    </div>
  );
};

export default Preview;
