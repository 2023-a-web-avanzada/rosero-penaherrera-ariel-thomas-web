"use client"
import Image from 'next/image'
import {Sidebar} from "@/components/Sidebar";
import {useEffect, useState} from "react";
import {Header} from "@/components/Header";
import {ChatArea} from "@/components/ChatArea";
import {ChatMessage} from "@/types/ChatMessage";
import {Chat} from "@/types/Chat";
import {Footer} from "@/components/Footer";
import { v4 as uuidv4 } from 'uuid';

export default function Home() {
    const [sidebarOpened, setSidebarOpened] = useState(false); //First UseState
    const [chatList, setChatList] = useState<Chat[]>([]);
    const [chatActiveId, setChatActiveId] = useState<string>('');

    const [chatActive, setChatActive] = useState<Chat>(); //Second UseState
    const [AILoading, setAILoading] = useState(false); //Third UseState

    //Use Effect para saber si existen chats activos
    useEffect(() => {
        setChatActive(chatList.find(item => item.id === chatActiveId));
    }, [chatActiveId, chatList]);

    const openSideBar = () => setSidebarOpened(true);
    const closeSidebar = () => setSidebarOpened(false);

    const handleClearConversations = () => {
        if(AILoading) return;

        setChatActiveId('');
        setChatList([]);
    }

    const handleNewChat = () => {
        if(AILoading) return;

        setChatActiveId('');
        closeSidebar();
    }

    const handleSendMessage = () => {
        if (!chatActiveId){
            //Creating new chat
        } else {
            //Updating existing chat
        }
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
