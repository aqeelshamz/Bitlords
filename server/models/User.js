
import dynamoose from "dynamoose";

const userSchema = new dynamoose.Schema({
    "id": {
        "type": String,
        "hashKey": true,
        "index": true
    },
    "businessName": {
        "type": String,
        "required": true,
        "index": true
    },
    "businessDescription": {
        "type": String,
        "required": true
    },
    "username": {
        "type": String,
        "required": true,
        "index": true
    },
    "password": {
        "type": String,
        "required": true
    }
});

const User = dynamoose.model("User", userSchema);

export default User;