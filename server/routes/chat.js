import express from "express";
import joi from "joi";
import { v4 as uuidv4 } from 'uuid';
import OpenAI from 'openai';
import prompt from "../utils/utils.js";
import User from "../models/User.js";
import Endpoint from "../models/Endpoint.js";
import moment from "moment/moment.js";
import axios from "axios";

const router = express.Router();

router.post("/send-message", async (req, res) => {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const schema = joi.object({
        businessId: joi.string().required(),
        messages: joi.array().required()
    });

    try {
        const data = await schema.validateAsync(req.body);

        const business = (await User.query("id").eq(data.businessId).exec())[0].toJSON();

        const endpoints = (await Endpoint.query("userId").eq(data.businessId).exec()).toJSON();

        var endpointsString = `Business Endpoints:\n`;

        for (const endpoint of endpoints) {
            endpointsString += `\n${endpoints.indexOf(endpoint) + 1}. ${endpoint.remarks}\nMethod: ${endpoint.method.toString().toUpperCase()}\nURL: ${endpoint.url}\nHeaders: ${endpoint.headers}\nBody: ${endpoint.body}\n`
        }

        var messages = data.messages.length === 0 ? [
            { role: 'system', content: prompt },
            { role: 'system', content: `Business Title: ${business.businessName}, Business Description: ${business.businessDescription}` },
            { role: 'system', content: endpointsString },
            {
                "role": "system",
                "content": `Today's date: ${moment().format("dddd, DD MMMM YYYY")}`
            },
        ] : data.messages;

        if (messages.length !== 0) {
            if (messages[messages.length - 1].content.includes("api_request")) {
                console.log("API REQUEST:");
                const reqData = JSON.parse(messages[messages.length - 1].content);

                const config = reqData.method === "GET" ? {
                    method: reqData.method,
                    url: reqData.url,
                    headers: reqData.headers ?? {},
                } : {
                    method: reqData.method,
                    url: reqData.url,
                    headers: reqData.headers ?? { "Content-Type": "application/json" },
                    body: reqData.body,
                };

                console.log("CONFIG:", config);

                var response = await axios(config);
                messages.push({ role: "system", content: response.data.toString() });
            }
        }

        const chatCompletion = await openai.chat.completions.create({
            messages: messages,
            model: 'gpt-3.5-turbo',
        });

        messages.push(chatCompletion.choices[0].message);
        return res.send(messages);
    }
    catch (err) {
        console.log(err)
        return res.status(500).send(err);
    }
});

export default router;
