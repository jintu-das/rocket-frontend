import MenuBookIcon from "@mui/icons-material/MenuBook";
import GroupIcon from "@mui/icons-material/Group";
import ArticleIcon from "@mui/icons-material/Article";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SpeedIcon from "@mui/icons-material/Speed";
import FingerprintIcon from "@mui/icons-material/Fingerprint";

export const breadcrumbNameMap: { [key: string]: string } = {
  "/general": "General",
};

export const MENU_LIST = [
  {
    id: 1,
    name: "General",
    icon: <MenuBookIcon />,
    link: "/general",
  },
  {
    id: 2,
    name: "Introduction",
    icon: <GroupIcon />,
    link: "#",
  },
  {
    id: 3,
    name: "Documentation",
    icon: <ArticleIcon />,
    link: "#",
  },
  {
    id: 4,
    name: "Account Setting",
    icon: <ManageAccountsIcon />,
    link: "#",
  },
  {
    id: 5,
    name: "Pricing",
    icon: <AttachMoneyIcon />,
    link: "#",
  },
  {
    id: 6,
    name: "Privacy & Security",
    icon: <FingerprintIcon />,
    link: "#",
  },
  {
    id: 7,
    name: "Dashboard",
    icon: <SpeedIcon />,
    link: "#",
  },
];
