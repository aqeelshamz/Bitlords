import dynamoose from "dynamoose";

const endpointSchema = new dynamoose.Schema({
    "id": {
        "type": String,
        "hashKey": true,
        "index": true
    },
    "userId": {
        "type": String,
        "required": true,
        "index": true
    },
    "method": {
        "type": String,
        "required": true
    },
    "url": {
        "type": String,
        "required": true
    },
    "headers": {
        "type": String,
        "required": true
    },
    "body": {
        "type": String,
        "required": true
    },
    "remarks": {
        "type": String,
        "required": true
    }
});

const Endpoint = dynamoose.model("Endpoint", endpointSchema);

export default Endpoint;