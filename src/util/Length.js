//Converts MS to minutes

export const formatTime = (ms) => {
    const seconds = ms/1000;
    const minutes = Math.floor(seconds / 60); 
    const secondsRemainder = Math.floor(seconds % 60);
    return `${minutes}:${secondsRemainder}`;
}

export default formatTime;