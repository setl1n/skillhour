export const calculateTimeCreds = (startTime: string, endTime: string): number => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const durationInHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);
    return Math.round(durationInHours * 10) / 10; // Round to 1 decimal place
};
