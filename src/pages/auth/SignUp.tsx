import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import "App.scss";
import { PasswordInput, TextInput } from "components";
import { signInData, signUpData } from "models/Authentication";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
//import { signUp } from "store/actions/authActions";
import { Link } from "react-router-dom";
import { signUpSchema } from "./ValidationSchema";
import { useMutation } from "react-query";
import axios from "utils/axiosInstance";
import { UserActions, UserContext } from "context/AuthProvider";
import LoadingButton from "@mui/lab/LoadingButton";

interface SignUpProps {
}

export const SignUp: React.FC<SignUpProps> = () => {
  const { dispatch } = useContext(UserContext);
  const { isLoading, mutate } = useMutation(async (user: signInData) => {
    const response = await axios.post('./auth/register', user);
    console.log(response);
    return response;
  }, {
    onSuccess: (data) => {
      dispatch({ type: UserActions.setToken, payload: data.data.access_token });
      dispatch({ type: UserActions.setRefreshToken, payload: data.data.refresh_token });
      localStorage.setItem("LuftBnBAccessToken", data.data.access_token);
      localStorage.setItem("LuftBnBRefreshToken", data.data.refresh_token);
      axios.get(`${process.env.REACT_APP_API_URL}/user`, {
        headers: {
          authorization: `Bearer ${data.data.access_token}`
        }
      }).then(user => {
        dispatch({ type: UserActions.setUser, payload: user.data});
      }).catch((error) => console.log(error))
    }
  });
  const methods = useForm<signUpData>({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = (data: signUpData) => {
    mutate(data)
  };
  return (
    <main className="auth">
      <div className="auth__header">
        <h1>Zarejestruj się</h1>
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="auth__form auth__form--sign-up"
        >
          <TextInput
            label="Imię"
            name="firstName"
            placeholder="Imię"
            type="text"
            variant="outlined"
          />
          <TextInput
            label="Nazwisko"
            name="lastName"
            placeholder="Nazwisko"
            type="text"
            variant="outlined"
          />
          <TextInput
            label="Email"
            name="email"
            placeholder="email@email.com"
            type="email"
            variant="outlined"
          />
          <PasswordInput label="Password" name="password" variant="outlined"/>
          <PasswordInput
            label="Confirm Password"
            name="password_confirmation"
            variant="outlined"
          />

          {isLoading ? <LoadingButton loading variant="contained">
            Submit
          </LoadingButton> :<Button type="submit" variant="contained">
            Zarejestruj się
          </Button>}
        </form>
      </FormProvider>

      <span className="auth__footer">
        <p>Masz już konto? </p>
        <Link to="/signin" className="sign-in__footer__link">
          Zaloguj się
        </Link>
      </span>
    </main>
  );
};
