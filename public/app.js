console.log("ahoy ye land lubber!");
console.log(firebase);

const auth = firebase.auth();
const db = firebase.firestore();
// * sections
const whenSignedIn = document.querySelector("#whenSignedIn");
const whenSignedOut = document.querySelector("#whenSignedOut");
const thingsList = document.querySelector("#thingsList");
// * section buttons
const signInBtn = document.querySelector("#signInBtn");
const signOutBtn = document.querySelector("#signOutBtn");
const createThing = document.querySelector("#createThing");
// * user details
userDetails = document.querySelector("#userDetails");
// * provider
const provider = new firebase.auth.GoogleAuthProvider();

// * some actions for the sign in buttons
signInBtn.onclick = () => auth.signInWithPopup(provider);
signOutBtn.onclick = () => auth.signOut();

auth.onAuthStateChanged(user => {
    if(user){
        whenSignedIn.hidden = false;
        whenSignedOut.hidden = true;
        userDetails.innerHTML = `
            <h3>${user.displayName}</h3>
        `
    }else{
        whenSignedIn.hidden = true;
        whenSignedOut.hidden = false;
        userDetails.innerHTML = ``;
    }

});

// * dealing with the things for the things list here
let thingsRef; // ! reference to the db location
let unsubscribe; // ! means for turning off the stream of data

auth.onAuthStateChanged(user =>{
    if(user){
        thingsRef = db.collection("things");
        const {serverTimestamp} = firebase.firestore.FieldValue;
        createThing.onclick = () =>{
            thingsRef.add({
                uid: user.uid,
                name: "bertocomus",
                grossness: Math.floor(Math.random()*400),
                createdAt: serverTimestamp()
            })
        }

        unsubscribe = thingsRef
            .where('uid',"==", user.uid)
            .orderBy('grossness')
            .onSnapshot(querySnapshot =>{
                const items = querySnapshot.docs.map(doc =>{
                    return `<li>${doc.data().name}: ${doc.data().grossness}</li>`
                });
                thingsList.innerHTML = items.join("");
            });
    }else{
        unsubscribe && unsubscribe();
    }
})
