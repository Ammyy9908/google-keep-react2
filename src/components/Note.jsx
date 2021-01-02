import React from 'react'
import '../Note.css'
import {motion} from 'framer-motion'
import { Fab } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close';
import {db} from '../firebase';
import { useStateValue } from '../StateProvider';

function Note({title,content,color,id,docid,setAlert}) {

    const [{user}] = useStateValue();

    const handleDelete = () => {
        
        db.collection("users").doc(user && user.uid).onSnapshot((doc)=>{
            const prevNotes = doc.data().notes
            const newNotes = prevNotes.filter((note)=>note.id!=id)
            var dbref = db.collection("users").doc(docid);
            dbref.update({notes:newNotes})
            setAlert("Note Deleted!")
           }) 
        
    }
    
    return (
        <motion.div className="note" layout style={{"backgroundColor":color}}>
            <Fab color="secondary" aria-label="add" style={{"position":"absolute","top":"-10px","right":"-15px"}} size="small"
            onClick={handleDelete}>
            <CloseIcon />
            </Fab>
            <h1>{title}</h1>
            <h3>{content}</h3>

        </motion.div>
    )
}

export default Note
