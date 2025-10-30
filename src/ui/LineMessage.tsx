const LineMessage = ({
    text, 
    colorBg = "coral"
}: {
    text: string;
    colorBg?: string;
}) => {
    return (
        <div 
            className="absolute py-5 px-6 flex justify-center items-center rounded-lg border border-gray-500 max-w-[90%] text-black animate-opacity"
            style={{backgroundColor: colorBg}}
        >
            {text} 
        </div>
    );
};

export { LineMessage };