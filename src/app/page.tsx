"use client";

import ListarContatos from "@/components/ListarContatos";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function Home() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <MainStyled>
        <ListarContatos />
      </MainStyled>
      <ToastContainer />
    </ThemeProvider>
  );
}

export const MainStyled = styled.main``;
