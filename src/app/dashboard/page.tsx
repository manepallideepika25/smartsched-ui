"use client";

import { useContext, useEffect, useState } from "react";
import { Container, Typography, Button, Paper, Box, TextField, FormControl, Select, MenuItem, InputLabel } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { Interview, deleteInterview, getUserInterviews } from "../services/interviewService";
import InterviewTable from "../components/InterviewTable";
import SchedulePopup from "../components/SchedulePopup";

export default function Dashboard() {
  const auth = useContext(AuthContext);
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<Interview | undefined>(undefined);
  const [filters, setFilters] = useState({ candidateName: "", status: "" });

  useEffect(() => {
    fetchInterviews();
  }, [filters]);

  const fetchInterviews = async () => {
    try {
      const res = await getUserInterviews(filters);
      setInterviews(res || []);
    } catch (error) {
      console.error("❌ Error fetching interviews:", error);
      setInterviews([]);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteInterview(id);
      fetchInterviews();
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

          {/* ✅ Filters Section */}
          <Box sx={{ display: "flex", gap: 2, justifyContent: "center", marginBottom: "20px" }}>
            <TextField
              label="Search by Candidate Name"
              variant="outlined"
              size="small"
              value={filters.candidateName}
              onChange={(e) => setFilters({ ...filters, candidateName: e.target.value })}
              sx={{ width: "250px" }}
            />
            <FormControl size="small" sx={{ width: "200px" }}>
              <InputLabel>Status</InputLabel>
              <Select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Scheduled">Scheduled</MenuItem>
                <MenuItem value="Completed">Completed</MenuItem>
                <MenuItem value="Cancelled">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Box>

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

      <SchedulePopup open={openPopup} onClose={handleClosePopup} interviewData={selectedInterview} onSuccess={fetchInterviews} />
    </Box>
  );
}
