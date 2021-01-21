import { Icon } from "@material-ui/core";
import { Button, Form } from "antd";
import React, { useEffect, useState } from "react";
import GoogleLogin from "react-google-login";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { addUser, loginUser, sineUpUser } from "../../actions/User";
import CustomInput from "./Input/Input";
import "./Login.css";
import { validateInput } from "./ValidetionFunction";

const Auth = () => {
  const [formData, setFormData] = useState(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [inputValue, setInputValue] = useState({
    name: {},
    email: {},
    password: {},
    confirmPassword: {},
  });

  const [form] = Form.useForm();
  const [, forceUpdate] = useState({}); // To disable submit button at the beginning.

  const dispatch = useDispatch()
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login") {
      setIsNewUser(false);
    } else {
      setIsNewUser(true);
    }
  }, [location.pathname]);
  const handelChange = (input) => {
    setInputValue({
      ...inputValue,
      [input.placeholder]: {
        value: input.value,
        ...validateInput(
          input.placeholder,
          input.value,
          inputValue.password.value
        ),
      },
    });
  };
  const handelBlur = async (input) => {
    // if (inputValue.name.value || inputValue.confirmPassword.value) {
    //   setInputValue({
    //     ...inputValue,
    //     [input.placeholder]: {
    //       value: input.value,
    //       validateStatus: "validating",
    //     },
    //   });
    //   const res = await isEmailAvailable(input.value)
    //   setInputValue({
    //     ...inputValue,
    //     [input.placeholder]: {
    //       value: input.value,
    //       ...res,
    //     },
    //   });
    // }
  };

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    setFormData(values);
  };

  // const loginUser = async () => {
  //   // const data = await logInApi(formData)
  //   // setUser(data.data)
  // };
  // const sideUpUser = async () => {
  //   // const data = await sineUpApi(formData)
  //   // setUser(data.data)
  // };

  const history = useHistory();

  useEffect(() => {
    try {
      if (formData) {
        if (!formData.name) {
          dispatch(loginUser(formData,history));
        } else {
          dispatch(sineUpUser(formData,history));
        }
      }
    } catch (error) {
      console.log(error);
    }
  }, [formData]);

  const googleSuccess = async (res) => {
    const token = res?.tokenId
    const userInfo = {
      name:res?.profileObj?.name,
      email:res?.profileObj?.email,
      _id:res?.profileObj?.googleId
    }
    dispatch(addUser({token,userInfo}))
    history.push('/')
  };
  const googleFailure = (error) => {
    console.log(error);
    console.log("google sineIn was unSuccessful");
  };

  return (
    <Form
      form={form}
      name="horizontal_login"
      layout="inline"
      onFinish={onFinish}
      className="form"
    >
      {isNewUser && (
        <CustomInput
          name="name"
          validateStatus={inputValue.name.validateStatus}
          help={inputValue.name.errorMsg}
          message="Please input your name!"
          value={inputValue.name.value}
          onChange={(e) => handelChange(e.target)}
        />
      )}
      <CustomInput
        name="email"
        validateStatus={inputValue.email.validateStatus}
        help={inputValue.email.errorMsg}
        message="Please input your email!"
        value={inputValue.email.value}
        onChange={(e) => handelChange(e.target)}
      />
      <CustomInput
        name="password"
        validateStatus={inputValue.password.validateStatus}
        help={inputValue.password.errorMsg}
        message="Please input your password!"
        value={inputValue.password.value}
        onChange={(e) => handelChange(e.target)}
      />

      {isNewUser && (
        <CustomInput
          name="confirmPassword"
          validateStatus={inputValue.confirmPassword.validateStatus}
          help={inputValue.confirmPassword.errorMsg}
          message="Please input your confirmPassword!"
          value={inputValue.confirmPassword.value}
          onChange={(e) => handelChange(e.target)}
        />
      )}
      <Form.Item shouldUpdate={true}>
        {() => (
          <Button
            block
            type="primary"
            className="login__bth"
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              !!form.getFieldsError().filter(({ errors }) => errors.length)
                .length
            }
          >
            {isNewUser ? "sine up" : "Log in"}
          </Button>
        )}
      </Form.Item>

      <GoogleLogin
        clientId="486957201403-quh3vjqefkkukc1p8v8j69fa7s572umu.apps.googleusercontent.com"
        render={(renderProps) => (
          <Button
            block
            type="primary"
            className="google__login__btn"
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            startIcon={<Icon />}
          >
            Google signIn
          </Button>
        )}
        onSuccess={googleSuccess}
        onFailure={googleFailure}
      />
      <p
        onClick={() => setIsNewUser((isNewUser) => !isNewUser)}
        style={{ cursor: "pointer" }}
      >
        {isNewUser
          ? "Already have a account? login"
          : "create a new account? sineUp"}
      </p>
    </Form>
  );
};

export default Auth;
