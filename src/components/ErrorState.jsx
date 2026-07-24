import React from "react";
import { Button, Stack, Typography } from "@mui/material";
import { CloudOff, HourglassEmpty, Key } from "@mui/icons-material";
import { describeApiError } from "../utils/fetchfromAPI";

const icons = {
  quota: HourglassEmpty,
  rate: HourglassEmpty,
  auth: Key,
  network: CloudOff,
};

const ErrorState = ({ error, onRetry }) => {
  const { kind, title, message, detail } = describeApiError(error);
  const Icon = icons[kind] || CloudOff;

  return (
    <Stack alignItems="center" gap={2} py={8} px={2}>
      <Icon sx={{ fontSize: 56, color: "primary.main" }} />
      <Typography variant="h6" fontWeight={600} textAlign="center">
        {title}
      </Typography>
      <Typography color="text.secondary" textAlign="center" maxWidth={460}>
        {message}
      </Typography>
      {detail && (
        <Typography
          variant="caption"
          color="text.secondary"
          textAlign="center"
          sx={{ opacity: 0.7 }}
        >
          API response: {detail}
        </Typography>
      )}
      {onRetry && kind !== "quota" && (
        <Button variant="contained" onClick={onRetry}>
          Retry
        </Button>
      )}
    </Stack>
  );
};

export default ErrorState;
