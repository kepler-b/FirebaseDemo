import { useId, useState } from 'react';
import { Box, Stack, TextField, Button, CircularProgress } from '@mui/material';

type UserFormProps = {
  onSubmit: (valueRequired: any) => void;
  valueRequired: Record<string, string>;
  submitButtonName: string;
  formTitle: string,
  formSubmissionStatus: boolean
};

const keys = ["button", "checkbox", "color", "date", "datetime-local", "email", "file", "hidden", "image", "month", "number", "password", "radio", "range", "reset", "search", "submit", "tel", "text", "time", "url", "week"]


export function UserForm({ onSubmit, valueRequired, submitButtonName, formTitle, formSubmissionStatus }: UserFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({ ...valueRequired });
  const id = useId();


  function getInputType(key: string): React.HTMLInputTypeAttribute {
    key = key.toLowerCase();

    return keys.findIndex((v) => v === key) > - 1? key: "text"; 
  }

  return (
    <Stack textAlign={"center"} margin={0} padding={"20px"} borderRadius={"8px"}>
      <h1>{formTitle}</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ ...formData });
        }}
      >
        {
          Object.keys(valueRequired).map((key, index) => (
            <Box key={index} marginBottom={"20px"}>
              <TextField
                id={`${id}-${key}`}
                label={key}
                type={getInputType(key)} 
                value={formData[key]}
                onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                fullWidth
              />
            </Box>
          ))
        }
        <div style={{ textAlign:"right" }}>
          <Button type="submit" disabled={formSubmissionStatus} startIcon={formSubmissionStatus ? <CircularProgress /> : undefined}  variant="contained" color="primary">
            {submitButtonName}
          </Button>
        </div>
      </form>
    </Stack>
  );
}