import dotenv from "dotenv";
dotenv.config();

const user_name = process.env.USER_NAME;
const password = process.env.PASSWORD;
const project_name = process.env.PASSWORD;
const collection_name = process.env.PASSWORD;
export const PORT = process.env.PORT;

export const mongodbURL =
`mongodb+srv://${user_name}:${password}@${project_name}.tlkkymw.mongodb.net/${collection_name}?retryWrites=true&w=majority`;