import {ChatMessage} from "@/types/ChatMessage";

export type Chat = {
    id: string;
    title: string;
    messages: ChatMessage[];
}