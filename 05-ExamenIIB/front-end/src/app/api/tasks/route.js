import {NextResponse} from "next/server";
import {connectDB} from '../utils/mongoose';
import Task from '../models/Task'

export async function GET() {
    connectDB()
    const tasks = await Task.find()
    return NextResponse.json(tasks);
}

export async function POST(request){
    try {
        const data =  await request.json() //Recibir info del cliente
        const newTask = new Task(data)  //Crear un objeto de tarea
        const savedTask = await newTask.save()  //Guarda en la BDD
        return NextResponse.json(savedTask)
    } catch (error) {
        return NextResponse.json(error.message, {
            status: 400
        })
    }
}