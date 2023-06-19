import { useState } from 'react';
import axios from 'axios';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export function useFormState() {
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

  const [isLoginVisible, setLoginVisibility] = useState(false);

  return {
    regPwdEyeClass,
    setRegPwdEyeClass,
    confirmPwdEyeClass,
    setConfirmPwdEyeClass,
    loginPwdEyeClass,
    setLoginPwdEyeClass,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    loginUsername,
    setLoginUsername,
    loginPassword,
    setLoginPassword,
    isLoginVisible,
    setLoginVisibility
  };
}

export function handleRegistration(navigate, registrationData) {
  axios
    .post('/api/users/create', registrationData)
    .then((response) => {
      alert('Welcome to IssueTracker!');
      navigate('/dashboard');
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
}

export function handleLogin(navigate, loginData) {
  axios
    .post('/api/users/login', loginData)
    .then((response) => {
      alert(response.data.message);
      navigate('/dashboard');
    })
    .catch((error) => {
      alert(error.response.data.message);
    });
}

export function handleTogglePasswordVisibility(inputId, setEyeClass) {
  if (inputId === 'reg_password') {
    setEyeClass((prevClass) =>
      prevClass === faEye ? faEyeSlash : faEye
    );
  } else if (inputId === 'confirm_password') {
    setEyeClass((prevClass) =>
      prevClass === faEye ? faEyeSlash : faEye
    );
  } else if (inputId === 'login_password') {
    setEyeClass((prevClass) =>
      prevClass === faEye ? faEyeSlash : faEye
    );
  }

  const input = document.getElementById(inputId);
  const inputType = input.getAttribute('type') === 'password' ? 'text' : 'password';
  input.setAttribute('type', inputType);
}

export function handleLoginVisibility(setLoginVisibility, isLoginVisible) {
  setLoginVisibility(!isLoginVisible);
}
