import React from "react";
import { Link } from "react-router-dom";

export const Home = () => {

    return (

        <div className="container py-5">

            {/* Hero */}

            <section className="text-center hero-section">

                <div className="hero-icon">
                    <i className="fas fa-shield-alt"></i>
                </div>

                <h1 className="display-3 fw-bold mb-3">
                    Secure Authentication
                </h1>

                <p className="hero-subtitle">
                    A modern authentication system built with
                    <strong> React</strong>, <strong>Flask</strong>,
                    <strong> JWT</strong>, and
                    <strong> PostgreSQL</strong>.
                </p>

                <p className="hero-description">
                    Secure user registration, login, protected routes,
                    and REST API integration following modern web
                    development practices.
                </p>

                <div className="d-flex justify-content-center gap-3 mt-4">

                    <Link to="/signup" className="btn btn-primary btn-lg px-4">
                        Create Account
                    </Link>

                    <Link to="/login" className="btn btn-outline-dark btn-lg px-4">
                        Log In
                    </Link>

                </div>

            </section>

            {/* Features */}

            <section className="row mt-5 g-4">

                <div className="col-md-4">

                    <div className="feature-card text-center">

                        <i className="fas fa-user-shield feature-icon"></i>

                        <h4>Secure Login</h4>

                        <p>
                            Authenticate users securely using JSON Web Tokens.
                        </p>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="feature-card text-center">

                        <i className="fas fa-lock feature-icon"></i>

                        <h4>Protected Routes</h4>

                        <p>
                            Restrict access to authenticated users only.
                        </p>

                    </div>

                </div>

                <div className="col-md-4">

                    <div className="feature-card text-center">

                        <i className="fas fa-server feature-icon"></i>

                        <h4>REST API</h4>

                        <p>
                            Backend powered by Flask and PostgreSQL.
                        </p>

                    </div>

                </div>

            </section>

        </div>

    );
};