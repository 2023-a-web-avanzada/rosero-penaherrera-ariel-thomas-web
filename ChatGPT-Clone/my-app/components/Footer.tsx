import {ChatMessageInput} from "@/components/ChatMessageInput";

type Props = {
    disabled: boolean;
    onSendMessage: (message: string) => void;
}
export const Footer = ({ disabled, onSendMessage }: Props) => {
    return (
        <>
            <footer className="w-full border-t border-t-gray-600 p-2">
                <div className="max-w-4xl m-auto">
                    <ChatMessageInput
                        disabled={disabled}
                        onSend={onSendMessage}
                    />
                    <div className="pt-3 text-center text-xs text-gray-300">
                        Free Research Preview. ChatGPT may produce inaccurate information about people, places, or facts.<br/>
                        <a href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes" className="underline">ChatGPT May 24 Version</a>
                    </div>
                </div>

            </footer>
        </>
    )
}