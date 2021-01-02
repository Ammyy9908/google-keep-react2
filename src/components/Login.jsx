import React,{useState} from 'react'
import '../Login.css'
import fb from '../fb.svg'
import brand from '../logo.svg'

import {auth,provider,facebook_provider,git_provider,db} from '../firebase'
function Login() {

    const [error,setError] = useState(null);
    const GoogleLogin = ()=>{
        auth.signInWithPopup(provider).then((cred)=>{
            db.collection("users").doc(cred.user.uid).get().then((doc)=>{
                if(doc.exists){
                    return 1;
                }
                else{
                    db.collection("users").doc(cred.user.uid).set({
                        id:cred.user.uid,
                        name:cred.user.displayName,
                        avatar:cred.user.photoURL,
                        email:cred.user.email,
                        notes:[],
                        trash:[],
                    }).then(()=>{
                        console.log("Done");
                    })
                }
            })
        }).catch((err)=>{
            console.log(err);
        });
    }

    const FacebookLogin = ()=>{
        auth.signInWithPopup(facebook_provider).then((cred)=>{
            db.collection("users").doc(cred.user.uid).get().then((doc)=>{
                if(doc.exists){
                    return 1;
                }
                else{
                    db.collection("users").doc(cred.user.uid).set({
                        id:cred.user.uid,
                        name:cred.user.displayName,
                        avatar:cred.user.photoURL,
                        email:cred.user.email?cred.user.email:"",
                        notes:[]
                    }).then(()=>{
                        console.log("Done");
                    })
                }
            })
        }).catch((err)=>{
            setError(err.message);
        });
    }

    const GitLogin = ()=>{
        auth.signInWithPopup(git_provider).then((cred)=>{
            console.log(cred.user);
            db.collection("users").doc(cred.user.uid).get().then((doc)=>{
                if(doc.exists){
                    return 1;
                }
                else{
                    db.collection("users").doc(cred.user.uid).set({
                        id:cred.user.uid,
                        name:cred.user.displayName,
                        avatar:cred.user.photoURL,
                        email:cred.user.email?cred.user.email:"",
                        notes:[]
                    }).then(()=>{
                        console.log("Done");
                    })
                }
            })
        }).catch((err)=>{
            setError(err.message);
        });
    }
    return (
        <div><div className="login">
            <div className="brand">
                <img src={brand} alt=""/>
            </div>
            <button onClick={GoogleLogin}><img src="https://img.icons8.com/color/48/000000/google-logo.png"/> Login</button>
            <button onClick={FacebookLogin} className="facebook_btn"><img src={fb}/> Login</button>
            <button onClick={GitLogin} className="github"><img src="https://img.icons8.com/fluent/48/000000/github.png"/> Login</button>
            
        </div>
        <div className="error">
        {error?<p style={{"textAlign":"center"}}>{error}</p>:null}
    </div></div>
    )
}

export default Login
