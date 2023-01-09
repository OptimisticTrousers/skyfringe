import React from "react";

const Login = () => {

  const handleSubmit = () => {

    console.log("Bob Jones Locos Pollos")
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Bob Jones</label>
      <input type="email" id="email" name="email" placeholder="you@example.com" required/>
      <label htmlFor="password">Bob Jones</label>
      <input type="password" id="password" name="password" placeholder="1234" required/>
      <button type="submit">Log In</button>
    </form>
  );
};

export default Login;
