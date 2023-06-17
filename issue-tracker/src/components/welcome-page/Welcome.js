import './Welcome.css';
import logo from './logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useFormState, handleRegistration, handleLogin, handleTogglePasswordVisibility, handleLoginVisibility } from './FormFunctions';


function App() {
  const navigate = useNavigate();
  const formState = useFormState();

  const registration = () => {
    const registrationData = {
      firstName: formState.firstName,
      lastName: formState.lastName,
      username: formState.username,
      email: formState.email,
      password: formState.password,
      confirmPassword: formState.confirmPassword,
    };

    handleRegistration(navigate, registrationData);
  };

  const login = () => {
    const loginData = {
      loginUsername: formState.loginUsername,
      loginPassword: formState.loginPassword,
    };

    handleLogin(navigate, loginData);
  };

  return (
    <div className="body-welcome">
      <div className="main">
        <input 
          type="checkbox" 
          id="chk" 
          aria-hidden="true" 
        />
        <div className="register">
            <label 
              className='welcome-label' 
              htmlFor="chk" 
              aria-hidden="true" 
              onClick={() => handleLoginVisibility(formState.setLoginVisibility, formState.isLoginVisible)}>
              Register
            </label>
            <input 
              className='welcome-input' 
              type="text" 
              name="txt" 
              placeholder="First Name" 
              required 
              onChange={(e) => formState.setFirstName(e.target.value)} 
              value={formState.firstName} 
            />
            <input 
              className='welcome-input' 
              type="text" 
              name="txt" 
              placeholder="Last Name" 
              required 
              onChange={(e) => formState.setLastName(e.target.value)} 
              value={formState.lastName} 
            />
            <input 
              className='welcome-input' 
              type="text" 
              name="txt" 
              placeholder="Username" 
              required 
              onChange={(e) => formState.setUsername(e.target.value)} 
              value={formState.username} 
            />
            <input 
              className='welcome-input' 
              type="email" 
              name="email" 
              placeholder="Email" 
              required 
              onChange={(e) => formState.setEmail(e.target.value)} 
              value={formState.email} 
            />
            <div className="password-container">
              <input 
                className='welcome-input' 
                type="password" 
                name="pwd" 
                id="reg_password" 
                placeholder="Password" 
                required 
                onChange={(e) => formState.setPassword(e.target.value)} 
                value={formState.password} 
              />
              <FontAwesomeIcon 
                icon={formState.regPwdEyeClass} 
                onClick={() => handleTogglePasswordVisibility('reg_password', formState.setRegPwdEyeClass)} 
              />
            </div>
            <div className="password-container">
              <input 
                className='welcome-input' 
                type="password" 
                name="cpwd" 
                id="confirm_password" 
                placeholder="Confirm Password" 
                onChange={(e) => formState.setConfirmPassword(e.target.value)} 
                value={formState.confirmPassword} 
              />
              <FontAwesomeIcon 
              icon={formState.confirmPwdEyeClass} 
              onClick={() => handleTogglePasswordVisibility('confirm_password', formState.setConfirmPwdEyeClass)} 
            />
            </div>
            <button 
              className='welcome-button' 
              onClick={registration}>
              Register
            </button>
        </div>

        <div className="login">
          <label 
            className='welcome-label' 
            htmlFor="chk" 
            aria-hidden="true" 
            onClick={() => handleLoginVisibility(formState.setLoginVisibility, formState.isLoginVisible)}>
            Login
          </label>
          <div className={`login-box ${formState.isLoginVisible ? 'show' : ''}`}>
            <input 
              className='welcome-input' 
              type="text" 
              name="txt" 
              placeholder="Username" 
              required 
              onChange={(e) => formState.setLoginUsername(e.target.value)} 
              value={formState.loginUsername} 
            />
            <div className="password-container">
              <input 
                className='welcome-input' 
                type="password" 
                name="pwd" 
                id="login_password" 
                placeholder="Password" 
                required 
                onChange={(e) => formState.setLoginPassword(e.target.value)} 
                value={formState.loginPassword} 
              />
              <FontAwesomeIcon 
                icon={formState.loginPwdEyeClass} 
                onClick={() => handleTogglePasswordVisibility('login_password', formState.setLoginPwdEyeClass)} 
              />
            </div>
            <button 
              className='welcome-button' 
              onClick={login}>
              Login
            </button>
            <img 
              src={logo} 
              alt="Logo" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
