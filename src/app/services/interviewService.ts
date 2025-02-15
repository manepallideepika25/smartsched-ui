import axios from "axios";

const API_URL = "http://localhost:5000/api/interviews";

export interface Interview {
  _id?: string;
  candidateName: string;
  interviewDate: string;
  interviewTime: string;
  status: string;
}

// ✅ Function to get authentication headers with the token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    console.error("❌ No authentication token found!");
    throw new Error("Unauthorized: No token found");
  }

  return { headers: { Authorization: `Bearer ${token}` } };
};

// ✅ Fetch interviews created by the logged-in user
export const getUserInterviews = async () => {
  try {
    console.log("🔹 Fetching user interviews...");
    const response = await axios.get(API_URL, getAuthHeaders());
    console.log("✅ Interviews retrieved:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error fetching interviews:", error);
    throw error;
  }
};

// ✅ Create a new interview
export const createInterview = async (interviewData: Interview) => {
  try {
    console.log("🔹 Sending interview creation request:", interviewData);
    const response = await axios.post(API_URL, interviewData, getAuthHeaders());
    console.log("✅ Interview Created:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error creating interview:", error);
    if (axios.isAxiosError(error) && error.response) {
      console.error("🔹 Server Response:", error.response.data);
    }
    throw error;
  }
};


// ✅ Update an existing interview
export const updateInterview = async (id: string, updatedData: Interview) => {
  try {
    console.log("🔹 Updating interview:", id);
    const response = await axios.put(`${API_URL}/${id}`, updatedData, getAuthHeaders());
    console.log("✅ Interview Updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error updating interview:", error);
    throw error;
  }
};

// ✅ Delete an interview
export const deleteInterview = async (id: string) => {
  try {
    console.log("🔹 Deleting interview:", id);
    const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    console.log("✅ Interview Deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error deleting interview:", error);
    throw error;
  }
};
