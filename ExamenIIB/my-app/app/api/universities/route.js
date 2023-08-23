import connectMongoDB from "@/libs/mongodb";
import University from "@/models/university";
import {NextResponse} from "next/server";

export async function POST(request){
    const {name, foundationDate, isPublic, studentsNumber} = await request.json();
    await connectMongoDB();
    await University.create({name, foundationDate, isPublic, studentsNumber});
    return NextResponse.json({message: "University Created"}, {status: 201})
}

export async function GET(){
    await connectMongoDB();
    const universities = await University.find();
    return NextResponse.json({universities})
}

export async function DELETE(request){
    const idUniversity = request.nextUrl.searchParams.get("idUniversity");
    await connectMongoDB();
    await University.findByIdAndDelete(idUniversity);
    return NextResponse.json({message: "University deleted"}, {status: 200});
}

