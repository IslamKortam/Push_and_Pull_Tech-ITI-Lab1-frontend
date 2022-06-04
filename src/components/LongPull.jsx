import axios from "axios";
import { useEffect, useState } from "react";
import calcLastMsgTime from "../helpers/CalcLastRecievedMsgTimeStamp";

const serverURL = 'http://localhost:5000';

export default function LongPull(){
    const [inputText, setInputText] = useState('');
    const [msgs, setMsgs] = useState([]);


    const handleTextChange = (value) => {
        setInputText(value);
    }

    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${serverURL}/msg-long-term`, {msg: inputText})
            .then(() => {setInputText('')});
    }

    useEffect(() => {
        axios.get(`${serverURL}/msg-long-term`, {params: { lastMsgTimeStamp: calcLastMsgTime(msgs)}})
            .then(({data}) => {
                setMsgs(msgs.concat(data));
            });
    }, [msgs]);

    return(
        <>
            <h1>Long Pull</h1>
            <form action="">
                <input type="text" value={inputText} onChange={(e)=>{handleTextChange(e.target.value)}}/>
                <input type="submit" onClick={handleSubmit} placeholder="submit"/>
            </form>
            <ul>
                {msgs.map((item, index) => <li key={index}>{item.msg}</li>)}
            </ul>
        </>

    )
}