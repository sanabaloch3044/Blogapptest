import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
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
const auth = getAuth(app);
auth.languageCode = 'en' 
   const provider = new GoogleAuthProvider();

   const googleBtn = document.getElementById('googlebtn');
    googleBtn.addEventListener('click', function () {
      
    })
