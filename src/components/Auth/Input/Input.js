import { UserOutlined } from "@ant-design/icons";
import { Form, Input } from "antd";
import { default as React } from "react";
const CustomInput = ({
   name,
  validateStatus,
  help,
  message,
  value,
  onChange,
  onBlur,
}) => {
  return (
    <Form.Item
      className="form__input"
      hasFeedback
      name={name}
      validateStatus={validateStatus}
      help={help}
      rules={[
        {
          required: true,
          message: { message },
        },
      ]}
    >
      <Input
        prefix={<UserOutlined className="site-form-item-icon" />}
        placeholder={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur ? onBlur : null}
      />
    </Form.Item>
  );
};

export default CustomInput;
