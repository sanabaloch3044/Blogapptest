// import { auth,
//     app ,
//     createUserWithEmailAndPassword,
//     onAuthStateChanged,
//     signInWithEmailAndPassword,
//     sendEmailVerification,
//     signOut 
// } from "./firebaseauth.js";

// onAuthStateChanged(auth, (user) => {
//     if (user) {
      
//       const uid = user.uid;
//       console.log("user exist", user);
      
     
//     } else {
//        console.log("user not found");
       
//     }
//   });

const signUpButton=document.getElementById('signUpButton');
const signInButton=document.getElementById('signInButton');
const signInForm=document.getElementById('signIn');
const signUpForm=document.getElementById('signup');

signUpButton.addEventListener('click',function(){
    signInForm.style.display="none";
    signUpForm.style.display="block";
})
signInButton.addEventListener('click', function(){
    signInForm.style.display="block";
    signUpForm.style.display="none";
})
