import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {

	const { store, dispatch } = useGlobalReducer();
	const navigate = useNavigate();

	const handleLogout = () => {

		dispatch({
			type: "logout"
		});

		navigate("/login");
	};

	return (

		<nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm py-3">

			<div className="container">

				<Link
					to="/"
					className="navbar-brand fw-bold fs-4 text-light text-decoration-none"
				>
					JWT Auth
				</Link>

				<div className="d-flex gap-2">

					{
						store.isAuthenticated || sessionStorage.getItem("token")
							?

							<>

								<Link to="/private">
									<button className="btn btn-success px-4">
										Private
									</button>
								</Link>

								<button
									className="btn btn-danger px-4"
									onClick={handleLogout}
								>
									Logout
								</button>

							</>

							:

							<>

								<Link to="/login">
									<button className="btn btn-outline-light px-4">
										Log In
									</button>
								</Link>

								<Link to="/signup">
									<button className="btn btn-primary px-4">
										Sign Up
									</button>
								</Link>

							</>

					}

				</div>

			</div>

		</nav>
	);
};