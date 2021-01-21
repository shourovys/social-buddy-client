import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import InputBase from "@material-ui/core/InputBase";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import SearchIcon from "@material-ui/icons/Search";
import { Button, Space } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { LOGOUT_USER } from '../../constants/actionTypes';
import { Style } from "./Style";

const useStyles = Style;

export default function Navbar() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch()
  const classes = useStyles();

  const userInfo = useSelector(state => state.user.authData?.userInfo)
  const [showAuthBtn, setShowAuthBtn] = useState(true);

  useEffect(() => {
    if (location.pathname === "/login" || location.pathname === "/sineUp") {
      setShowAuthBtn(false);
    }else{
      setShowAuthBtn(true)
    }
  }, [location.pathname]);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography onClick={()=>history.push('/')} className={classes.title} variant="h6" noWrap>
            Social Buddy
          </Typography>
          <Space size="middle">
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
              />
            </div>

            {userInfo ? (
              <>
                <Avatar
                  src={""}
                  style={{ backgroundColor: "#87d068" }}
                  icon={<UserOutlined />}
                  src={userInfo.imageUrl}
                />
                <h3 className="user__name">{userInfo.name}</h3>
                <Button
                  onClick={()=>dispatch({type:LOGOUT_USER})}
                  type="primary"
                  danger
                  className="btn"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                {showAuthBtn && (
                  <>
                    <Button
                      onClick={() => history.push("/login")}
                      type="primary"
                      className="btn"
                    >
                      LogIn
                    </Button>
                    <Button
                      onClick={() => history.push("/sineUp")}
                      className="btn"
                    >
                      SineUp
                    </Button>
                  </>
                )}
              </>
            )}
          </Space>
        </Toolbar>
      </AppBar>
    </div>
  );
}
