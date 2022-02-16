import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import "App.scss";
import { PasswordInput, TextInput } from "components";
import { signInData } from "models/Authentication";
import React, { useContext } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { signInSchema } from "./ValidationSchema";
import { Link } from "react-router-dom";
import { UserActions, UserContext } from "context/AuthProvider";
import { useMutation } from "react-query";
import axios from "utils/axiosInstance";
import LoadingButton from '@mui/lab/LoadingButton';

interface SignInProps {
}

export const SignIn: React.FC<SignInProps> = () => {
  const { dispatch } = useContext(UserContext);
  const { data, isLoading, mutate } = useMutation(async (user: signInData) => {
    const response = await axios.post('./auth/login', user);
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


  const methods = useForm<signInData>({
    resolver: yupResolver(signInSchema),
  });


  const onSubmit = (data: signInData) => {
    mutate(data);
  };

  return (
    <main className="auth">
      <div className="auth__header">
        <h1>Zaloguj się</h1>
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="auth__form auth__form--sign-in"
        >
          <TextInput
            label="Email"
            name="email"
            placeholder="email@email.com"
            type="email"
            variant="outlined"
          />
          <PasswordInput label="Hasło" name="password" variant="outlined"/>

          {isLoading ? <LoadingButton loading variant="contained">
            Submit
          </LoadingButton> : <Button type="submit" variant="contained">
            Zaloguj się
          </Button>}
        </form>
        <div className="auth__footer">
          <p>Nie masz konta? </p>
          <Link to="/signup">Zarejestruj się</Link>
        </div>
      </FormProvider>
    </main>
  );
};

