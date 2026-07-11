import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer();
	const navigate = useNavigate();

	const handleLogout = () => {

		sessionStorage.removeItem("token");
		sessionStorage.removeItem("user");

		dispatch({ type: "logout" });

		navigate("/login");

	};

	return (

		<nav className="navbar navbar-expand-lg">

			<div className="container">

				<Link
					to="/"
					className="navbar-brand text-decoration-none"
				>
					<i className="fas fa-shield-alt me-2"></i>
					SecureAuth
				</Link>

				<div className="d-flex gap-2">

					{store.isAuthenticated || sessionStorage.getItem("token") ? (

						<button
							className="btn btn-outline-dark"
							onClick={handleLogout}
						>
							<i className="fas fa-right-from-bracket me-2"></i>
							Log Out
						</button>

					) : (

						<>

							<Link to="/login">

								<button className="btn btn-outline-dark">

									Log In

								</button>

							</Link>

							<Link to="/signup">

								<button className="btn btn-primary">

									Create Account

								</button>

							</Link>

						</>

					)}

				</div>

			</div>

		</nav>

	);
};