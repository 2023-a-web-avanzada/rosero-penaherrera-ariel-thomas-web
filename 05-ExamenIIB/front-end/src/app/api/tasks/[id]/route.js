import {NextResponse} from "next/server";
import {connectDB} from "@/utils/mongoose";
import Task from '@/models/Task'

export async function GET(request, { params }){
    connectDB()
    const taskFound = await Task.findById(params.id)

    if (!taskFound)
        return NextResponse.json({
            message: "Task noty found",
        },{
            status: 404
        })

    return NextResponse.json(taskFound);
}

export function DELETE(request, {params}){
    return NextResponse.json({
        message: `Eliminando tarea ${params.id}...`
    })
}

export function PUT(request, {params}){
    return NextResponse.json({
        message: `Actualizando tarea ${params.id}...`,
    })
}

