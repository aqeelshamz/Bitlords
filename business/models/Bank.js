import dynamoose from "dynamoose";

const transactionSchema = new dynamoose.Schema({
	transactionId: {
		type: String,
		hashKey: true,
	},
	date: String,
	description: String,
	amount: Number,
	type: {
		type: String,
		enum: ["Deposit", "Withdrawal"],
	},
});

// const accountSchema = new dynamoose.Schema(
// 	{
// 		accountNumber: {
// 			type: String,
// 			hashKey: true,
// 		},
// 		accountType: String,
// 		balance: Number,
// 		transactions: {
// 			type: Array,
// 			schema: [transactionSchema],
// 		},
// 	},
// 	{
// 		timestamps: true, // Add timestamps to account schema
// 	}
// );

const bankSchema = new dynamoose.Schema(
	{
		customerId: {
			type: String,
			hashKey: true,
		},
		firstName: String,
		lastName: String,
		address: String,
		contactInfo: String,
	},
);

const Bank = dynamoose.model("Bank", bankSchema);

export default Bank;
