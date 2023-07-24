import React, { useState } from "react";

export default function LoginForm() {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  function handleUsername(e) {
    setUsername(e.target.value)
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return(
    <form onSubmit={handleSubmit}>
      <label>Username:<input type="text" value={username} onChange={handleUsername} /></label>
      <br />
      <label>Password:<input type="password" value={password} onChange={handlePassword} /></label>
      <br />
      <input type="submit" value="Submit" />
    </form>
  )
}
