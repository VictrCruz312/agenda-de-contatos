"use client";

import Header from "@/components/Header";
import ListarContatos from "@/components/ListarContatos";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import styled from "styled-components";

export default function Home() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <MainStyled>
        <Header />
        <ListarContatos />
      </MainStyled>
    </ThemeProvider>
  );
}

export const MainStyled = styled.main``;
