export const showWarning = (
    data: {text: string, time: number}, 
    setter: React.Dispatch<React.SetStateAction<{text: string, time: number} | null>>,
) => {
    setter({text: data.text, time: data.time});
    const timeout = setTimeout(() => setter(null), data.time)
    return () => clearTimeout(timeout); 
} 