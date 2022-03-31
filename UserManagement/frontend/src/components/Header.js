import React, {Fragment} from "react";
import { Link, withRouter, useHistory } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { isLoggedIn, signoutUser } from "./Auth";

const Header = ({m}) => {
    let history = useHistory();

    const signoutUsers = () => {
        signoutUser(() => {
            history.push("/");
        })
    }
  return (
      <div>
    <Navbar collapseOnSelect fixed="top" expand="sm" bg="dark" variant="dark">
      <Navbar.Collapse>
        <Nav>
          <Nav.Link href="/"> </Nav.Link>
          {!isLoggedIn() && (
            <Fragment>
              <Nav.Link href="/login">Signin</Nav.Link>
              <Nav.Link href="/"> Signup</Nav.Link>
            </Fragment>
          )}

        {isLoggedIn() && (
                <Nav.Link  onClick={() => {
                    signoutUsers(() => {
                        history.push("/")
                    })}} href="/">Signout</Nav.Link>
        )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    </div>
  );
};

export default withRouter(Header);
