import { Schema } from "mongoose";

const userSchema = new Schema({
	name: String,
	password: String,
	email: String,
	level: Number,
});

export default userSchema;
