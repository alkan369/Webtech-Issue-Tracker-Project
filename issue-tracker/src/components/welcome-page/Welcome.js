import './Welcome.css';
import logo from './logo.png';
import { useState } from 'react';
import { initializeApp } from "firebase/app";
import { getDatabase, set, ref, update } from "firebase/database";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const firebaseConfig = {
  apiKey: "AIzaSyB5oGp_MCEiQKtHORcRzyeJztiYO0vK_a0",
  authDomain: "issue-tracker-164f0.firebaseapp.com",
  databaseURL: "https://issue-tracker-164f0-default-rtdb.firebaseio.com",
  projectId: "issue-tracker-164f0",
  storageBucket: "issue-tracker-164f0.appspot.com",
  messagingSenderId: "1077361355309",
  appId: "1:1077361355309:web:293aca2b4297fef853a6a4"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

function App() {

  const [regPwdEyeClass, setRegPwdEyeClass] = useState(faEye);
  const [confirmPwdEyeClass, setConfirmPwdEyeClass] = useState(faEye);
  const [loginPwdEyeClass, setLoginPwdEyeClass] = useState(faEye);

  const handleRegistration = () => {
    var email = document.getElementById('reg_email').value;
    var password = document.getElementById('reg_password').value;
    var username = document.getElementById('reg_username').value;
    var firstname = document.getElementById('fname').value;
    var lastname = document.getElementById('lname').value;
    var reg_password = document.getElementById("reg_password").value;
    var confirm_password = document.getElementById("confirm_password").value;
    // Perform input validation and other checks
    if (firstname === '') {
      alert("Enter your first name!");
      return;
    }
  
    if (lastname === '') {
      alert("Enter your last name!");
      return;
    }
  
    if (username === '') {
      alert("Enter a username!");
      return;
    }
  
    if (!/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(username)) {
      alert("Username should be 8-20 characters.\nCan't start or end with special characters.");
      return;
    }
  
    if (reg_password !== confirm_password) {
      alert("Passwords don't match!");
      return;
    }
  
    // Create the user with email and password
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        set(ref(database, 'users/' + user.uid), {
          first_name: firstname,
          last_name: lastname,
          username: username,
          email: email
        });
        alert('Welcome to IssueTracker!');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        switch (errorCode) {
          case 'auth/invalid-email':
            alert('Invalid email!');
            break;
          case 'auth/email-already-in-use':
            alert('Email already in use!');
            break;
          case 'auth/missing-password':
            alert('Enter a password!');
            break;
          case 'auth/weak-password':
            alert('Password should be at least 6 characters!');
            break;
          case 'auth/network-request-failed':
            alert('Check your internet connection!');
            break;
          default:
            alert(errorMessage);
        }
      });
  };

  const handleLogin = () => {
    var email = document.getElementById('login_email').value;
    var password = document.getElementById('login_password').value;

    // Sign in with email and password
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const dt = new Date();
        update(ref(database, 'users/' + user.uid), {
          last_login: dt
        })
        alert('Welcome back!');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        switch (errorCode) {
          case 'auth/invalid-email':
            alert('Invalid email!');
            break;
          case 'auth/missing-password':
            alert('Invalid password');
            break;
          case 'auth/wrong-password':
            alert('Wrong password!');
            break;
          case 'auth/user-not-found':
            alert('Account not found! Please register!');
            break;
          case 'auth/network-request-failed':
            alert('Check your internet connection!');
            break;
          default:
            alert(errorMessage);
        }
      });
  };

  const handleTogglePasswordVisibility = (inputId) => {
    if (inputId === 'reg_password') {
      setRegPwdEyeClass((prevClass) =>
        prevClass === faEye ? faEyeSlash : faEye
      );
    } else if (inputId === 'confirm_password') {
      setConfirmPwdEyeClass((prevClass) =>
        prevClass === faEye ? faEyeSlash : faEye
      );
    } else if (inputId === 'login_password') {
      setLoginPwdEyeClass((prevClass) =>
        prevClass === faEye ? faEyeSlash : faEye
      );
    }
    const input = document.getElementById(inputId);
    const inputType = input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', inputType);
  };

  const handleLoginVisibility = () => {
    const login_box = document.getElementById("login-box");
    login_box.classList.toggle('show')
  };

  return (
    <div className='body-welcome'>
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="register">
          <div>
            <label className='welcome-label' htmlFor="chk" aria-hidden="true" onClick={() => handleLoginVisibility()}>Register</label>
            <input className='welcome-input' type="text" id="fname" name="txt" placeholder="First Name" required />
            <input className='welcome-input' type="text" id="lname" name="txt" placeholder="Last Name" required />
            <input className='welcome-input' type="text" name="txt" id="reg_username" placeholder="Username" required />
            <input className='welcome-input' type="email" name="email" id="reg_email" placeholder="Email" required />
            <div className="password-container">
              <input className='welcome-input' type="password" name="pwd" id="reg_password" placeholder="Password" required />
              <FontAwesomeIcon icon={regPwdEyeClass} id="eye1" onClick={() => handleTogglePasswordVisibility('reg_password')} />
            </div>
            <div className="password-container">
              <input className='welcome-input' type="password" name="cpwd" id="confirm_password" placeholder="Confirm Password" />
              <FontAwesomeIcon icon={confirmPwdEyeClass} id="eye2" onClick={() => handleTogglePasswordVisibility('confirm_password')} />
            </div>
            <button className='welcome-button' id="regBtn" onClick={handleRegistration}>Register</button>
          </div>
        </div>

        <div className="login">
          <label className='welcome-label' htmlFor="chk" aria-hidden="true" onClick={() => handleLoginVisibility()}>Login</label>
          <div id="login-box">
            <input className='welcome-input' type="email" name="email" id="login_email" placeholder="Email" required />
            <div className="password-container">
              <input className='welcome-input' type="password" name="pwd" id="login_password" placeholder="Password" required  />
              <FontAwesomeIcon icon={loginPwdEyeClass} id="eye3" onClick={() => handleTogglePasswordVisibility('login_password')} />
            </div>
            <button className='welcome-button' id="logBtn" onClick={handleLogin}>Login</button>
            <img src={logo} alt="Logo" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
