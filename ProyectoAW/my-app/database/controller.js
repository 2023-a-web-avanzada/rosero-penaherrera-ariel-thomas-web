
import Machines from "@/model/machine";
export async function getMachine(req,res){
    try{
        const machines = await Machines.find({})

        if(!machines) return res.status(404).json( {error:"Data not Found"})
        res.status(200).json({machines})
    } catch (error){
        res.status(400).json( {error: "Error While Fetching Data"})
    }
}