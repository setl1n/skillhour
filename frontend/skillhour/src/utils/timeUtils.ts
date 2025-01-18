export const calculateTimeCreds = (startTime: string, endTime: string): number => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationInHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    return Math.round(durationInHours * 10) / 10; // Round to 1 decimal place
};

export const formatDateToJavaFormat = (date: Date): string => {
    const pad = (num: number): string => String(num).padStart(2, '0');
    
    const year = date.getFullYear();
    const month = pad(date.getMonth() + 1); // Months are zero-indexed
    const day = pad(date.getDate());
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
  
    // Format: yyyy-MM-dd'T'HH:mm:ss
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};