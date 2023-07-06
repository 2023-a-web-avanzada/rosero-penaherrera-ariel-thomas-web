"use client"
import Image from 'next/image'
import {Sidebar} from "@/components/Sidebar";
import {useState} from "react";
import {Header} from "@/components/Header";
import {ChatArea} from "@/components/ChatArea";
import {ChatMessage} from "@/types/ChatMessage";
import {Chat} from "@/types/Chat";
import {Footer} from "@/components/Footer";

export default function Home() {
    const [sidebarOpened, setSidebarOpened] = useState(false); //First UseState
    const [chatActive, setChatActive] = useState<Chat>({
        id: '123',
        title: 'Bla Blu',
        messages: [
            { id: '99', author: 'me', body: 'Opa, tudo bem?'},
            {id: '100', author: 'ai', body: 'Tudo óptimo, em que posso te ajudar?'}
        ]
    }); //Second UseState

    const [AILoading, setAILoading] = useState(false); //Third UseState


    const openSideBar = () => setSidebarOpened(true);
    const closeSidebar = () => setSidebarOpened(false);

    const handleClearConversations = () => {

    }

    const handleNewChat = () => {

    }

    const handleSendMessage = () => {

    }

  return (
    <>
      <main className="flex min-h-screen bg-gpt-gray">
        <Sidebar
            open={sidebarOpened}
            onClose={closeSidebar}
            onClear={handleClearConversations}
            onNewChat={handleNewChat}
        >
            <div className="w-16 h-96 bg-red-200 mb-2"> ... </div>
        </Sidebar>
        <section className="flex flex-col w-full">

            <Header
                openSidebarClick={openSideBar}
                title={'Bla bla bla'}
                newChatClick={handleNewChat}
            />

            <ChatArea chat={chatActive}/>

            <Footer
                onSendMessage={handleSendMessage}
                disabled={AILoading}
            />

        </section>
      </main>
    </>
  )
}
