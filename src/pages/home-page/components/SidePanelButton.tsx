interface SidePanelButtonProps {
    text: string;
    icon: JSX.Element;
    onClick?: () => void;
}

const SidePanelButton = ({ text, icon, onClick }: SidePanelButtonProps) => {
    return (
        <div className="flex items-center p-4 hover:bg-white/20 cursor-pointer" onClick={onClick}>
            <div className="w-6 h-6 text-white">{icon}</div>
            <h1 className="text-white text-ml ml-4">{text}</h1>
        </div>
    );
};

export default SidePanelButton;