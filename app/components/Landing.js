import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { UserContext } from "./hooks/UserContext";
import { Link } from "react-router-dom";

export default function Landing() {
  const { user } = useContext(UserContext);

  if (user) {
    <Redirect to="/home" />;
  }
  return (
    <div className="page">
      <h3>This is the public landing page</h3>
      <Link to="login">Log In?</Link>
    </div>
  );
}
