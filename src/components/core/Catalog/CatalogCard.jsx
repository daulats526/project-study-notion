

import { Link } from 'react-router-dom';

const CatalogCard = ({course, Height}) => {


   

    
  return (
    <>
      <Link to={`/courses/${course._id}`}>
        <div className="">
          <div className="rounded-lg">
            <img
              src={course?.thumbnail}
              alt="course thumnail"
              className={`${Height} w-full rounded-xl object-cover `}
            />
          </div>
          <div className="flex flex-col gap-2 px-1 py-3">
            <p className="text-xl text-slate-5">{course?.courseName}</p>
            <p className="text-sm text-slate-50">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
          
            <p className="text-xl text-slate-5">Rs. {course?.price}</p>
          </div>
        </div>
      </Link>
    </>
  )
}

export default CatalogCard
