import React from 'react'
import {toast} from "react-hot-toast"
import { apiConnector } from '../apiconnect';
import { catalogData } from '../apis';


export const getCatalogaPageData = async (categoryId) => {
  const toastId = toast.loading("Loading...");
  let result = null; // Initialize result as null to signify a failure if not assigned
  try {
    const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, {
      categoryId: categoryId,
    });

    // Validate response structure
    if (!response?.data?.success) {
      throw new Error("Could not Fetch Category page data");
    }

    result = response?.data;
    console.log("Fetched catalog page data:", result);

  } catch (error) {
    // Handle API errors or network issues
    console.error("Catalog page data API error:", error);

    if (error.response) {
      // Handle response errors (e.g., 4xx/5xx)
      toast.error(`Error: ${error.response?.data?.message || error.message}`);
      result = error.response?.data; // Return the error response data for handling
    } else {
      // Handle non-response errors (network issues, etc.)
      toast.error("Network error or unexpected issue occurred.");
    }
  }

  toast.dismiss(toastId);
  return result;
};



