import React from 'react';
import {
	BrowserRouter,
	Routes,
	Route,
	redirect,
} from "react-router-dom";

import "./app.scss";
import Home from './pages/home/Home';
import Watch from './pages/watch/Watch';
import Register from './pages/register/Register';
import Login from './pages/login/Login';

const App = () => {
	const user = true;
	
	return (
		<BrowserRouter>
			<Routes>
				<Route exact element={user ? <Home /> : redirect("/register")} path="/" />
				<Route element={!user ? <Register /> : redirect("/")} path="/register" />
				<Route element={!user ? <Login /> : redirect("/")} path="/login" />
				{user && (
					<>
						<Route element={<Home type="movies"/>} path="/movies" />
						<Route element={<Home type="series"/>} path="/series" />
						<Route element={<Watch />} path="/watch" />
					</>
				)}
			</Routes>
		</BrowserRouter>
	);
};

export default App;
