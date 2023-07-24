import React, { useState } from "react";

export default function RegisterForm() {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleFirstName(e) {
    setFirstName(e.target.value)
  }

  function handleLastName(e) {
    setLastName(e.target.value)
  }

  function handleUsername(e) {
    setUsername(e.target.value)
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>First Name: <input type="text" value={firstName} onChange={handleFirstName} /></label>
      <br />
      <label>Last Name: <input type="text" value={lastName} onChange={handleLastName} /></label>
      <br />
      <label>Username: <input type="text" value={username} onChange={handleUsername} /></label>
      <br />
      <label>Password: <input type="password" value={password} onChange={handlePassword} /></label>
      <br />
      <input type="submit" value="Register" />
    </form>
  )
}
