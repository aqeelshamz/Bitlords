import dynamoose from "dynamoose";

const appointmentSchema = new dynamoose.Schema({
	"date": {
        "type": String,
    },
	"time": {
        "type": String,
    },
	"doctor": {
        "type": String,
    },
	"patientName": {
        "type": String,
    },
});

const DentistAppointment = dynamoose.model("DentistAppointment", appointmentSchema);

export default DentistAppointment;
