// import { isEmailAvailableApi } from "../../../APi";

const reg_exp_for_email = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const reg_exp_for_srtong_password = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/
export const isEmailAvailable = async (email) => {
  // const data = await isEmailAvailableApi({email:email})
  // if (data.data) {
  //   return {
  //     validateStatus: "error",
  //     errorMsg: "this gmail is not available",
  //   };
  // }
  // return {
  //   validateStatus: "success",
  //   errorMsg: null,
  // };
}

export const validateInput = (name, value, password) => {
  switch (name) {
    case "username":
      if (value.length < 3) {
        return {
          validateStatus: "error",
          errorMsg: "name at least 3 characters long",
        };
      }
      return {
        validateStatus: "success",
        errorMsg: null,
      };
    case "email":
      if (!reg_exp_for_email.test(String(value).toLowerCase())) {
        return {
          validateStatus: "error",
          errorMsg: "please enter a valid email address",
        };
      }
      return {
        validateStatus: "success",
        errorMsg: null,
      };
    case "password":
    console.log('call',value);

      if (value.length < 6) {
        return {
          validateStatus: "error",
          errorMsg: "password at least 6 characters long.",
        };
      }
      if (!reg_exp_for_srtong_password.test(String(value))) {
        return {
          validateStatus: "warning",
          errorMsg: "add a strong password",
        };
      }
      return {
        validateStatus: "success",
        errorMsg: null,
      };
    case "confirmPassword":
      if (value !==password) {
        return {
          validateStatus: "error",
          errorMsg: "Enter the save password twice for verification.",
        };
      }
      return {
        validateStatus: "success",
        errorMsg: null,
      };

    default:
      break;
  }
  return {
    validateStatus: "success",
    errorMsg: null,
  };
};
