import { Dialog, DialogTitle, DialogContent, TextField, Button, MenuItem, Select, FormControl, InputLabel, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { createInterview, updateInterview, Interview } from "../services/interviewService";

const SchedulePopup = ({
  open,
  onClose,
  interviewData,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  interviewData?: Interview;
  onSuccess: () => void;
}) => {
  const [candidateName, setCandidateName] = useState("");
  const [interviewDate, setInterviewDate] = useState("");
  const [interviewTime, setInterviewTime] = useState("");
  const [status, setStatus] = useState("Scheduled");

  // ✅ Pre-fill form when editing an interview
  useEffect(() => {
    if (interviewData) {
      setCandidateName(interviewData.candidateName);
      setInterviewDate(interviewData.interviewDate);
      setInterviewTime(interviewData.interviewTime);
      setStatus(interviewData.status);
    } else {
      setCandidateName("");
      setInterviewDate("");
      setInterviewTime("");
      setStatus("Scheduled");
    }
  }, [interviewData]);

  const handleSubmit = async () => {
    try {
      if (interviewData?._id) {
        await updateInterview(interviewData._id, { candidateName, interviewDate, interviewTime, status });
        alert("✅ Interview updated successfully!");
      } else {
        await createInterview({ candidateName, interviewDate, interviewTime, status });
        alert("✅ Interview scheduled successfully!");
      }

      onClose();
      onSuccess();
    } catch (error) {
      alert("❌ Error saving interview. Please check console.");
      console.error("❌ Error:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          width: "40%",
          borderRadius: "12px", // ✅ Smooth rounded corners
          padding: "20px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // ✅ Subtle shadow effect
        },
      }}
    >
      <DialogTitle
        sx={{
          backgroundColor: "#1976d2",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
          borderRadius: "10px 10px 0 0",
          padding: "15px",
        }}
      >
        {interviewData ? "Update Interview" : "Schedule Interview"}
      </DialogTitle>

      <DialogContent sx={{ padding: "25px" }}>
        <TextField
          fullWidth
          label="Candidate Name"
          value={candidateName}
          onChange={(e) => setCandidateName(e.target.value)}
          margin="normal"
          variant="outlined"
          sx={{ backgroundColor: "white", borderRadius: "5px" }}
        />
        <TextField
          fullWidth
          type="date"
          value={interviewDate}
          onChange={(e) => setInterviewDate(e.target.value)}
          margin="normal"
          variant="outlined"
          sx={{ backgroundColor: "white", borderRadius: "5px" }}
        />
        <TextField
          fullWidth
          type="time"
          value={interviewTime}
          onChange={(e) => setInterviewTime(e.target.value)}
          margin="normal"
          variant="outlined"
          sx={{ backgroundColor: "white", borderRadius: "5px" }}
        />

        {/* ✅ Styled Status Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            variant="outlined"
            sx={{ backgroundColor: "white", borderRadius: "5px" }}
          >
            <MenuItem value="Scheduled">Scheduled</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
            <MenuItem value="Cancelled">Cancelled</MenuItem>
          </Select>
        </FormControl>

        <Box sx={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#1976d2",
              color: "white",
              "&:hover": { backgroundColor: "#1565c0" },
              padding: "10px 20px",
              borderRadius: "8px",
            }}
            onClick={handleSubmit}
          >
            {interviewData ? "Update" : "Schedule"}
          </Button>

          <Button
            sx={{
              backgroundColor: "#f44336",
              color: "white",
              "&:hover": { backgroundColor: "#d32f2f" },
              padding: "10px 20px",
              borderRadius: "8px",
            }}
            onClick={onClose}
          >
            Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default SchedulePopup;
