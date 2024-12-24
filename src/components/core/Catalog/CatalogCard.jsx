import React, { useEffect, useState } from 'react'
import GetAvgRating from '../../../utils/avgRating';
import { Link } from 'react-router-dom';

const CatalogCard = ({course, Height}) => {


    


    
  return (
    <>
      <Link to={`/courses/${course._id}`}>
        <div className="flex flex-row items-center justify-center gap-6 ">
          <div className="rounded-lg">
            <img
              src={course?.thumbnail}
              alt="course thumnail"
              className="w-[300px] rounded-xl object-cover h-[400px]" 
            />
          </div>
          <div className="flex flex-col gap-2 px-1 py-3">
            <p className="text-xl text-richblack-5">{course?.courseName}</p>
            <p className="text-sm text-richblack-50">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <p className="text-xl text-richblack-5">Rs. {course?.price}</p>
          </div>
        </div>
      </Link>
    </>
  )
}

export default CatalogCard