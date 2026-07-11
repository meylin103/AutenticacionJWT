import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Signup = () => {

  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      const response = await fetch(`${backendUrl}/api/user`, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          username,
          email,
          password
        })

      });

      if (!response.ok) {

        const err = await response.json();

        Swal.fire({
          icon: "error",
          title: "Registration Failed",
          text: err.msg || "Unable to create your account.",
          confirmButtonColor: "#4F46E5"
        });

        return;

      }

      await Swal.fire({
        icon: "success",
        title: "Account Created!",
        text: "Your account has been created successfully.",
        confirmButtonColor: "#4F46E5"
      });

      navigate("/login");

    } catch (error) {

      console.error(error);

      Swal.fire({
        icon: "error",
        title: "Oops!",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#4F46E5"
      });

    }

  };

  return (

    <div className="container py-5">

      <div className="auth-card">

        <div className="text-center mb-4">

          <div className="hero-icon auth-icon">

            <i className="fas fa-user-plus"></i>

          </div>

          <h1 className="fw-bold mt-3">
            Create Account
          </h1>

          <p className="text-muted">
            Register to start using the application.
          </p>

        </div>

        <form className="auth-form" onSubmit={handleSubmit}>

          <div className="mb-3">

            <label className="form-label">
              Username
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

          </div>

          <div className="mb-3">

            <label className="form-label">
              Email
            </label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>

          <div className="mb-4">

            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Create Account
          </button>

        </form>

        <p className="text-center mt-4 mb-0">

          Already have an account?

          <Link
            to="/login"
            className="ms-2 text-decoration-none fw-semibold"
          >
            Log In
          </Link>

        </p>

      </div>

    </div>

  );

};