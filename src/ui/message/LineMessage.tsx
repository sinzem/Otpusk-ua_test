import { useEffect, useState } from "react";
import styles from "./Message.module.css";

const LineMessage = ({
    data, 
    colorText = "white",
    colorBg = "coral",
}: {
    data: {text: string, time: number};
    colorText?: string;
    colorBg?: string;
}) => {

    const [disappear, setDisappear] = useState<boolean>(false);

    useEffect(() => {
        if (data.time > 300) {
            const timeout = setTimeout(() => setDisappear(true), data.time - 300);
            return () => clearTimeout(timeout);
        }
    }, []);

    return (
        <div 
            className={`${styles.message} ${disappear ? styles.hide : styles.visible}`}
            style={{backgroundColor: colorBg, color: colorText}}
        >
            {data.text} 
        </div>
    );
};

export { LineMessage };