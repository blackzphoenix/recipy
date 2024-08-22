import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const isDisabled =
    location.pathname.startsWith("/edit/") || location.pathname === "/add";

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold">
          ReciPy
        </Link>
        <nav className="text-md font-bold">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "mr-4 text-blue-500" : "mr-4"
            }
            end
            onClick={(e) => isDisabled && e.preventDefault()}
            style={{
              pointerEvents: isDisabled ? "none" : "auto",
              opacity: isDisabled ? 0.5 : 1,
            }}
          >
            Recipes
          </NavLink>
          <NavLink
            to="/add"
            className={({ isActive }) =>
              isActive ? "mr-4 text-blue-500" : "mr-4"
            }
            onClick={(e) => isDisabled && e.preventDefault()}
            style={{
              pointerEvents: isDisabled ? "none" : "auto",
              opacity: isDisabled ? 0.5 : 1,
            }}
          >
            Create
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

export default Header;
