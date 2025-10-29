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
        <div style={{width}} className="relative">
            <label style={{margin: labelMargin}} htmlFor={labelName}>    
                {labelText}
            </label>
            <input 
                ref={inputRef}
                className="rounded-lg border border-gray-500"
                style={{margin, padding, width}}
                id={id} 
                type={type} 
                value={value} 
                onChange={e => setChange(e.target.value)}
                placeholder={placeholder}
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
            />
            <div
                onClick={() => setChange("")}
                style={{display: buttonDisplay, padding}}
                className="absolute top-0 right-0 cursor-pointer font-bold"
            >X</div>
        </div> 
    );
};

export  { Input };