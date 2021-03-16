import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import Router from "next/router";
import MenuItems from "./MenuItem";
import User from "../../Image/user.png";
import Logo from "../../Image/logo.png";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";

import { usePath } from "hookrouter";
import { AuthContext } from "../../appState/AuthProvider";
import "bootstrap/dist/css/bootstrap.min.css";
import { Nav, NavDropdown, Navbar } from "react-bootstrap";

export const QUERY_USERPROFILE = gql`
  query {
    getOneUser {
      name
      studentId
      major
      type
    }
  }
`;

const navbar = () => {
  //console.log("Menu", MenuItems);
  const [toggle, setToggle] = useState("");
  const [refresh, setRefresh] = useState(false);

  const path = usePath();

  const { user, signout } = useContext(AuthContext);
  console.log("User Navbar", user);

  const [isAdmin, setisAdmin] = useState(false);
  console.log("Admin >>", isAdmin);

  // const [isShown, setIsShown] = useState(false);
  // const handleIsShown = async () => {
  //   if (isShown == false) {
  //     setIsShown(true);
  //   }
  //   if (isShown == true) {
  //     setIsShown(false);
  //   }
  // };

  // const [isShown2, setIsShown2] = useState(false);
  // const handleIsShown2 = async () => {
  //   if (isShown2 == false) {
  //     setIsShown2(true);
  //   }
  //   if (isShown2 == true) {
  //     setIsShown2(false);
  //   }
  // };

  console.log("toggle nav", toggle);

  return (
    <div className="Nav-Items-Div">
      <Navbar className="bg-orange" expand="lg">
        <Navbar.Brand href="#home" className="Nav-Logo-Flex">
          <img
            className="Nav-Logo-Img"
            src={Logo}
            onClick={() => Router.push("/")}
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse
          id="basic-navbar-nav"
          aria-controls="basic-navbar-nav"
          className="mr-10"
        >
          <Nav className="">
            <Nav.Link href="#home" onClick={() => Router.push("/")}>
              หน้าแรก
            </Nav.Link>
            <Nav.Link href="#activity" onClick={() => Router.push("/activity")}>
              กิจกรรมทั้งหมด
            </Nav.Link>

            {user && (
              <>
                <Nav.Link href="#create" onClick={() => Router.push("/post")}>
                  สร้างกิจกรรม
                </Nav.Link>
              </>
            )}
            {!user && (
              <>
                <div className="Flex-Row">
                  <Nav.Link href="#login" onClick={() => Router.push("/login")}>
                    Login
                  </Nav.Link>
                  <Nav.Link href="#">/</Nav.Link>
                  <Nav.Link
                    href="#register"
                    onClick={() => Router.push("/register")}
                  >
                    Register
                  </Nav.Link>
                </div>
              </>
            )}
            {user && (
              <>
                {" "}
                <img
                  className="Nav-Profile-Img"
                  src={User}
                  //onClick={() => handleClick("")}
                  onClick={() => Router.push("/profile")}
                />
                <NavDropdown
                  id="basic-nav-dropdown"
                  title="โปรไฟล์"
                  className="mr-sm-2"
                >
                  <NavDropdown.Item
                    href="#action/3.1"
                    onClick={() => Router.push("/profile")}
                  >
                    โปรไฟล์
                  </NavDropdown.Item><NavDropdown.Item>
                  </NavDropdown.Item>
                  {user.type == "admin" && (
                    <>
                      <NavDropdown.Item
                        href="#action/3.2"
                        onClick={() => Router.push("/reportView")}
                      >
                        การรายงาน
                      </NavDropdown.Item>
                    </>
                  )}
                  <NavDropdown.Item href="#action/3.3 " onClick={signout}>
                    ออกจากระบบ
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default navbar;
