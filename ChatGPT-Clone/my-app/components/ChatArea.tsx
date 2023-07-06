import {Chat} from "@/types/Chat";
import {ChatPlaceholder} from "@/components/ChatPlaceholder";
import {ChatMessageItem} from "@/components/ChatMessageItem";

type Props = {
    chat: Chat | undefined;
}
export const ChatArea = ({ chat }: Props) => {
    return(
        <>
            <section className="flex-auto h-0 overflow-y-scroll">
                {!chat && <ChatPlaceholder />}
                {chat && chat.messages.map(item => (
                    <ChatMessageItem
                        key={item.id}
                        item={item}
                    />
                ))}
            </section>
        </>
    )
}