//EMAILL LOGGINN
 
 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
 import { getAuth, 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider, 
  signInWithPopup,
 

  

   } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"
 import { getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
  apiKey: "AIzaSyAX53ax1cxXonId2Y3pPlw8VvYq9RdbCJg",
  authDomain: "login-signup-78826.firebaseapp.com",
  projectId: "login-signup-78826",
  storageBucket: "login-signup-78826.firebasestorage.app",
  messagingSenderId: "954143648748",
  appId: "1:954143648748:web:f7d6f0389d46152e386ec9"
};



 // Initialize Firebase
  const app = initializeApp(firebaseConfig);

 function showMessage (message, divId ) {
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function() {
    messageDiv.style.opacity=0;
  },5000);

 }

 const signUp = document.getElementById('submitSignUp');
 signUp.addEventListener ('click', (event) => {
  event.preventDefault();
  const email = document.getElementById('rEmail').value;
  const password = document.getElementById('rPassword').value;
  const firstName = document.getElementById('fName').value;
  const lastName = document.getElementById('lName').value;

  const auth = getAuth();
const db = getFirestore();

createUserWithEmailAndPassword(auth, email, password)
.then((userCrendential) => {
  const user = userCrendential.user;
  const userData = {
    email: email,
    firstName : firstName,
    lastName : lastName

  };

showMessage('Account create Successfully', 'signUpMessage');
 const docRef = doc(db, "users", user.uid);
 setDoc(docRef, userData)
 .then (() => {
  window.location.href='index.html';

 })
.catch((error) => {
  console.error('error writing document', error);

});
})

.catch ((error) => {
  const errorCode = error.code;
if(errorCode=='auth/email-already-in-use'){
  showMessage('Email Address Already Exists !!!', 'signUpMessage');
} else {
  showMessage('Unable to create user', 'signUpMessage');

}

})
})

//SIGN IN WORKK

const signIn = document.getElementById('submitSignIn');
signIn.addEventListener('click', (event)=> {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const auth = getAuth();
  signInWithEmailAndPassword(auth, email, password)
.then((userCrendential)=> {
  showMessage('login is successful', 'signInMessage');
  const user = userCrendential.user;
  localStorage.setItem('loggedInUserId', user.uid);
  window.location.href='homepage.html';

})

.catch((error)=>{
  const errorCode = error.code;
  if(errorCode=== 'auth/invalid-crendential'){
    showMessage('Incorrect Email or Password', 'signInMessage')
  } else {
    showMessage('Account dose not exists', 'signInMessage')
  }
})
})

//GOOGLEE LOGGIN

const auth = getAuth(app);
auth.languageCode = 'en'; 

const provider = new GoogleAuthProvider();
const googleBtn = document.getElementById('googleBtn');

googleBtn.addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then((userCrendential) => {
            // Show the success popup
            
            const user = userCrendential.user;
            localStorage.setItem('loggedInUserId', user.uid);
            window.location.href='homepage.html';
            Swal.fire("Success", "Logged in with Google!", "success")
                .then(() => {
                    // Redirect to homepage.html after success alert closes
                    window.location.href = 'homepage.html';
                });
        })
        .catch((err) => {
            // Show the error popup if login fails
            Swal.fire("Error", err.message, "error");
        });
});

