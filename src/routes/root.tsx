import { Container, CssBaseline, Stack } from "@mui/material";
import { Outlet } from "react-router-dom";
import Searchfield from "../components/searchfield";
import logo from "../assets/logo.svg";

export default function Root() {
  return (
    <>
      <CssBaseline />
      <Container
        maxWidth="md"
        sx={{
          paddingY: 6,
        }}
      >
        <Stack justifyContent="center" alignItems="center">
          <img src={logo} alt="rocket logo" width={100} height="auto" />
        </Stack>
        <Searchfield />
        <Outlet />
      </Container>
    </>
  );
}
