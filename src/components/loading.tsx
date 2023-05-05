import { CircularProgress, Stack } from "@mui/material";

export default function Loading() {
  return (
    <Stack
      maxWidth="100vw"
      maxHeight="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <CircularProgress />
    </Stack>
  );
}
