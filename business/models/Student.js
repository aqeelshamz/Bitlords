import dynamoose from "dynamoose";

const studentSchema = new dynamoose.Schema({
	studentId: {
		type: String,
		hashKey: true,
	},
	firstName: String,
	lastName: String,
	age: Number,
	address: String,
	attendance: {
		type: Array,
		schema: [
			{
				type: Object,
				schema: {
					subjectCode: String,
					date: String,
					present: Boolean,
					// Other attendance details
				},
			},
		],
	},
	marks: {
		type: Array,
		schema: [
			{
				type: Object,
				schema: {
					semester: Number,
					subjectCode: String,
					marksObtained: Number,
					// Other marks details
				},
			},
		],
	},
	// Other student details
});

const Student = dynamoose.model("Student", studentSchema);

export default Student;
