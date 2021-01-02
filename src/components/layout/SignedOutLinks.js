import React from "react";
import { NavLink } from "react-router-dom";

const SignedUpLinks = () => {
    return (
        <ul className="right">
            <li><NavLink to="/SignUp">Sign up</NavLink></li>
            <li><NavLink to="/SignIn">Sign in</NavLink></li>
        </ul>
    )
}

export default SignedUpLinks;