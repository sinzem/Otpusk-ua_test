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
    additionalClass = "",
    func,
    args = [],
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
    additionalClass?: "appearance" | "";
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    func?: (...args: any[]) => void | Promise<void>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    args?: any[];
}) => {


    return (
        <button 
            type={type}
            disabled={disabled}
            className={`${styles.btn} ${additionalClass}`}
            style={{ 
                backgroundColor: colorBg,
                color: colorText,
                padding,
                margin,
                width,
                opacity,
            }}
            onClick={() => func?.(...(args || []))}
        >
            {text}
        </button>
    );
};

export { Button };