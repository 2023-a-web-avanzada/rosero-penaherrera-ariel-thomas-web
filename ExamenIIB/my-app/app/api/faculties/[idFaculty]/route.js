import connectMongoDB from "@/libs/mongodb";
import Faculty from "@/models/faculty"
import {NextResponse} from "next/server";

export async function PUT(request, { params }){
    const { idFaculty } = params;
    const { newName: name,
        newFoundationDate: foundationDate,
        newOwnBuilding: ownBuilding,
        newCareersNumber: careersNumber} = await request.json();
    await connectMongoDB()
    await Faculty.findByIdAndUpdate(idFaculty, { name, foundationDate, ownBuilding, careersNumber });
    return NextResponse.json({ message: "Faculty updated"}, {status: 200});
}

export async function GET(request, {params}){
    const { idFaculty } = params;
    await connectMongoDB();
    const faculty = await Faculty.findOne({_id: idFaculty});
    return NextResponse.json({faculty}, { status: 200});
}