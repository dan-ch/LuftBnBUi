import React from "react";
import "./App.scss";
import "./styles/global.scss";
import { RoutesConfig } from "./routes/RoutesConfig";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { AuthProvider } from "./context/AuthProvider";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    },
  },
});


function App() {

  return (
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <StyledEngineProvider injectFirst>
            <RoutesConfig/>
            <ReactQueryDevtools initialIsOpen={false}/>
          </StyledEngineProvider>
        </AuthProvider>
    </QueryClientProvider>
  );

}

export default App;
