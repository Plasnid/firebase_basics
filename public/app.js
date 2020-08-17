console.log("ahoy ye land lubber!");
console.log(firebase);

const auth = firebase.auth();
// * sections
const whenSignedIn = document.querySelector("#whenSignedIn");
const whenSignedOut = document.querySelector("#whenSignedOut");
// * section buttons
const signInBtn = document.querySelector("#signInBtn");
const signOutBtn = document.querySelector("#signOutBtn");
// * user details
userDetails = document.querySelector("#userDetails");
// * provider
const provider = new firebase.auth.GoogleAuthProvider();

// * some actions for the sign in buttons
signInBtn.onclick = () => auth.signInWithPopup(provider);
signOutBtn.onclick = () => auth.signOut();
