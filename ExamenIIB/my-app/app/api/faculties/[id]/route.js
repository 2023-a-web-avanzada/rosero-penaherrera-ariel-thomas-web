import connectMongoDB from "@/libs/mongodb";
import Faculty from "@/models/faculty"
import {NextResponse} from "next/server";

export async function PUT(request, { params }){
    const { id } = params;
    const { newName: name,
        newFoundationDate: foundationDate,
        newOwnBuilding: ownBuilding,
        newCareersNumber: careersNumber} = await request.json();
    await connectMongoDB()
    await Faculty.findByIdAndUpdate(id, { name, foundationDate, ownBuilding, careersNumber });
    return NextResponse.json({ message: "Faculty updated"}, {status: 200});
}

export async function GET(request, {params}){
    const { id } = params;
    await connectMongoDB();
    const faculty = await Faculty.findOne({_id: id});
    return NextResponse.json({faculty}, { status: 200});
}