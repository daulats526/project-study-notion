import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllCourses } from '../services/operations/courseDetailsAPI';
import CatalogCard from '../components/core/Catalog/CatalogCard';

const Catalog = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    // Fetch course details
    (async () => {
      try {
        const res = await getAllCourses();
        setCourses(res);
      } catch (error) {
        console.error("Could not fetch Course Details:", error);
      }
    })();
  }, []);
    // console.log('courses:',courses)
  return (
    <div className='text-white'>
      <h1 className='text-2xl font-bold'>Course Catalog</h1>
      {courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        courses.map((course) => (
         <CatalogCard  course={course} />
        ))
      )}
    </div>
  );
};

export default Catalog;
