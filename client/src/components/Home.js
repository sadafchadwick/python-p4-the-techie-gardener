import React from "react";
import { Route, Redirect } from "react-router-dom";

function Home() {
    return (
    <Routes>
        <Route path="signup" element={ <Signup /> } />
        <Route path="login" element={ <Login /> } />
    </Routes>
    );
}

export default Home;






<h1>Home Page</h1>