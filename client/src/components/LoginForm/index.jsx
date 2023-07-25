import React from "react";

export default function LoginForm({email, setEmail, password, setPassword, message, setMessage}) {

  const handleSubmit = (e) => {
    e.preventDefault()
    localStorage.clear()

    if (email.length > 0 && password.length > 0) {
      fetch('http://localhost:3000/users/login', {
        method: 'POST',
        body: JSON.stringify({email: email, password: password}),
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
        localStorage.setItem("token", JSON.stringify(data.token)); //
        setMessage('User logged in successfully.');
        setTimeout(() => {
          setMessage('')
          window.location = "/"
        }, 500);
      })
      .catch((err) => {
        console.log(err)
        setMessage('Invalid email or password.');
        setTimeout(() => {
          setMessage('')
        }, 5000)
      });
      setEmail('')
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
      <div>Email: <input value={email} onChange={(e) => setEmail(e.target.value)} /></div>
      <div>Password: <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} /></div>
      <button type="submit">Login</button>
      <p className='message'>{message}</p>
    </form>
  )

}
