import { AuthState, User } from "models/Authentication";
import { createContext, Dispatch, FC, useEffect, useReducer } from "react";
import axios from "axios";

export enum UserActions {
  logout = 'SIGN_OUT',
  setToken = 'SET_TOKEN',
  setRefreshToken = 'SET_REFRESH_TOKEN',
  setUser = 'SET_USER'
}

type IActions = {
  type: UserActions;
  payload: string | User;
}

const initialState: AuthState = {
  user: null,
  authenticated: false,
  refreshToken: null,
  token: null
};

export const UserContext = createContext<{
  userState: AuthState; dispatch: Dispatch<IActions>
}>({
  userState: initialState,
  dispatch: () => null
});

const authReducer = (state: AuthState, action: IActions) => {
  const { type, payload } = action;

  switch (type) {
    case UserActions.logout:
      localStorage.removeItem('LuftBnBAccessToken');
      localStorage.removeItem('LuftBnBRefreshToken');
      return initialState;
    case UserActions.setToken:
      return {
        ...state,
        authenticated: true,
        token: payload as string
      };
    case UserActions.setRefreshToken:
      return {
        ...state,
        refreshToken: payload as string
      };
    case UserActions.setUser:
      return {
        ...state,
        user: payload as User,
      };
    default:
      return state;
  }
};

interface AuthProviderProps {
  children: JSX.Element;
}

export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [userState, dispatch] = useReducer(authReducer, initialState);

    useEffect(() => {
      if (localStorage.getItem("LuftBnBRefreshToken")) {

        axios.get(`${process.env.REACT_APP_API_URL}/auth/refresh-token`, {
          headers:{
            authorization: `Bearer ${localStorage.getItem("LuftBnBRefreshToken")}`
          }
        }).then(response => {
          dispatch({ type: UserActions.setToken, payload: response.data.access_token });
          dispatch({ type: UserActions.setRefreshToken, payload: response.data.refresh_token });
          localStorage.setItem("LuftBnBAccessToken", response.data.access_token);
          localStorage.setItem("LuftBnBRefreshToken", response.data.refresh_token);
          axios.get(`${process.env.REACT_APP_API_URL}/user`, {
            headers: {
              authorization: `Bearer ${response.data.access_token}`
            }
          }).then(user => {
            dispatch({ type: UserActions.setUser, payload: user.data});
          }).catch((error) => console.log(error))
        }).catch((error) => console.log(error))
      }
    }, []);
    return (
      <UserContext.Provider value={{ userState, dispatch }}>
        {children}
      </UserContext.Provider>
    );
  }
;