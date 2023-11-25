import express from "express";
const router = express.Router();
import Student from "../models/Student.js";

router.get("/getStudent/:studentId", async (req, res) => {
	try {
		const student = await Student.get(studentId);

		if (!student) {
			return res.status(404).json({ message: "Student not found" });
		}

		res.json(student);
	} catch (error) {
		return res.status(500).send(err);
	}
});

export default router;
