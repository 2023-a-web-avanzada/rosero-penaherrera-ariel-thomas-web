import mongoose, {Schema} from "mongoose"

const facultySchema = new Schema(
    {
        name: String,
        foundationDate: String,
        ownBuilding: Boolean,
        careersNumber: Number,
        idUniversity: String,
    },
    {
        timestamps: true
    }
);

const Faculty = mongoose.models.Faculty || mongoose.model("Faculty", facultySchema);

export default Faculty;

