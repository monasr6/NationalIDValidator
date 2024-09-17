import express from "express";
import { extractData } from "./extractDataService.js";

const app = express();
app.use(express.json());

function validateEgyptianID(id) {
  const idPattern = /^\d{14}$/; // searched for it :)
  return idPattern.test(id);
}

app.post("/validate-id", (req, res) => {
  const { nationalID } = req.body;

  if (!nationalID) {
    return res.status(400).json({ error: "National ID is required" });
  }

  if (!validateEgyptianID(nationalID)) {
    return res.status(400).json({ error: "Invalid National ID format" });
  }

  const extractedData = extractData(nationalID);

  if (!extractedData.isValid) {
    return res.status(400).json({ error: "Invalid National ID" });
  }

  return res.status(200).json({
    message: "Valid National ID",
    birthDate: extractedData.birthDate,
    gender: extractedData.gender,
    governorate: extractedData.governorate,
    year: extractedData.year,
    month: extractedData.month,
    day: extractedData.day,
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
