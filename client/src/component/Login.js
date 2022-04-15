import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { LOGIN_USER } from "../gqlQuery/mutation";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({});
  const [signInUser, { loading, data, error }] = useMutation(LOGIN_USER);
  const navigate = useNavigate();
  if (loading) return <h3>Loading...</h3>;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (data) {
    localStorage.setItem("token", data.user.token);
    navigate("/");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    signInUser({
      variables: {
        userSignIn: formData,
      },
    });
  };
  return (
    <div className="container my-container">
      {error && <div className="red card-panel">{error.message}</div>}

      <h5>Login!!</h5>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          name="email"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={handleChange}
          required
        />
        <button className="btn #673ab7 deep-purple" type="submit">
          Login
        </button>
      </form>
    </div>
  );
}
