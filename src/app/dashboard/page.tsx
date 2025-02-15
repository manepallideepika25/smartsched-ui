"use client";

import { useContext, useEffect, useState } from "react";
import { Container, Typography, Button, Paper, Box } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { Interview, deleteInterview, getUserInterviews } from "../services/interviewService";
import InterviewTable from "../components/InterviewTable";
import SchedulePopup from "../components/SchedulePopup";

export default function Dashboard() {
  const auth = useContext(AuthContext);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<Interview | undefined>(undefined);

  useEffect(() => {
    const fetchInterviews = async () => {
      try {
        const res = await getUserInterviews();
        setInterviews(res || []);
      } catch (error) {
        console.error("❌ Error fetching interviews:", error);
        setInterviews([]);
      }
    };
    fetchInterviews();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      await deleteInterview(id);
      setInterviews(interviews.filter((interview) => interview._id !== id));
    } catch (error) {
      console.error("❌ Error deleting interview:", error);
    }
  };

  const handleEdit = (interview: Interview) => {
    setSelectedInterview(interview);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setSelectedInterview(undefined);
    setOpenPopup(false);
  };

  const handleSuccess = async () => {
    try {
      const res = await getUserInterviews();
      setInterviews(res || []);
    } catch (error) {
      console.error("❌ Error refreshing interviews:", error);
    }
  };

  return (
    <Box sx={{ backgroundColor: "#f4f6f8", minHeight: "100vh", padding: "20px" }}>
      <Container maxWidth="lg">
        <Paper elevation={3} sx={{ padding: "30px", borderRadius: "10px", textAlign: "center", backgroundColor: "white" }}>
          <Typography variant="h4" fontWeight="bold" color="primary">
            Dashboard
          </Typography>
          <Typography variant="subtitle1" sx={{ marginBottom: "20px" }}>
            Manage your scheduled interviews
          </Typography>
          <Button
            variant="contained"
            onClick={() => setOpenPopup(true)}
            sx={{ backgroundColor: "#1976d2", color: "white", marginBottom: "15px" }}
          >
            + Schedule Interview
          </Button>

          <Box sx={{ marginTop: "20px" }}>
            <InterviewTable interviews={interviews} onDelete={handleDelete} onEdit={handleEdit} />
          </Box>
        </Paper>
      </Container>

      <SchedulePopup open={openPopup} onClose={handleClosePopup} interviewData={selectedInterview} onSuccess={handleSuccess} />
    </Box>
  );
}
