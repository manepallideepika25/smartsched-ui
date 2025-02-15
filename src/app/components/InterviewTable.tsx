import { Table, TableBody, TableCell, TableHead, TableRow, Button, TableContainer, Paper } from "@mui/material";
import { Interview } from "../services/interviewService";

interface Props {
  interviews: Interview[];
  onDelete: (id: string) => void;
  onEdit: (interview: Interview) => void;
}

const InterviewTable = ({ interviews = [], onDelete, onEdit }: Props) => {
  if (!interviews.length) {
    return <p style={{ textAlign: "center", fontSize: "18px", fontWeight: "bold", color: "#555" }}>No interviews scheduled yet.</p>;
  }

  return (
    <TableContainer component={Paper} sx={{ marginTop: "20px", borderRadius: "10px", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: "#1976d2" }}>
            <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>Candidate</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>Date</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>Time</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>Status</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {interviews.map((interview, index) => (
            <TableRow
              key={interview._id ?? `temp-${index}`}
              sx={{
                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
                "&:hover": { backgroundColor: "#e3f2fd" },
              }}
            >
              <TableCell>{interview.candidateName}</TableCell>
              <TableCell>{interview.interviewDate}</TableCell>
              <TableCell>{interview.interviewTime}</TableCell>
              <TableCell>
                <span
                  style={{
                    padding: "5px 10px",
                    borderRadius: "5px",
                    color: "white",
                    fontWeight: "bold",
                    backgroundColor:
                      interview.status === "Scheduled"
                        ? "#ff9800"
                        : interview.status === "Completed"
                        ? "#4caf50"
                        : "#f44336",
                  }}
                >
                  {interview.status}
                </span>
              </TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ marginRight: "10px", backgroundColor: "#1976d2", "&:hover": { backgroundColor: "#1565c0" } }}
                  onClick={() => onEdit(interview)}
                >
                  Edit
                </Button>
                <Button
                  variant="contained"
                  size="small"
                  sx={{ backgroundColor: "#d32f2f", "&:hover": { backgroundColor: "#b71c1c" } }}
                  onClick={() => interview._id && onDelete(interview._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InterviewTable;
