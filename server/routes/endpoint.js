import express from "express";
import joi from "joi";
import Endpoint from "../models/Endpoint.js";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();

router.post("/get", async (req, res) => {
    const schema = joi.object({
        businessId: joi.string().required(),
    });

    try {
        const data = await schema.validateAsync(req.body);
        const endpoints = await Endpoint.query("method").eq("GET").exec();
        return res.send(endpoints);
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

router.post("/create", async (req, res) => {
    const schema = joi.object({
        businessId: joi.string().required(),
        method: joi.string().required(),
        url: joi.string().required(),
        headers: joi.string().required(),
        body: joi.string().required(),
        remarks: joi.string().required()
    });

    try {
        const data = await schema.validateAsync(req.body);

        const newEndpoint = new Endpoint({
            id: uuidv4(),
            userId: data.businessId,
            method: data.method,
            url: data.url,
            headers: data.headers,
            body: data.body,
            remarks: data.remarks
        });

        return res.send(await newEndpoint.save());
    }
    catch (err) {
        return res.status(500).send(err);
    }
});

export default router;
