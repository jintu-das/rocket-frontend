import {
  Avatar,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MENU_LIST } from "../data/constants";

export default function Home() {
  const navigate = useNavigate();
  const navigateTo = (link: string) => navigate(link);

  return (
    <Grid container spacing={3}>
      {MENU_LIST.map((menu) => (
        <Grid item xs={12} sm={6} md={3} key={menu.id}>
          <Card variant="outlined" onClick={() => navigateTo(menu.link)}>
            <CardActionArea>
              <CardContent>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar>{menu.icon}</Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={menu.name}
                    secondary="lorem ipsum dolor sit amet"
                  />
                </ListItem>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
