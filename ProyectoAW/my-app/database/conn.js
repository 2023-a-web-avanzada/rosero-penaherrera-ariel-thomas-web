import mongoose from "mongoose"

const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Database Connected")
    } catch (errors){
        console.log("DBB error: " + errors);
    }
}

export default connectMongo;