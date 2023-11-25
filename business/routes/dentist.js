import express from "express";
import DentistAppointment from "../models/Dentist.js";

const router = express.Router();

router.get("/getAllAppointments", async (req, res) => {
	try {
		// const allAppointments = await DentistAppointment.scan().exec();

		// if (!allAppointments) {
		// 	return res.status(404).json({ message: "No appointments found" });
		// }

		res.send("1. 26 November 2024, Morning 10am, Dr. Smith, 2. 1 December 2024, Morning 9am, Dr. Paul");
	} catch (err) {
		return res.status(500).send(err);
	}
});

router.post("/addSchedule", async (req, res) => {
	try {
		const { date, time, doctor, patientName } = req.body;

		console.log(date);
		console.log(time);
		console.log(doctor);
		console.log(patientName);

		const newAppointment = new DentistAppointment({
			date: date,
			time: time,
			doctor: doctor,
			patientName: patientName
		});

		await newAppointment.save();

		res.status(201).send("Appointment booked successfully!");
	} catch (error) {
		console.error("Error adding schedule:", error);
		res.status(500).json({ message: "Server error" });
	}
});

export default router;
