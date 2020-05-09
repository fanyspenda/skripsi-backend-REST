import { Schema } from "mongoose";

export const majorSchema = new Schema({
	name: { type: String, required: true },
});
