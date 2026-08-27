import { useState } from "react";

function StudentResume() {
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState("");

  const handleFile = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowed.includes(file.type)) {
      setMessage("Please upload a PDF or Word document.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage("Resume must be smaller than 5 MB.");
      return;
    }

    setResume(file);
    setMessage("Resume selected successfully.");
  };

  const removeResume = () => {
    setResume(null);
    setMessage("");
  };

  return (
    <div className="space-y-7 max-w-5xl">

      <div>
        <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mb-2">
          CAREER DOCUMENTS
        </p>

        <h1 className="text-3xl md:text-4xl font-bold">
          My Resume
        </h1>

        <p className="text-slate-500 dark:text-slate-400 mt-2">
          Keep your latest resume ready for placement opportunities.
        </p>
      </div>

      {message && (
        <div className="px-4 py-3 rounded-xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-700 dark:text-blue-300">
          {message}
        </div>
      )}

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-8">

        {!resume ? (
          <label className="block cursor-pointer">

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFile}
              className="hidden"
            />

            <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-12 text-center hover:border-blue-500 hover:bg-blue-50/50 dark:hover:bg-blue-500/5 transition">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center text-3xl">
                📄
              </div>

              <h2 className="text-xl font-bold mt-5">
                Upload your resume
              </h2>

              <p className="text-slate-500 dark:text-slate-400 mt-2">
                PDF, DOC or DOCX up to 5 MB
              </p>

              <span className="inline-block mt-6 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold">
                Choose Resume
              </span>

            </div>

          </label>
        ) : (
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-xl bg-red-100 dark:bg-red-500/10 flex items-center justify-center text-2xl">
                📄
              </div>

              <div>
                <h3 className="font-bold">
                  {resume.name}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  {(resume.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>

            </div>

            <div className="flex gap-3">

              <label className="px-4 py-2.5 rounded-xl bg-blue-600 text-white font-semibold cursor-pointer">
                Replace
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFile}
                  className="hidden"
                />
              </label>

              <button
                onClick={removeResume}
                className="px-4 py-2.5 rounded-xl border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400"
              >
                Remove
              </button>

            </div>

          </div>
        )}

      </div>

      <div className="grid md:grid-cols-3 gap-4">

        <InfoCard
          icon="🔒"
          title="Private"
          text="Your resume is only shared with relevant placement opportunities."
        />

        <InfoCard
          icon="⚡"
          title="Quick Apply"
          text="Keep your resume ready so you can apply faster."
        />

        <InfoCard
          icon="🔄"
          title="Always Updated"
          text="Replace your resume whenever you have a newer version."
        />

      </div>

    </div>
  );
}

function InfoCard({ icon, title, text }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5">
      <div className="text-2xl">{icon}</div>
      <h3 className="font-bold mt-3">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 leading-6">
        {text}
      </p>
    </div>
  );
}

export default StudentResume;