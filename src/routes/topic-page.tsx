import {
  Paper,
  Typography,
  Stack,
  ListItemButton,
  List,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "../components/breadcrumbs";
import { useQuery } from "@tanstack/react-query";
import { enqueueSnackbar } from "notistack";
import { getSubtopics } from "../api/topics";
import { useState } from "react";
import { Subtopic } from "../api/interfaces";
import AssignmentIcon from "@mui/icons-material/Assignment";

export default function Topic() {
  const { state } = useLocation();
  const [activeSlide, setActiveSlide] = useState<Subtopic>();
  const [slides, setSlides] = useState<Subtopic[]>();

  // queries
  const { isLoading } = useQuery({
    queryKey: ["TOPIC_WITH_SUBTOPICS", state.topicId, state.subtopicId],
    queryFn: () => getSubtopics(state.topicId),
    onSuccess(data) {
      setActiveSlide(data.find((subtopic) => subtopic.id === state.subtopicId));
      setSlides([...data]);
    },
    onError(err: Error) {
      enqueueSnackbar(err.message, {
        variant: "error",
      });
    },
  });

  const handleClick = (subtopic: Subtopic) => {
    setActiveSlide(subtopic);
  };

  if (isLoading) {
    return (
      <div>
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div>
      <Breadcrumbs />

      <Stack direction="row" spacing={3}>
        <Paper
          variant="outlined"
          sx={{
            paddingBlock: 1,
            paddingInline: 2,
            minHeight: 400,
          }}
        >
          <Typography variant="h4" paddingY={2}>
            {activeSlide?.title}
          </Typography>
          <Typography paragraph>{activeSlide?.paraOne} </Typography>
          <Typography paragraph>{activeSlide?.paraOne}</Typography>
        </Paper>
        <List sx={{ minWidth: 250, bgcolor: "background.paper" }}>
          {slides?.map((slide) => (
            <ListItemButton onClick={() => handleClick(slide)} key={slide.id}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText
                color="primary"
                primary={slide.title}
                secondary={new Date(slide.createdAt).toLocaleDateString()}
              />
            </ListItemButton>
          ))}
        </List>
      </Stack>
    </div>
  );
}
