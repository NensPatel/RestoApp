// db.js

// const { username, password } = process.env;
// export const uri = `mongodb+srv://patelnens512:Nens0511@cluster0.gdkpms1.mongodb.net/`;

import dotenv from "dotenv";

dotenv.config();

const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const dbName = process.env.MONGO_DB_NAME; 
export const uri = `mongodb+srv://${username}:${password}@cluster0.gdkpms1.mongodb.net/${dbName}`;
