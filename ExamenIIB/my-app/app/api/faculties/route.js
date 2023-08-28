import connectMongoDB from "@/libs/mongodb";
import Faculty from "@/models/faculty"
import {NextResponse} from "next/server";

export async function POST(request){
    const {name, foundationDate, ownBuilding, careersNumber, idUniversity} = await request.json();
    await connectMongoDB();
    await Faculty.create({name, foundationDate, ownBuilding, careersNumber, idUniversity});
    return NextResponse.json({message: "Faculty Created"}, {status: 201})
}

export async function GET(request){
    const idUniversity = request.nextUrl.searchParams.get("idUniversity")
    await connectMongoDB();
    const faculties = await Faculty.find({idUniversity: idUniversity});
    return NextResponse.json({faculties})
}

export async function DELETE(request){
    const idFaculty = request.nextUrl.searchParams.get("idFaculty");
    await connectMongoDB();
    await Faculty.findByIdAndDelete(idFaculty);
    return NextResponse.json({message: "Faculty deleted"}, {status: 200});
}