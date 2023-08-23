import connectMongoDB from "@/libs/mongodb";
import University from "@/models/university";
import {NextResponse} from "next/server";

export async function PUT(request, { params }){
    const { id: idUniversity } = params;
    const { newName: name,
            newFoundationDate: foundationDate,
            newIsPublic: isPublic,
            newStudentsNumber: studentsNumber} = await request.json();
    await connectMongoDB()
    await University.findByIdAndUpdate(idUniversity, { name, foundationDate, isPublic, studentsNumber });
    return NextResponse.json({ message: "University updated"}, {status: 200});
}

export async function GET(request, {params}){
    const { idUniversity } = params;
    await connectMongoDB();
    const topic = await University.findOne({_id: idUniversity});
    return NextResponse.json({topic}, { status: 200});
}

