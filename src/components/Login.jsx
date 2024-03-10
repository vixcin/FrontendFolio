import React, { useContext } from "react";
import { UserContext } from "./UserContext";

// Login component that allow user to add, edit, and delete views
const Login = () => {
    // User context
    const { userContext, setUserContext } = useContext(UserContext);

    // handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserContext(prevUserContext => ({
            ...prevUserContext,
            [name]: value
        }));
    };

    // handle form submit and add details to the context
    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = userContext;

        // validation 
        if (email === "" || password === "") {
            alert("Please enter email and password");
            return;
        } else if (email === "person@admin.mail" && password === "password") {
            setUserContext(prevUserContext => ({
                ...prevUserContext,
                loggedIn: true
            }));
            // redirect to the home page
            alert("Successfully logged in");
        } else {
            alert("Details not recognized. Please try again.");
        }
    };

    return (
        <div className="d-flex justify-content-center">
            <div className="col-md-6">
                <h1>Login</h1>
                <hr />
                <form>
                    <div className="input-group mb-3">
                        <label htmlFor="email" className="input-group-text w-25">Email</label>
                        <input type="email" className="form-control" name="email" id="email" onChange={handleChange} aria-describedby="emailHelp" placeholder="admin@realadmin.mail" />
                    </div>
                    <div className="input-group mb-3">
                        <label htmlFor="password" className="input-group-text w-25" style={{ minWidth: "fit-content"}}>Password</label>
                        <input type="password" className="form-control" name="password" id="password" onChange={handleChange} placeholder="**************" />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
