import styles from "./Button.module.css";

const Button = ({
    type = "submit",
    text = "Знайти",
    colorBg = "var(--color-blue)",
    colorText = "white",
    padding = "12px 16px",
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
            className={styles.btn}
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