import IconMenu from "@/components/icons/IconMenu";
import IconAdd from "@/components/icons/IconAdd";

type Props = {
    openSidebarClick: () => void;
    title: string;
    newChatClick: () => void;
}
export const Header = ({ openSidebarClick, title, newChatClick}: Props) => {
    return (
        <>
            <header className="flex justify-between items-center w-full border-b border-b-gray-600 p-2 md:hidden">

                <div onClick={openSidebarClick} className="cursor-pointer">
                    <IconMenu width={24} height={24} />
                </div>

                <div className="ml-2 truncate">{title}</div>

                <div onClick={newChatClick}>
                    <IconAdd width={24} height={24} />
                </div>

            </header>
        </>
    )
}