import mongoose, { Schema } from "mongoose";

const universitySchema = new Schema(
    {
        name: String,
        foundationDate: String,
        isPublic: Boolean,
        studentsNumber: Number,
    },
    {
        timestamps: true,
    }
);

const University = mongoose.models.University || mongoose.model("University", universitySchema);

export default University;