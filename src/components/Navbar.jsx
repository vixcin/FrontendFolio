import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";
import Home from "./Home";
import About from "./About";
import Project from "./Project";
import AddProject from "./AddProject";
import Login from "./Login";
import EditProject from "./EditProject";

import { UserContext } from "./UserContext";

const Navbar = () => {
    // const [myData] = data;

    const { userContext, setUserContext } = React.useContext(UserContext);

    return (
        <Router>
            <nav className="navbar navbar-expand-lg navbar-light bg-light mb-5">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand"> Portfolio </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" 
                    aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* Navbar Links */}
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                            {/* Add Projects Button*/}
                            {
                                (userContext.loggedIn)
                                ?
                                    <Link to="/project/add" className="nav-link">Add Project</Link>
                                :
                                    null
                            }
                            {/* Login & Logout Button */}
                            {
                                (userContext.loggedIn) 
                                ? 
                                    <Link to="/login" className="nav-link" onClick={
                                        () => {
                                            setUserContext({
                                                ...userContext,
                                                loggedIn: false
                                            })
                                            alert("Successfully logged out");
                                        }}>Logout</Link> 
                                : 
                                    <Link to="/login" className="nav-link">Login</Link>
                            }
                            <Link to="/about" className="nav-link">About</Link>
                        </div>

                    </div>
                </div>
            </nav>
            {/* <UserContext.Provider value={{ userContext, setUserContext }}> */}
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exact path="/FrontendFolio" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/project/add" element={<AddProject  />} />
                    <Route path="/project/:id" element={<Project />} />
                    <Route path="/project/edit/:id" element={<EditProject />} />
                    <Route path="/login" element={<Login  />} />
                </Routes>
            {/* </UserContext.Provider> */}

        </Router>
    )
}

export default Navbar;