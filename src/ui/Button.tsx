const Button = ({
    type = "submit",
    text = "Знайти",
    colorBg = "blue",
    colorText = "white",
    padding = "8px 16px",
    margin = "0",
    width = "100%",
    opacity = "1",
    disabled = false,
}: {
    type?: "submit" | "reset" | "button" | undefined;
    text?: string;
    colorBg?: string;
    colorText?: string;
    padding?: string;
    margin?: string;
    width?: string;
    opacity?: string;
    disabled?: boolean;
}) => {
    return (
        <button 
            type={type}
            disabled={disabled}
            className={`cursor-pointer rounded-lg`}
            style={{ 
                backgroundColor: colorBg,
                color: colorText,
                padding,
                margin,
                width,
                opacity,
            }}
        >
            {text}
        </button>
    );
};

export { Button };