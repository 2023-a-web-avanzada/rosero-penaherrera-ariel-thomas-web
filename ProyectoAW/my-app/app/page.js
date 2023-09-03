'use client'
import Image from 'next/image'
import { IoIosAddCircle } from 'react-icons/io'
import Table from "@/components/table";
import Form from "@/components/form";
import {useState} from "react";
export default function Home() {

  const [visible,setVisible] = useState(false)

  const handler = () => {
      setVisible(!visible)
  }

  return (
    <>
      <main className='py-5'>
          <h1 className='text-xl md:text-5xl text-center font-bold py-10'>Gestion de Maquinaria</h1>

          <div className="container mx-auto flex justify-between py-5 border-b">
              <div className="left flex gap-3">
                  <button onClick={handler} className="flex bg-indigo-500 text-white px-4 py-2 border rounded-md hover:bg-gray-50 hover:border-indigo-500 hover:text-gray-800">
                        Añadir Maquina <span className="px-1"><IoIosAddCircle size={23}/></span>
                  </button>
              </div>
          </div>
          {/*collapsable form*/}
          { visible ? <Form></Form>: <></>}
          {/*table*/}
          <div className="container mx-auto">
              <Table></Table>
          </div>
      </main>
    </>
  )
}
