const calcLastMsgTime = (msgsArray) => {
    let lastRecievedMsgTimeStamp = 0;
    msgsArray.forEach(item => {lastRecievedMsgTimeStamp = Math.max(lastRecievedMsgTimeStamp, item.timeStamp)});
    return lastRecievedMsgTimeStamp;
}

export default calcLastMsgTime;