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
import {SidebarButton} from "@/components/SidebarButton";
import {SidebarChatButton} from "@/components/SidebarChatButton";

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

    //Use Effect para la devolución de la respuesta de la IA
    useEffect( () => {
        if(AILoading) getAIResponse();
    }, [AILoading]);

    const getAIResponse = () => {
        setTimeout(() => {
            let chatListClone = [...chatList];
            let chatIndex = chatListClone.findIndex(item => item.id === chatActiveId);
            if(chatIndex > -1){
                chatListClone[chatIndex].messages.push({
                    id: uuidv4(),
                    author: 'ai',
                    body: 'Aqui va la respuesta de la IA :)'
                });
            }
            setChatList(chatListClone);
            setAILoading(false);
        }, 2000);
    }

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

    const handleSendMessage = (message: string) => {
        if (!chatActiveId){
            //Creating new chat
            let newChatId = uuidv4();
            setChatList([{
                id: newChatId,
                title: message,
                messages: [
                    { id: uuidv4(), author: 'me', body: message }
                ]
            }, ...chatList]);

            setChatActiveId(newChatId);
        } else {
            //Updating existing chat
            let chatListClone = [...chatList];
            let chatIndex = chatListClone.findIndex(item => item.id === chatActiveId);
            chatListClone[chatIndex].messages.push({
                id: uuidv4(),
                author: 'me',
                body:message
            });
            setChatList(chatListClone);
        }

        setAILoading(true);
    }

    const handleSelectChat = (id: string) => {
        if(AILoading) return;

        let item = chatList.find(item => item.id === id);
        if(item) setChatActiveId(item.id);
        closeSidebar();
    }

    const handleDeleteChat = (id: string) => {
        let chatListClone = [...chatList];
        let chatIndex = chatListClone.findIndex(item => item.id === id);
        chatListClone.splice(chatIndex, 1);
        setChatList(chatListClone);
        setChatActiveId('');
    }

    const handleEditChat = (id: string, newTitle: string) => {
        if(newTitle){
            let chatListClone = [...chatList];
            let chatIndex = chatListClone.findIndex(item => item.id === id);
            chatListClone[chatIndex].title = newTitle;
            setChatList(chatListClone);
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
            {chatList.map(item=>(
                <SidebarChatButton
                    key={item.id}
                    chatItem={item}
                    active={item.id === chatActiveId}
                    onClick={handleSelectChat}
                    onDelete={handleDeleteChat}
                    onEdit={handleEditChat}
                />
            ))}
        </Sidebar>
        <section className="flex flex-col w-full">

            <Header
                openSidebarClick={openSideBar}
                title={chatActive ? chatActive.title: 'New Chat'}
                newChatClick={handleNewChat}
            />

            <ChatArea chat={chatActive} loading={AILoading} />

            <Footer
                onSendMessage={handleSendMessage}
                disabled={AILoading}
            />

        </section>
      </main>
    </>
  )
}
