import React,{useState} from 'react'
import '../Header.css'
import {db,auth} from '../firebase'
import { useStateValue } from '../StateProvider';
import firebase from 'firebase'
import {motion} from 'framer-motion'
function Header({dropdown}) {
    const [{user},dispatch] = useStateValue();
    const [title,setTitle] = useState('');
    const [content,setContent] = useState('');
    const [theme,setTheme]= useState(false);
    const [icon,setIcon] = useState('add');
    const [color,setColor] = useState('#ccc');

    const logout = ()=>{
        auth.signOut();
    }

    const saveNote = (event)=>{
        event.preventDefault();
        if(title && content){
            db.collection("users").doc(user.uid).update({
                "notes":firebase.firestore.FieldValue.arrayUnion({
                    id:Date.now(),
                    title:title,
                    content:content,
                    color:color
                })
            }).then(()=>{
                setTheme(false);
                setTitle("")
                setContent("")
                setColor("#ccc");
                setIcon("add")
            })
        }
    }
    return (
        <div className="header">
           {dropdown &&<div className="dropdown">
                <div className="center">
                    <img src={user.photoURL} alt=""/>
                    <h3>{user.displayName}</h3>
                    <h5>{user.email}</h5>
                    <span onClick={logout}>Logout</span>
                </div>
            </div>}
            <div className="add">
                <div><h1>Welcome </h1><h2>{user.displayName}</h2></div>
                    <label>Add a Note...</label>
                    <div className="title">
                        <input type="text" value={title} onChange={event=>setTitle(event.target.value)}/>
                    </div>
                    <label>Add content for the note...</label>
                    <div className="content">
                        <input type="text" value={content} onChange={event=>setContent(event.target.value)}/>
                    </div>
                    <div className="buttons">
                    <button className="save" onClick={saveNote}><i className="material-icons">save</i></button>
                    <div><button className="theme" onClick={!theme?event=>setTheme(true) || setIcon('close'):event=>setTheme(false) || setIcon('add')}><i className="material-icons">{icon}</i></button>
                    {theme?<div className="themes"><button className="theme first" onClick={event=>setColor('#21E27A')}></button>
                    <button className="theme second" onClick={event=>setColor('#F5A727')}></button>
                    <button className="theme third" onClick={event=>setColor('#EA0A3E')}></button></div>:null}</div>
                    </div>


        {title?<motion.div className="preview" layout style={{"backgroundColor":color}}>
            <h1>{title}</h1>
    
            <h3>{content}</h3>

                </motion.div>:null}
            </div>
        </div>
    )
}

export default Header
