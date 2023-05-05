import { useState, useMemo, useEffect } from "react";
import { Assignment, Search } from "@mui/icons-material";
import {
  Container,
  IconButton,
  TextField,
  InputAdornment,
  Autocomplete,
  Grid,
  Typography,
  Box,
} from "@mui/material";
import { debounce } from "@mui/material/utils";
import { Subtopic } from "../api/interfaces";
import { useMutation } from "@tanstack/react-query";
import { searchSubtopics } from "../api/topics";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

export default function Searchfield() {
  const navigate = useNavigate();
  const [value, setValue] = useState<Subtopic | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState<readonly Subtopic[]>([]);

  const navigateTo = (
    subtopicId: number,
    topicId: number,
    topicName: string
  ) => {
    setInputValue("");
    setValue(null);
    setOptions([]);
    navigate(`/general/${topicName.replaceAll(" ", "-")}`, {
      state: {
        topicId,
        subtopicId,
      },
    });
  };

  //   mutation
  const { mutate } = useMutation({
    mutationFn: searchSubtopics,
    onSuccess(data) {
      setOptions(data);
    },
    onError(error: Error) {
      enqueueSnackbar(error.message, {
        variant: "error",
      });
    },
  });

  const fetch = useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: readonly Subtopic[]) => void
        ) => {
          mutate(request.input);
          callback();
        },
        400
      ),
    []
  );

  useEffect(() => {
    let active = true;

    if (inputValue === "") {
      setOptions(value ? [value] : []);
      return undefined;
    }

    fetch({ input: inputValue }, (results?: readonly Subtopic[]) => {
      if (active) {
        let newOptions: readonly Subtopic[] = [];

        if (value) {
          newOptions = [value];
        }
        if (results) {
          newOptions = [...newOptions, ...results];
        }
        setOptions(newOptions);
      }
    });

    return () => {
      active = false;
    };
  }, [value, inputValue, fetch]);

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        marginY: 4,
      }}
    >
      <Autocomplete
        fullWidth
        clearOnBlur
        autoComplete
        includeInputInList
        filterSelectedOptions
        filterOptions={(x) => x}
        options={options}
        getOptionLabel={(option) => option.title}
        onInputChange={(_event, newInputValue) => {
          setInputValue(newInputValue);
        }}
        value={value}
        noOptionsText="No subtopics"
        onChange={(
          _event: React.SyntheticEvent<Element, Event>,
          newValue: Subtopic | null
        ) => {
          setOptions(newValue ? [newValue, ...options] : options);
          setValue(newValue!);
          newValue &&
            navigateTo(
              newValue?.id!,
              newValue?.topic?.id!,
              newValue?.topic?.title!
            );
        }}
        renderInput={(params) => (
          <TextField
            placeholder="Type your question here"
            {...params}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton>
                    <Search />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
        renderOption={(props, option) => {
          return (
            <li {...props} key={option.id}>
              <Grid container alignItems="center">
                <Grid item sx={{ display: "flex", width: 44 }}>
                  <Assignment sx={{ color: "text.secondary" }} />
                </Grid>
                <Grid
                  item
                  sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
                >
                  <Box component="span" sx={{ fontWeight: "bold" }}>
                    {option.title}
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    July 20, 2014
                  </Typography>
                </Grid>
              </Grid>
            </li>
          );
        }}
      />
    </Container>
  );
}
