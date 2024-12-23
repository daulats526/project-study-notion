import { useDispatch, useSelector } from "react-redux";
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import { formatDate } from "../../../../services/formatDate";
import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI";
import ConfirmationModal from "../../../common/ConfirmationModal";
import { COURSE_STATUS } from "../../../../utils/constants";

export default function CoursesTable({ courses, setCourses }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const [loadingCourseId, setLoadingCourseId] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const TRUNCATE_LENGTH = 30;

  const handleCourseDelete = async (courseId) => {
    setLoadingCourseId(courseId);
    await deleteCourse({ courseId }, token);
    const result = await fetchInstructorCourses(token);
    if (result) setCourses(result);
    setConfirmationModal(null);
    setLoadingCourseId(null);
  };

  const renderCourseDescription = (description) => {
    if (!description) return "No description available";
    const words = description.split(" ");
    return words.length > TRUNCATE_LENGTH
      ? `${words.slice(0, TRUNCATE_LENGTH).join(" ")}...`
      : description;
  };

  const setupConfirmationModal = (courseId) => {
    setConfirmationModal({
      text1: "Do you want to delete this course?",
      text2: "All the data related to this course will be deleted",
      btn1Text: loadingCourseId === courseId ? "Loading..." : "Delete",
      btn2Text: "Cancel",
      btn1Handler: loadingCourseId !== courseId
        ? () => handleCourseDelete(courseId)
        : null,
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  return (
    <>
      <Table className="rounded-xl border border-slate-800">
        <Thead>
          <Tr className="flex gap-x-10 rounded-t-md border-b border-b-slate-800 px-6 py-2">
            <Th className="flex-1 text-left text-sm font-medium uppercase text-slate-100">
              Courses
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-slate-100">
              Duration
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-slate-100">
              Price
            </Th>
            <Th className="text-left text-sm font-medium uppercase text-slate-100">
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {courses?.length === 0 ? (
            <Tr>
              <Td className="py-10 text-center text-2xl font-medium text-slate-100">
                No courses found
              </Td>
            </Tr>
          ) : (
            courses.map((course) => (
              <Tr
                key={course._id || course.index}
                className="flex gap-x-10 border-b border-slate-800 px-6 py-8"
              >
                <Td className="flex flex-1 gap-x-4">
                  <img
                    src={course?.thumbnail}
                    alt={course?.courseName}
                    className="h-[148px] w-[220px] rounded-lg object-cover"
                  />
                  <div className="flex flex-col justify-between">
                    <p className="text-lg font-semibold text-slate-5">
                      {course.courseName}
                    </p>
                    <p className="text-xs text-slate-300">
                      {renderCourseDescription(course.courseDescription)}
                    </p>
                    <p className="text-[12px] text-white">
                      Created: {formatDate(course.createdAt)}
                    </p>
                    {course.status === COURSE_STATUS.DRAFT ? (
                      <p className="flex w-fit items-center gap-2 rounded-full bg-slate-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                        <HiClock size={14} />
                        Drafted
                      </p>
                    ) : (
                      <p className="flex w-fit items-center gap-2 rounded-full bg-slate-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                        <FaCheck size={8} />
                        Published
                      </p>
                    )}
                  </div>
                </Td>
                <Td className="text-sm font-medium text-slate-100">
                  {course.duration || "N/A"}
                </Td>
                <Td className="text-sm font-medium text-slate-100">
                  ₹{course.price}
                </Td>
                <Td className="text-sm font-medium text-slate-100">
                  <button
                    disabled={loadingCourseId === course._id}
                    onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                    title="Edit"
                    className={`px-2 transition-all duration-200 ${
                      loadingCourseId === course._id
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:scale-110 hover:text-caribbeangreen-300"
                    }`}
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <button
                    disabled={loadingCourseId === course._id}
                    onClick={() => setupConfirmationModal(course._id)}
                    title="Delete"
                    className={`px-1 transition-all duration-200 ${
                      loadingCourseId === course._id
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:scale-110 hover:text-[#ff0000]"
                    }`}
                  >
                    <RiDeleteBin6Line size={20} />
                  </button>
                </Td>
              </Tr>
            ))
          )}
        </Tbody>
      </Table>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
}
