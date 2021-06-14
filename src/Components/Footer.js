import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../Context/Contexts/AuthContext";
import * as AuthActionCreators from "../Context/ActionCreators/AuthActionCreater";
import ChangeName from "./AuthComponents/ChangeName";
import ChangePassword from "./AuthComponents/ChangePassword";
import classnames from "classnames";
import {Modal,ModalBody,TabContent,TabPane,Nav,NavItem,NavLink,UncontrolledTooltip} from "reactstrap";
const Footer = () => {
  const [mainModal, setMainModal] = useState(false);
  const toggleMain = () => {
    setMainModal(!mainModal);
  };
  const [activeTab, setActiveTab] = useState("1");
  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const [isDarkMode, setIsDarkMode] = useState(false); // true for dark mode
  const history = useHistory();
  const { authState, authDispatch } = useContext(AuthContext);
  const toggleLightMode = () => setIsDarkMode(!isDarkMode);

  const handleLogout = async (event) => {
    authDispatch(AuthActionCreators.authStateUpdate({}));
    localStorage.clear();
    history.push("/");
  };

  return (
    <div className="footer-wrapper fixed-bottom">
      <Modal
        isOpen={mainModal}
        toggle={toggleMain}
        className="modal-dialog-centered"
      >
        <ModalBody>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "1" })}
                onClick={() => {
                  toggleTab("1");
                }}
              >
                Password
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "2" })}
                onClick={() => {
                  toggleTab("2");
                }}
              >
                Username
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1">
              <ChangePassword toggleMain={toggleMain} />
            </TabPane>
            <TabPane tabId="2">
              <ChangeName toggleMain={toggleMain} />
            </TabPane>
          </TabContent>
        </ModalBody>
      </Modal>

      <div className="container pt-3 pb-3">
        <div className="row justify-content-center text-center">
          <div className="col-6 col-sm-3 d-flex justify-content-around  align-items-center">
            <a
              href="https://github.com/code-gambit"
              target="_blank"
              className="text-secondary"
            >
              <span className="fa fa-github fa-lg"></span>
            </a>
            <a href="#" target="_blank" className="text-info">
              <span className="fa fa-linkedin fa-lg"></span>
            </a>
            <a href="#" target="_blank" className="text-primary">
              <span className="fa fa-twitter fa-lg"></span>
            </a>
            <a href="#" target="_blank" className="text-danger">
              <span className="fa fa-instagram fa-lg"></span>
            </a>
          </div>
          {authState.auth.PK ? (
            <div className="col-4 col-sm-2 d-flex justify-content-around  align-items-center">
              <span onClick={toggleLightMode}>
                {!isDarkMode ? (
                  <div>
                    <span
                      className="fa fa-moon-o fa-lg"
                      style={{ cursor: "pointer" }}
                      id="mode"
                    ></span>
                    <UncontrolledTooltip placement="top" target="mode">
                      Dark mode
                    </UncontrolledTooltip>
                  </div>
                ) : (
                  <div>
                    <span
                      className="fa fa-sun-o fa-lg"
                      style={{ cursor: "pointer" }}
                      id="mode"
                    ></span>
                    <UncontrolledTooltip placement="top" target="mode">
                      Light mode
                    </UncontrolledTooltip>
                  </div>
                )}
              </span>
              <span
                onClick={() => {
                  toggleMain();
                }}
                className="fa fa-cog fa-lg"
                id="settings"
                style={{ cursor: "pointer" }}
              ></span>
              <UncontrolledTooltip placement="top" target="settings">
                Settings
              </UncontrolledTooltip>
              <span
                className="fa fa-sign-out fa-lg "
                onClick={handleLogout}
                style={{ cursor: "pointer" }}
                id="exit"
              ></span>
              <UncontrolledTooltip placement="top" target="exit">
                Log out
              </UncontrolledTooltip>
            </div>
          ) : null}
          <div className="col-12 col-sm-4 d-flex  align-items-center justify-content-center">
            <a href="mailto: code.gb.io@gmail.com">code.gb.io@gmail.com</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
