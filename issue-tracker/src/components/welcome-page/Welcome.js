import './Welcome.css';
import logo from './logo.png';
import { useState } from 'react';
import axios from 'axios';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function App() {
  const [regPwdEyeClass, setRegPwdEyeClass] = useState(faEye);
  const [confirmPwdEyeClass, setConfirmPwdEyeClass] = useState(faEye);
  const [loginPwdEyeClass, setLoginPwdEyeClass] = useState(faEye);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');


  const handleRegistration = () => {
    // Perform input validation and other checks

    const registrationData = {
      firstName,
      lastName,
      username,
      email,
      password,
    };

    axios
      .post('/api/users/create', registrationData)
      .then((response) => {
        alert('Registration successful!');
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  };

  const handleLogin = () => {
    const loginData = {
      loginUsername,
      loginPassword,
    };

    axios
      .post('/api/users/login', loginData)
      .then((response) => {
        alert('Login successful!');
      })
      .catch((error) => {
        alert(error.response.data.message);
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
    const inputType =
      input.getAttribute('type') === 'password' ? 'text' : 'password';
    input.setAttribute('type', inputType);
  };

  const handleLoginVisibility = () => {
    const loginBox = document.getElementById('login-box');
    loginBox.classList.toggle('show');
  };

  return (
    <div className="body-welcome">
      <div className="main">
        <input type="checkbox" id="chk" aria-hidden="true" />
        <div className="register">
            <label className='welcome-label' htmlFor="chk" aria-hidden="true" onClick={() => handleLoginVisibility()}>Register</label>
            <input className='welcome-input' type="text" id="fname" name="txt" placeholder="First Name" required onChange={(e) => setFirstName(e.target.value)} value={firstName} />
            <input className='welcome-input' type="text" id="lname" name="txt" placeholder="Last Name" required onChange={(e) => setLastName(e.target.value)} value={lastName} />
            <input className='welcome-input' type="text" name="txt" id="reg_username" placeholder="Username" required onChange={(e) => setUsername(e.target.value)} value={username} />
            <input className='welcome-input' type="email" name="email" id="reg_email" placeholder="Email" required onChange={(e) => setEmail(e.target.value)} value={email} />
            <div className="password-container">
              <input className='welcome-input' type="password" name="pwd" id="reg_password" placeholder="Password" required onChange={(e) => setPassword(e.target.value)} value={password} />
              <FontAwesomeIcon icon={regPwdEyeClass} id="eye1" onClick={() => handleTogglePasswordVisibility('reg_password')} />
            </div>
            <div className="password-container">
              <input className='welcome-input' type="password" name="cpwd" id="confirm_password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} />
              <FontAwesomeIcon icon={confirmPwdEyeClass} id="eye2" onClick={() => handleTogglePasswordVisibility('confirm_password')} />
            </div>
            <button className='welcome-button' id="regBtn" onClick={handleRegistration}>Register</button>
        </div>

        <div className="login">
          <label className='welcome-label' htmlFor="chk" aria-hidden="true" onClick={() => handleLoginVisibility()}>Login</label>
          <div id="login-box">
            <input className='welcome-input' type="text" name="txt" id="login_username" placeholder="Username" required onChange={(e) => setLoginUsername(e.target.value)} value={loginUsername} />
            <div className="password-container">
              <input className='welcome-input' type="password" name="pwd" id="login_password" placeholder="Password" required onChange={(e) => setLoginPassword(e.target.value)} value={loginPassword} />
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
