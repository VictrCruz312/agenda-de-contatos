import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import { alpha, styled } from "@mui/material/styles";
import { HiOutlineMenu, HiSearch } from "react-icons/hi";
import { ISearch } from "../ListarContatos";
import { Checkbox, FormControlLabel } from "@mui/material";

interface IPropsHeader {
  setSearch: React.Dispatch<React.SetStateAction<ISearch>>;
  search: ISearch;
}

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Header({ setSearch, search }: IPropsHeader) {
  const handleSearchTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchType = event.target.checked ? "telefone" : "nome";
    setSearch((search) => {
      return { ...search, searchType };
    });
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <HiOutlineMenu />
        </IconButton>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
        >
          Lista de contatos
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={search.searchType === "telefone"}
              onChange={handleSearchTypeChange}
              name="searchTypeCheckbox"
              color="secondary"
            />
          }
          label="Marque para pesquisar pelo telefone"
        />
        <Search>
          <SearchIconWrapper>
            <HiSearch />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder={
              search.searchType === "telefone"
                ? "Pesquisar telefone..."
                : "Pesquisar nome..."
            }
            inputProps={{ "aria-label": "Pesquisar" }}
            onChange={(e) =>
              setSearch((search: ISearch) => {
                return { ...search, value: e.target.value };
              })
            }
          />
        </Search>
      </Toolbar>
    </AppBar>
  );
}
