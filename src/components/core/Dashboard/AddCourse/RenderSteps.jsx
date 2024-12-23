import { FaCheck } from "react-icons/fa";
import { useSelector } from "react-redux";

import CourseBuilderForm from "./CourseBuilder/CourseBuilderForm";
import CourseInformationForm from "./CourseInformation/CourseInformationForm";
import PublishCourse from "./PublishCourse";

export default function RenderSteps() {
  const { step } = useSelector((state) => state.course);

  const steps = [
    { id: 1, title: "Course Information" },
    { id: 2, title: "Course Builder" },
    { id: 3, title: "Publish" },
  ];

  const StepComponents = [null, <CourseInformationForm />, <CourseBuilderForm />, <PublishCourse />];

  return (
    <>
      <div className="relative mb-2 flex w-full justify-center">
        {steps.map((item, index) => (
          <div key={item.id} className="flex flex-col items-center">
            <button
              className={`grid aspect-square w-[34px] place-items-center rounded-full border ${
                step === item.id
                  ? "border-yellow-50 bg-yellow-900 text-yellow-50"
                  : "border-slate-700 bg-slate-800 text-slate-300"
              } ${step > item.id ? "bg-yellow-50 text-slate-900" : ""}`}
            >
              {step > item.id ? <FaCheck className="font-bold" /> : item.id}
            </button>
            {index < steps.length - 1 && (
              <div
                className={`h-[2px] w-[33%] border-dashed ${
                  step > item.id ? "border-yellow-50" : "border-slate-500"
                }`}
              ></div>
            )}
          </div>
        ))}
      </div>

      <div className="relative mb-16 flex w-full select-none justify-between">
        {steps.map((item) => (
          <div key={item.id} className="flex flex-col items-center gap-y-2 sm:min-w-[130px] min-w-[80px]">
            <p
              className={`text-sm ${
                step >= item.id ? "text-slate-5" : "text-slate-500"
              }`}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>

      {/* Render step form */}
      {StepComponents[step]}
    </>
  );
}
