import React from "react";

export default function LoginForm({username, setUsername, password, setPassword, message, setMessage}) {


  function handleUsername(e) {
    setUsername(e.target.value)
  }

  function handlePassword(e) {
    setPassword(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (username.length > 0 && password.length > 0) {
      fetch('http://localhost:3000/login', {
        method: 'POST',
        body: JSON.stringify({email: username, password: password}),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then((data) => {
        setMessage('User logged in successfully.');
        setTimeout(() => {
          setMessage('')
        }, 5000);
      })
      .catch((err) => {
        console.log(err)
        setMessage('Invalid username or password.');
        setTimeout(() => {
          setMessage('')
        }, 5000)
      });
      setUsername('')
      setPassword('')
    } else {
      setMessage('Please fill in all fields.');
      setTimeout(() => {
        setMessage('')
      }, 5000)
    }
  }

  return(
    <form onSubmit={handleSubmit}>
      <div><input value={username} onChange={(e) => setUsername(e.target.value)} /></div>
      <div><input value={password} type="password" onChange={(e) => setPassword(e.target.value)} /></div>
      <button type="submit">Login</button>
      <p className='message'>{message}</p>
    </form>
  )
}
