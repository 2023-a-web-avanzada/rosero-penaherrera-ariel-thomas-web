import connectMongoDB from "@/libs/mongodb";
import University from "@/models/university";
import {NextResponse} from "next/server";

export async function PUT(request, { params }){
    const { id } = params;
    const { newName: name,
            newFoundationDate: foundationDate,
            newIsPublic: isPublic,
            newStudentsNumber: studentsNumber} = await request.json();
    await connectMongoDB()
    await University.findByIdAndUpdate(id, { name, foundationDate, isPublic, studentsNumber });
    return NextResponse.json({ message: "University updated"}, {status: 200});
}

export async function GET(request, { params }){
    const { id } = params;
    await connectMongoDB();
    const university = await University.findOne({_id: id});
    return NextResponse.json({ university }, { status: 200});
}

