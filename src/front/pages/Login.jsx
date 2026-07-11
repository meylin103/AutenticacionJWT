import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useGlobalReducer from "../hooks/useGlobalReducer.jsx";

export const Login = () => {

  const navigate = useNavigate();
  const { dispatch } = useGlobalReducer();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const backendUrl = import.meta.env.VITE_BACKEND_URL;

      const response = await fetch(`${backendUrl}/api/login`, {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          email,
          password
        })

      });

      if (!response.ok) {

        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Please check your email and password.",
          confirmButtonColor: "#4F46E5"
        });

        return;

      }

      const data = await response.json();

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", JSON.stringify(data.user));

      dispatch({

        type: "login",

        payload: {

          token: data.token,

          user: data.user

        }

      });

      await Swal.fire({

        icon: "success",

        title: "Welcome Back!",

        text: "You have logged in successfully.",

        confirmButtonColor: "#4F46E5"

      });

      navigate("/private");

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

            <i className="fas fa-user-lock"></i>

          </div>

          <h1 className="fw-bold mt-3">
            Welcome Back
          </h1>

          <p className="text-muted">
            Sign in to continue to your account.
          </p>

        </div>

        <form className="auth-form" onSubmit={handleSubmit}>

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
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Log In
          </button>

        </form>

        <p className="text-center mt-4 mb-0">

          Don't have an account?

          <Link
            to="/signup"
            className="ms-2 text-decoration-none fw-semibold"
          >
            Create one
          </Link>

        </p>

      </div>

    </div>

  );

};