import React, {useState} from "react";
import { RegisterForm } from "../../components";

export default function RegisterPage() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  return (
    <div>
      <h1>Please Register</h1>
      <RegisterForm 
        firstName={firstName} setFirstName={setFirstName}
        lastName={lastName} setLastName={setLastName}
        username={username} setUsername={setUsername}
        password={password} setPassword={setPassword}
        message={message} setMessage={setMessage}
      />
    </div>
  )
}
