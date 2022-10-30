import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/todos">Todos</Link>
      <Link to="/userstodos">Users and Todos</Link>
    </div>
  );
}

export default Header;
