import React from "react";
import { Box, TextField as MuTextField, Typography } from "@mui/material";

const TextField = ({
  label,
  topLabelAlign = "left",
  bottomLabel,
  bottomLabelAlign = "left",
  sx,
  ...restProps
}) => {
  return (
    <Box
      sx={{
        display: "inline-block",
        flexDirection: "column",
        m: 1,
        ...sx,
      }}
    >
      <Typography variant="subtitle2" color="gray" align={topLabelAlign}>
        {label}
      </Typography>
      <MuTextField variant="standard" size="small" {...restProps} />
      <Typography variant="subtitle2" color="gray" align={bottomLabelAlign}>
        {bottomLabel}
      </Typography>
    </Box>
  );
};

export default TextField;
