import React, { useState } from 'react'
import '../Home.css'
import '../Navbar.css'
import brand from '../logo.svg'
import { useStateValue } from '../StateProvider';
import { auth, db } from '../firebase'
import firebase from 'firebase'
import Header from './Header';
import Content from './Content';
import { Alert } from '@material-ui/lab';


function Home() {
    const [sidenav, setSideNav] = useState(false);
    const [modal, setModal] = useState(false);
    const [icon, setIcon] = useState("menu")
    const [icon2, setIcon2] = useState("add")
    const [color, setColor] = useState("#714cfe")
    const [{ user }, dispatch] = useStateValue();
    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState()
    const [content, setContent] = useState()
    const [dropdown, setDropdown] = useState(false)
    const handleSideNav = () => {
        setSideNav(true);
        setIcon("close");
    }
    const closeSideNav = () => {
        setSideNav(false);
        setIcon("menu");
    }

    function Logout() {
        auth.signOut();
    }

    // Add Notes

    const addNote = (e) => {
        // console.log(title);
        if (title && content) {
            db.collection("users").doc(user.uid).update({
                "notes": firebase.firestore.FieldValue.arrayUnion({ "title": title, "content": content })
            }).then(() => {
                console.log("Added");
                setTitle("")
                setContent("")
                setModal(false);
                setIcon2("add");
            }).catch((err) => {
                console.log(err);
            })
        }

    }

    // intial state for alert
    const [alert, setAlert] = useState(false);
    return (
        <div>
            {/* <!--Navbar--> */}
            <div className="navbar">
                <div className="navbar-left">
                    <img src={brand} alt="brand-icon" />
                    <h3>Keep</h3>
                </div>
                <div className="navbar-right">
                    <img src={user.photoURL} alt="" onClick={!dropdown ? event => setDropdown(true) : event => setDropdown(false)} />
                </div>

            </div>
            {alert && <Alert severity="success" onClick={() => setAlert(false)}>{alert}</Alert>}
            {/* <!--Navbar ends--> */}
            <div className="main">
                <Header dropdown={dropdown} />

                <Content setAlert={setAlert} />
            </div>
        </div>
    )
}

export default Home
