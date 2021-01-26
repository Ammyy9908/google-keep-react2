import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  // Firebase App config comes here
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
