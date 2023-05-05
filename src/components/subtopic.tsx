import { useNavigate } from "react-router-dom";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Subtopic as ISubtopic } from "../api/interfaces";
import AssignmentIcon from "@mui/icons-material/Assignment";

interface SubtopicProps {
  subtopic: ISubtopic;
  topicId: number;
  topicName: string;
}

export default function Subtopic({
  subtopic,
  topicId,
  topicName,
}: SubtopicProps) {
  const navigate = useNavigate();

  const navigateToTopic = () =>
    navigate(`${topicName.replaceAll(" ", "-")}`, {
      state: {
        topicId,
        subtopicId: subtopic.id,
      },
    });

  return (
    <ListItem disablePadding>
      <ListItemButton onClick={navigateToTopic}>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary={subtopic.title} />
      </ListItemButton>
    </ListItem>
  );
}
