import {NextResponse} from "next/server";
import {connectDB} from "@/utils/mongoose";

export function GET() {
    connectDB()


    return NextResponse.json({
        message: "Obteniendo tareas..."
    });
}

export function POST(){
    return NextResponse.json({
        message: "Creando tarea...",
    });
}