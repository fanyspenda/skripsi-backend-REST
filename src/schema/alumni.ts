import { Schema } from "mongoose";

const alumniSchema = new Schema({
  name: String,
  entry_year: Number,
  graduate_year: Number,
  major: String,
  work_at: String,
  work_position: String,
  email: String,
  data_source: String
});

export default alumniSchema;
