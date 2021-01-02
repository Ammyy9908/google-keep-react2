import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyiz-z2x3iiYEgFoMlyTU1M0-fWmapV3E",
  authDomain: "keepapp-49048.firebaseapp.com",
  projectId: "keepapp-49048",
  storageBucket: "keepapp-49048.appspot.com",
  messagingSenderId: "769608612615",
  appId: "1:769608612615:web:c59b5a1ea9062cc21ae3a2",
  measurementId: "G-N50L4CQ0RH"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const facebook_provider=new firebase.auth.FacebookAuthProvider();
const git_provider = new firebase.auth.GithubAuthProvider();
facebook_provider.setCustomParameters({
    'display': 'popup'
  });
  git_provider.addScope('repo');
  const db = firebase.firestore();
export {auth,provider,facebook_provider,git_provider,db};