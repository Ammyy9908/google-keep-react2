import React,{useEffect,useState} from 'react'
import '../Content.css'
import Note from './Note'
import {db} from '../firebase'
import { useStateValue } from '../StateProvider';
import Empty from './Empty';

function Content({setAlert}) {
    const [notes,setNotes] = useState("")
    const [docid,setDocid] = useState("")

    const [{user}] = useStateValue();
    useEffect(()=>{
       user && db.collection("users").doc(user.uid).onSnapshot((doc)=>{
        setNotes(doc.data().notes);
        setDocid(doc.id)
       }) 
    },[])
    return (
        <div className="content">
            
            {notes.length >0?notes.map((note)=>{
                return <Note title={note.title} content={note.content} color={note.color} key={note.id} id={note.id} docid ={docid} setAlert={setAlert} />
            }):<Empty/>}
            
        </div>
    )
}

export default Content
