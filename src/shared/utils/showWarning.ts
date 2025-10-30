export const showWarning = (
    message: string, 
    setter: React.Dispatch<React.SetStateAction<string | null>>,
    time: number
) => {
    setter(message);
    const timeout = setTimeout(() => setter(null), time)
    return () => clearTimeout(timeout); 
} 