import { Link, LinkProps, Typography } from "@mui/material";
import { useLocation, Link as RouterLink } from "react-router-dom";
import MuiBreadcrumbs from "@mui/material/Breadcrumbs";
import { NavigateNext } from "@mui/icons-material";
import { breadcrumbNameMap } from "../data/constants";

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}

function LinkRouter(props: LinkRouterProps) {
  return <Link {...props} component={RouterLink as any} />;
}

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <>
      <MuiBreadcrumbs
        aria-label="breadcrumb"
        separator={<NavigateNext fontSize="small" />}
        sx={{
          marginBottom: 2,
        }}
      >
        <LinkRouter underline="hover" color="inherit" to="/">
          Home
        </LinkRouter>

        {pathnames.map((_value, index) => {
          const last = index === pathnames.length - 1;
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;

          return last ? (
            <Typography
              color="text.primary"
              key={to}
              textTransform="capitalize"
            >
              {pathnames.at(-1)?.replaceAll("-", " ")}
            </Typography>
          ) : (
            <LinkRouter underline="hover" color="inherit" to={to} key={to}>
              {breadcrumbNameMap[to]}
            </LinkRouter>
          );
        })}
      </MuiBreadcrumbs>
    </>
  );
}
