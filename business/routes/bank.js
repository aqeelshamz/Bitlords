import express from "express";
import joi from "joi";
import Bank from "../models/Bank.js";

const router = express.Router();

router.get("/getCustomer", (req, res) => {
	const schema = joi.object({
		userId: joi.string().required(),
	});

	try {
		const { error, value } = schema.validate(req.query);

		if (error) {
			return res.status(400).json({ error: error.details[0].message });
		}
	} catch (error) {
		return res.status(500).send(err);
	}
});

export default router;
