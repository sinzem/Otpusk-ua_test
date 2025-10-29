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
    padding = "8px 16px",
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
    return (
        <>
            <label style={{margin: labelMargin}} htmlFor={labelName}>    
                {labelText}
            </label>
            <input 
                ref={inputRef}
                className="rounded-lg relative border-1 border-gray-500"
                style={{margin, padding, width}}
                id={id} 
                type={type} 
                value={value} 
                onChange={e => setChange(e.target.value)}
                placeholder={placeholder}
            />
            <button
                style={{display: buttonDisplay}}
                className="absolute top-0 right-0 h-full justify-center align-middle"
            >X</button>
        </> 
    );
};

export  { Input };