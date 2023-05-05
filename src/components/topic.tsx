import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import TopicIcon from "@mui/icons-material/Topic";
import { Topic as ITopic } from "../api/interfaces";
import Subtopic from "./subtopic";

interface TopicProp {
  expanded: number | false;
  topic: ITopic;
  handleChange: (
    panel: number
  ) => (event: React.SyntheticEvent, isExpanded: boolean) => void;
}

export default function Topic({ topic, expanded, handleChange }: TopicProp) {
  return (
    <Accordion
      variant="outlined"
      disableGutters
      expanded={topic.id === expanded}
      onChange={handleChange(topic.id)}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography
          fontWeight={500}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <TopicIcon />
          {topic.title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {topic.subtopics.length ? (
          <List>
            {topic.subtopics.map((subtopic) => (
              <Subtopic
                key={subtopic.id}
                topicId={topic.id}
                topicName={topic.title}
                subtopic={subtopic}
              />
            ))}
          </List>
        ) : (
          <Typography
            variant="body2"
            color="GrayText"
            align="center"
            paddingBottom={2}
          >
            No Subtopics Found
          </Typography>
        )}
      </AccordionDetails>
    </Accordion>
  );
}
