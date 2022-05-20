//Converts MS to minutes

export const formatTime = (ms) => {
    const seconds = ms/1000;
    const minutes = Math.floor(seconds / 60); 
    let secondsRemainder = Math.floor(seconds % 60);
    if (secondsRemainder < 10) {
        return `${minutes}:0${secondsRemainder}`;
    }
    
    return `${minutes}:${secondsRemainder}`;
}

export default formatTime;