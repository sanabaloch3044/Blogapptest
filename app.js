// Import necessary Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getDatabase, set, ref, get, remove, update } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBrch0W8CFdyY68kBH5-qiF1Ke36DWFzG0",
  authDomain: "crud-app-73c30.firebaseapp.com",
  projectId: "crud-app-73c30",
  storageBucket: "crud-app-73c30.firebasestorage.app",
  messagingSenderId: "426203580408",
  appId: "1:426203580408:web:607ab962fa14701736780d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app); // Firebase Authentication instance

const add_data = document.getElementById('add_data');
const notification = document.getElementById('notification');

// Add student data
function AddStudents() {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const rollnumber = document.getElementById('rollnumber').value;

  if(!name || !email || rollnumber) {
    alert("please fill all the fields")
  }

  set(ref(db, 'students/' + rollnumber), {
    name: name,
    email: email,
    rollnumber: rollnumber
  });
  notification.innerText = "Added successfully";
  document.getElementById('name').value = "";
  document.getElementById('email').value = "";
  document.getElementById('rollnumber').value = "";

  ReadData();
}

add_data.addEventListener('click', AddStudents);

// Read data
function ReadData() {
  const userRef = ref(db, 'students/');

  get(userRef).then((snapshot) => {
    const data = snapshot.val();

    const table = document.querySelector('table');
    let html = '';

    for (const key in data) {
      const { name, email, rollnumber } = data[key];
      html += `
        <tr>
          <td> ${name}</td>
          <td> ${email}</td>
          <td> ${rollnumber}</td>
          <td><button class="del" onclick="deleteData('${rollnumber}')">Delete</button></td>
          <td><button class="up" onclick="updateData('${rollnumber}')">Update</button></td>
        </tr>
      `;
    }
    table.innerHTML = html;
  });
}

ReadData();

// Delete data
window.deleteData = function (rollnumber) {
  const userRef = ref(db, `students/${rollnumber}`);

  remove(userRef);
  notification.innerText = "Data Deleted Successfully";
  ReadData();
};

// Update data
window.updateData = function (rollnumber) {
  const userRef = ref(db, `students/${rollnumber}`);

  get(userRef).then((item) => {
    document.getElementById('name').value = item.val().name;
    document.getElementById('email').value = item.val().email;
    document.getElementById('rollnumber').value = item.val().rollnumber;
  });

  document.querySelector('.update_Data').classList.add('show');

  const update_btn = document.querySelector('#update_data');

  update_btn.addEventListener('click', () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const rollnumber = document.getElementById('rollnumber').value;

    update(ref(db), {
      [`students/${rollnumber}/name`]: name,
      [`students/${rollnumber}/email`]: email,
      [`students/${rollnumber}/rollnumber`]: rollnumber,
    }).then(() => {
      notification.innerText = "Data Updated";
      document.querySelector('.update_Data').classList.remove('show');
      document.getElementById('name').value = "";
      document.getElementById('email').value = "";
      document.getElementById('rollnumber').value = "";
      checkFields();
      ReadData();
    });
  });
};

// Logout function
const logoutButton = document.getElementById('logout');

logoutButton.addEventListener('click', () => {
  // Remove user session from localStorage (if set)
  localStorage.removeItem('loggedInUserId');

  // Sign out from Firebase Authentication
  signOut(auth)
    .then(() => {
      notification.innerText = 'Logged out successfully';
      // Redirect to the login page or homepage
      window.location.href = 'index.html'; // Update this URL to match your login page URL
    })
    .catch((error) => {
      console.error('Error signing out:', error);
      notification.innerText = 'Error signing out. Please try again.';
    });
});
