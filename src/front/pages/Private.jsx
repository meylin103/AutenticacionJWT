import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const Private = () => {

    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);

    useEffect(() => {

        const validateToken = async () => {

            const token = sessionStorage.getItem("token");
            const storedUser = JSON.parse(sessionStorage.getItem("user"));

            setUser(storedUser);

            if (!token) {

                navigate("/login");
                return;

            }

            try {

                const backendUrl = import.meta.env.VITE_BACKEND_URL;

                const response = await fetch(`${backendUrl}/api/protected`, {

                    method: "GET",

                    headers: {
                        Authorization: `Bearer ${token}`
                    }

                });

                if (!response.ok) {

                    sessionStorage.removeItem("token");
                    sessionStorage.removeItem("user");

                    await Swal.fire({
                        icon: "warning",
                        title: "Session Expired",
                        text: "Please log in again.",
                        confirmButtonColor: "#4F46E5"
                    });

                    navigate("/login");

                    return;

                }

                const data = await response.json();

                setUserId(data.logged_in_as);

            } catch (error) {

                console.error(error);

                navigate("/login");

            }

        };

        validateToken();

    }, []);

    return (

        <div className="container py-5">

            <div className="dashboard-card">

                <div className="dashboard-header">

                    <img
                        src={`https://ui-avatars.com/api/?name=${user?.username || "User"}&background=4F46E5&color=fff&size=128`}
                        alt="Avatar"
                        className="dashboard-avatar"
                    />

                    <div>

                        <h1>

                            Welcome back,
                            {" "}
                            <span>{user?.username || "User"}</span>
                            {" "}
                            👋

                        </h1>

                        <p>

                            Your account has been authenticated successfully.
                            You now have access to protected resources.

                        </p>

                    </div>

                </div>

                <hr />

                <div className="dashboard-title">

                    <h3>

                        <i className="fas fa-user-circle me-2"></i>

                        Account Overview

                    </h3>

                </div>

                <div className="info-grid">

                    <div className="info-item">

                        <span className="info-label">

                            <i className="fas fa-user"></i>

                            Username

                        </span>

                        <span className="info-value">

                            {user?.username}

                        </span>

                    </div>

                    <div className="info-item">

                        <span className="info-label">

                            <i className="fas fa-envelope"></i>

                            Email

                        </span>

                        <span className="info-value">

                            {user?.email}

                        </span>

                    </div>

                    <div className="info-item">

                        <span className="info-label">

                            <i className="fas fa-id-badge"></i>

                            User ID

                        </span>

                        <span className="info-value">

                            {userId}

                        </span>

                    </div>

                    <div className="info-item">

                        <span className="info-label">

                            <i className="fas fa-circle-check"></i>

                            Status

                        </span>

                        <span className="status success">

                            Authenticated

                        </span>

                    </div>

                    <div className="info-item">

                        <span className="info-label">

                            <i className="fas fa-shield-alt"></i>

                            Session

                        </span>

                        <span className="status primary">

                            JWT Active

                        </span>

                    </div>

                </div>

                <div className="dashboard-footer">

                    <i className="fas fa-lock me-2"></i>

                    This page is protected using JWT authentication and
                    route authorization.

                </div>

            </div>

        </div>

    );

};