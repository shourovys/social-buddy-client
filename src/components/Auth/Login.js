import { Button, Form } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import CustomInput from "./Input/Input";
// import { logInApi, sineUpApi } from "../../../APi";
// import { useUserData } from '../../Context/userContext';
import "./Login.css";
import { validateInput } from "./ValidetionFunction";

const Login = () => {
  // const {setUser} = useUserData()
  const [formData, setFormData] = useState(null);
  console.log("🚀 ~ file: Login.js ~ line 13 ~ Login ~ formData", formData);
  const [inputValue, setInputValue] = useState({
    name: {},
    email: {},
    password: {},
    confirmPassword: {},
  });

  const [form] = Form.useForm();
  const [, forceUpdate] = useState({}); // To disable submit button at the beginning.

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

  const loginUser = async () => {
    // const data = await logInApi(formData)
    // setUser(data.data)
  };
  const sideUpUser = async () => {
    // const data = await sineUpApi(formData)
    // setUser(data.data)
  };

  const history = useHistory();

  useEffect(() => {
    try {
      if (formData) {
        if (!formData.name) {
          loginUser();
        } else {
          sideUpUser();
        }
        // history.push('/')
      }
    } catch (error) {
      console.log(error);
    }
  }, [formData]);

  const path = useLocation().pathname;

  return (
    <Form
      form={form}
      name="horizontal_login"
      layout="inline"
      onFinish={onFinish}
      className="form"
    >
      {path === "/sineUp" && (
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

      {path === "/sineUp" && (
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
            htmlType="submit"
            disabled={
              !form.isFieldsTouched(true) ||
              !!form.getFieldsError().filter(({ errors }) => errors.length)
                .length
            }
          >
            {path === "/sineUp" ? "sine up" : "Log in"}
          </Button>
        )}
      </Form.Item>
      <Button block type="primary" className='google__login__btn'>
        Primary
      </Button>
    </Form>
  );
};

export default Login;
