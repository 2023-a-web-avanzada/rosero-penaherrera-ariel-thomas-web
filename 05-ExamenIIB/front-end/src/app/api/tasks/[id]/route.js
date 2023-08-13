import {NextResponse} from "next/server";

export function GET(request, { params }){
    console.log(params)
    return NextResponse.json({
        message: `Obteniendo tarea ${params.id}...`,
    });
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

