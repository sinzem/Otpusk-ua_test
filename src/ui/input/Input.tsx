import { useIsFetching } from "@tanstack/react-query";
import type { ChangeEvent } from "react";
import styles from "./Input.module.css";

const Input = ({
    inputRef,
    labelName = "", 
    labelText = "",
    labelMargin = "0",
    id, 
    type = "text", 
    value, 
    setChange, 
    placeholder = "",
    padding = "12px 16px",
    margin = "0",
    width = "100%",
    buttonDisplay = "flex", 
}: {
    inputRef?: React.RefObject<HTMLInputElement | null>;
    labelName?: string;
    labelText?: string;
    labelMargin?: string; 
    id: string;
    type: string;
    value: string;
    setChange: React.Dispatch<React.SetStateAction<string>>;
    placeholder: string;
    padding?: string;
    margin?: string,
    width?: string,
    buttonDisplay?: "flex" | "none";
})=> {

    const isFetching = useIsFetching();

    const reset = () => {
        if (!isFetching) {
            setChange("");
            if (inputRef && inputRef.current) inputRef.current.focus();
        }
    }

    const changeValue = (e: ChangeEvent<HTMLInputElement>) => {
        if (!isFetching) setChange(e.target.value);
    }

    return (
        <div style={{width}} className={styles.wrapper}>
            <label style={{margin: labelMargin}} htmlFor={labelName}>    
                {labelText}
            </label>
            <input 
                ref={inputRef}
                className={styles.inp}
                style={{margin, padding, width, cursor: value ? "pointer" : "auto"}}
                id={id} 
                type={type} 
                value={value} 
                onChange={changeValue}
                placeholder={placeholder}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
            />
            <div
                data-close="close"
                onClick={reset}
                style={{
                    display: buttonDisplay, 
                    padding, 
                    opacity: `${isFetching ? ".5" : "1"}`,
                    cursor: `${isFetching ? "auto" : "pointer"}`
                }}
                className={styles.close}
            >
                <img data-close="close" src="/img/close_flaticon_com.png" alt="close" />
            </div>
        </div> 
    );
};

export  { Input };