import axios from "axios";
import { useState } from "react";
import useInterval from "../helpers/useInterval";
import calcLastMsgTime from "../helpers/CalcLastRecievedMsgTimeStamp";


const serverURL = 'http://localhost:5000';




export default function ShortPull(){
    const [inputText, setInputText] = useState('');
    const [liMsgs, setLiMsgs] = useState([]);


    const handleTextChange = (value) => {
        setInputText(value);
    }

    
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${serverURL}/msg-short-term`, {msg: inputText})
            .then(() => {setInputText('')});
    }

    function updateList()  {
        axios.get(`${serverURL}/msg-short-term`, {params: { lastMsgTimeStamp: calcLastMsgTime(liMsgs)}})
            .then(({data}) => {
                setLiMsgs(liMsgs.concat(data));
            });
    }
    
    useInterval(updateList, 5000);

    return(
        <>
            <h1>Short Pull</h1>
            <form action="">
                <input type="text" value={inputText} onChange={(e)=>{handleTextChange(e.target.value)}}/>
                <input type="submit" onClick={handleSubmit} placeholder="submit"/>
            </form>
            <ul>
                {liMsgs.map((item, index) => <li key={index}>{item.msg}</li>)}
            </ul>
        </>

    )
}