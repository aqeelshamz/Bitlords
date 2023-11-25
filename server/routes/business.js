// import express from "express";
// import joi from "joi";
// import Business from "../models/Business.js";
// import { v4 as uuidv4 } from "uuid";

// const router = express.Router();

// router.post("/get", async (req, res) => {
// 	const schema = joi.object({
// 		userId: joi.string().required(),
// 	});

// 	try {
// 		const data = await schema.validateAsync(req.body);
// 		const business = await Business.query("userId").eq(data.userId).exec();
// 		return res.send(business);
// 	} catch (err) {
// 		return res.status(500).send(err);
// 	}
// });

// router.post("/create", async (req, res) => {
// 	const schema = joi.object({
// 		userId: joi.string().required(),
// 		name: joi.string().required(),
// 		description: joi.string().required(),
// 	});

// 	try {
// 		const data = await schema.validateAsync(req.body);

// 		const newBusiness = new Business({
//             id: uuidv4(),
// 			userId: data.userId,
// 			name: data.name,
// 			description: data.description,
// 		});

// 		return res.send(await newBusiness.save());
// 	} catch (err) {
// 		return res.status(500).send(err);
// 	}
// });

// export default router;
