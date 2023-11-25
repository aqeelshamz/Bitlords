import express from "express";
import VoiceResponse from "twilio";
const router = express.Router();

router.post("/", (req, res) => {
	const twiml = new VoiceResponse();
	twiml.say("Hello, this is Bit Lords. How can we help you today?");

	res.type("text/xml");
	res.send(twiml.toString());
});

export default router;
