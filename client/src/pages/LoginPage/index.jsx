import React, {useState} from "react";
import {LoginForm} from "../../components";

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  
  return (
    <div>
      <h1>Please login</h1>
      <LoginForm 
        username={username} 
        setUsername={setUsername}
        password={password} 
        setPassword={setPassword}
        message={message} 
        setMessage={setMessage}
      />
    </div>
  );
}

