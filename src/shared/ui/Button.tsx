const Button = ({
    type = "submit",
    text = "Знайти",
    colorBg = "blue",
    colorText = "white",
    padding = "8px 16px",
    margin = "0",
    width = "fit-content",
    opacity = "1",
}: {
    type?: "submit" | "reset" | "button" | undefined;
    text?: string;
    colorBg?: string;
    colorText?: string;
    padding?: string;
    margin?: string;
    width?: string;
    opacity?: string;
}) => {
    return (
        <button 
            type={type}
            className={`cursor-pointer rounded-lg`}
            style={{ 
                backgroundColor: colorBg,
                color: colorText,
                padding,
                margin,
                width,
                opacity
            }}
        >
            {text}
        </button>
    );
};

export { Button };