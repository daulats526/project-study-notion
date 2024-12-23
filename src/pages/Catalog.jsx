import React, { useEffect, useState } from 'react';
import Footer from '../components/common/Footer';
import { useParams } from 'react-router-dom';
import { apiConnector } from '../services/apiconnect';
import { categories } from '../services/apis';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import CatalogCard from '../components/core/Catalog/CatalogCard';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import { useSelector } from "react-redux";
import Error from "./Error";

const Catalog = () => {
  const { loading } = useSelector((state) => state.profile);
  const { catalogName } = useParams();
  const [active, setActive] = useState(1);
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");

  // Fetch all categories
  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API);
        const category = res?.data?.data?.find(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        );
        if (category) {
          setCategoryId(category._id);
        } else {
          console.error('Category not found');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    getCategories();
  }, [catalogName]);

  // Fetch category details based on categoryId
  useEffect(() => {
    const getCategoryDetails = async () => {
      try {
        if (categoryId) {
          const res = await getCatalogaPageData(categoryId);
          setCatalogPageData(res);
        }
      } catch (error) {
        console.error('Error fetching category details:', error);
      }
    };
    getCategoryDetails();
  }, [categoryId]);

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
        <p className="mt-4 text-sm text-gray-500">Loading courses...</p>
      </div>
    );
  }

  if (!loading && !catalogPageData.success) {
    return <Error />;
  }

  const { selectedCategory, differentCategory, mostSellingCourses } = catalogPageData?.data || {};

  return (
    <>
      {/* Hero Section */}
      <div className="box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent ">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25">{selectedCategory?.name}</span>
          </p>
          <p className="text-3xl text-richblack-5">{selectedCategory?.name}</p>
          <p className="max-w-[870px] text-richblack-200">{selectedCategory?.description}</p>
        </div>
      </div>

      {/* Section 1: Most Popular / New Courses */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Courses to get you started</div>
        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          <p
            className={`px-4 py-2 ${active === 1 ? "border-b border-b-yellow-25 text-yellow-25" : "text-richblack-50"} cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Popular
          </p>
          <p
            className={`px-4 py-2 ${active === 2 ? "border-b border-b-yellow-25 text-yellow-25" : "text-richblack-50"} cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div>
          <CourseSlider Courses={selectedCategory?.courses} />
        </div>
      </div>

      {/* Section 2: Top Courses */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">
          Top courses in {differentCategory?.name}
        </div>
        <div className="py-8">
          <CourseSlider Courses={differentCategory?.courses} />
        </div>
      </div>

      {/* Section 3: Frequently Bought */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Frequently Bought</div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {mostSellingCourses?.slice(0, 4).map((course, i) => (
              <CatalogCard course={course} key={i} Height={"h-[400px]"} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Catalog;
