import { Box, Skeleton, Stack, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { getTopics } from "../api/topics";
import { useState } from "react";
import Breadcrumbs from "../components/breadcrumbs";
import Topic from "../components/topic";
import { enqueueSnackbar } from "notistack";
import DoDisturbRoundedIcon from "@mui/icons-material/DoDisturbRounded";

export default function General() {
  const [expanded, setExpanded] = useState<number | false>(false);

  const handleChange =
    (panel: number) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  const { isLoading, data: topics } = useQuery({
    queryKey: ["TOPICS"],
    queryFn: getTopics,
    onError(err: Error) {
      enqueueSnackbar(err.message, {
        variant: "error",
      });
    },
  });

  if (isLoading) {
    return (
      <Stack marginTop={14} gap={2}>
        {[1, 2, 3, 4].map((item) => (
          <Skeleton
            key={item}
            variant="rectangular"
            height={40}
            animation="pulse"
          />
        ))}
      </Stack>
    );
  }

  return (
    <Box
      sx={{
        marginTop: 4,
      }}
    >
      <Breadcrumbs />

      {!topics?.length && (
        <Typography
          variant="body1"
          align="center"
          color="GrayText"
          sx={{
            paddingBlock: 8,
            display: "flex",
            gap: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <DoDisturbRoundedIcon />
          No Topics Found!
        </Typography>
      )}

      {topics?.map((topic) => (
        <Topic
          key={topic.id}
          topic={topic}
          expanded={expanded}
          handleChange={handleChange}
        />
      ))}
    </Box>
  );
}
