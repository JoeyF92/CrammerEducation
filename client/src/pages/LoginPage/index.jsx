import React, {useState} from "react";
import {LoginForm} from "../../components";
import './login.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  return (
    <div className="container">
      <h1>Welcome to BrainBoost - Fuel Your Mind, One Card at a Time!</h1>
      <div className='form-container'>
        <h1>Login</h1>     
        <LoginForm 
          email={email} 
          setEmail={setEmail}
          password={password} 
          setPassword={setPassword}
          message={message} 
          setMessage={setMessage}
        />
      </div>
    </div>
  );
}

