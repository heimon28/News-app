import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaAlignJustify, FaAlignCenter } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState(false);
  const [isToggle, setIsToggle] = useState(false);
  const toggle = () => {
    setIsToggle(!isToggle);
  };

  useEffect(() => {
    axios
      .get("/api/v2/users/current-user")
      .then((res) => {
        if (res) {
          setActive(true);
          console.log(active);
        console.log('zzz',res.data)
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {});
  });
  const navItems = [
    {
      name: "Home",
      path: "/",
      active: true,
    },
    {
      name: "Blog",
      path: "/blog",
      active: true,
    },
    {
      name: "About",
      path: "/about",
      active: true,
    },
    {
      name: "Contact us",
      path: "/contact",
      active: true,
    },
    {
      name: "Login",
      path: "/login",
      active: !active,
    },
    {
      name: "Logout",
      path: "/logout",
      active: active,
    },
  ];

  return (
    <header>
      <nav className="bg-black text-white px-8 h-10 flex justify-between items-center">
        <div className="logo">
          <span className="text-blue-400">Hi</span>There
        </div>
        <ul className="md:flex space-x-4 text-sm hidden">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `${isActive ? "text-blue-400" : "text-white"}`
                  }
                >
                  {" "}
                  {item.name}{" "}
                </NavLink>
              </li>
            ) : null
          )}
        </ul>
        <button>x</button>
        <div onClick={toggle} className="md:hidden">
          {isToggle ? <FaAlignCenter /> : <FaAlignJustify />}
        </div>
      </nav>
      {isToggle
        ? navItems.map((item) =>
            item.active ? (
              <ul>
                <li onClick={toggle} key={item.name}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `${isActive ? "text-blue-400" : "text-black"}`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              </ul>
            ) : null
          )
        : null}
    </header>
  );
};

export default Header;
