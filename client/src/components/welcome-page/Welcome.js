import './Welcome.css';
import logo from './logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { useFormState, handleRegistration, handleLogin, handleTogglePasswordVisibility, handleLoginVisibility } from './FormFunctions';


function App() {
  const navigate = useNavigate();
  const formState = useFormState();

  const registration = (event) => {
    event.preventDefault();
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

  const login = (event) => {
    event.preventDefault();
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
        <form className="register" onSubmit={registration}>
          <label
            className='welcome-label'
            htmlFor="chk"
            aria-hidden="true"
            onClick={() => handleLoginVisibility(formState.setLoginVisibility, formState.isLoginVisible)}>
            Register
          </label>
          <div className={`register-box ${formState.isLoginVisible ? '' : 'show'}`}>
            <input
              className='welcome-input'
              type="text"
              name="txt"
              placeholder="First Name"
              required
              title='Please enter your first name'
              onChange={(e) => formState.setFirstName(e.target.value)}
              value={formState.firstName}
            />
            <input
              className='welcome-input'
              type="text"
              name="txt"
              placeholder="Last Name"
              required
              title='Please enter your last name'
              onChange={(e) => formState.setLastName(e.target.value)}
              value={formState.lastName}
            />
            <input
              className='welcome-input'
              type="text"
              name="txt"
              placeholder="Username"
              required
              pattern='^[A-Za-z0-9]{6,}$'
              title='Username must be at least 6 non-special characters long'
              onChange={(e) => formState.setUsername(e.target.value)}
              value={formState.username}
            />
            <input
              className='welcome-input'
              type="email"
              name="email"
              placeholder="Email"
              required
              pattern='([a-z0-9]+\.)*[a-z0-9]+@([a-z0-9]+\.)+[a-z0-9]+'
              title='Enter a valid e-mail address'
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
                pattern='[A-Za-z0-9@#$%^&+=_]{8,}'
                title='Password must be at least 8 characters long'
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
                required
                title="Passwords don't match"
                pattern={formState.password}
                onChange={(e) => formState.setConfirmPassword(e.target.value)}
                value={formState.confirmPassword}
              />
              <FontAwesomeIcon
                icon={formState.confirmPwdEyeClass}
                onClick={() => handleTogglePasswordVisibility('confirm_password', formState.setConfirmPwdEyeClass)}
              />
            </div>
            <button
              type="submit"
              className='welcome-button'
            >
              Register
            </button>
          </div>
        </form>

        <form className="login" onSubmit={login}>
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
              type="submit"
              className='welcome-button'
            >
              Login
            </button>
            <img
              src={logo}
              alt="Logo"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
