import React from "react";
import {
  Autocomplete,
  Box,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

export const InputField = ({
  label,
  labelAlign = "left",
  bottomLabel,
  bottomLabelAlign = "left",
  multiple,
  options,
  id,
  sx,
  type,
  formik,
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
      <Typography variant="subtitle2" color="gray" align={labelAlign}>
        {label}
      </Typography>
      {type === "select" && (
        <Select
          {...restProps}
          multiple={multiple}
          name={id}
          variant="standard"
          sx={{ width: 165 }}
        >
          {options?.map(({ value, label }) => (
            <MenuItem value={value} key={value}>
              {label}
            </MenuItem>
          ))}
        </Select>
      )}
      {type === "autoComplete" && (
        <Autocomplete
          multiple
          options={options}
          getOptionLabel={(option) => option}
          id={id}
          onChange={(e, v) => formik?.setFieldValue(id, v)}
          {...restProps}
          renderInput={(params) => <TextField {...params} variant="standard" />}
        />
      )}
      {type !== "select" && type !== "autoComplete" && (
        <TextField
          variant="standard"
          size="small"
          type={type}
          id={id}
          {...restProps}
        />
      )}

      <Typography variant="subtitle2" color="gray" align={bottomLabelAlign}>
        {bottomLabel}
      </Typography>
    </Box>
  );
};
