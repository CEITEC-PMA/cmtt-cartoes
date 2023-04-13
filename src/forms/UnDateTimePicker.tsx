import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "@unform/core";
import { useEffect, useState } from "react";

type TUnDateTimePicker = TextFieldProps & {
  name: string;
  label: string;
  min?: Date;
  max?: Date;
};

export const UnDateTimePicker: React.FC<TUnDateTimePicker> = ({
  name,
  label,
  min,
  max,
  ...rest
}) => {
  const { fieldName, registerField, defaultValue, error, clearError } =
    useField(name);
  const [value, setValue] = useState(defaultValue || "");

  useEffect(() => {
    registerField({
      name: fieldName,
      getValue: () => value,
      setValue: (_, newValue) => setValue(newValue),
    });
  }, [registerField, fieldName, value]);

  const minDateTime = min?.toISOString().slice(0, 16);
  const maxDateTime = max?.toISOString().slice(0, 16);

  return (
    <TextField
      {...rest}
      label={label}
      type="datetime-local"
      sx={{ width: 222 }}
      error={!!error}
      helperText={error}
      defaultValue={defaultValue}
      value={value}
      required
      inputProps={{
        min: minDateTime,
        max: maxDateTime,
      }}
      InputLabelProps={{
        shrink: true,
      }}
      onChange={(e) => {
        setValue(e.target.value);
        rest.onChange?.(e);
      }}
      onKeyDown={(e) => {
        error && clearError();
        rest.onKeyDown?.(e);
      }}
    />
  );
};
