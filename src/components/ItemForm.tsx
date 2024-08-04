import { useState } from 'react';
import { addItem } from '../utility';
import { createId } from '@paralleldrive/cuid2';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { useAppSelector } from '../hooks';

export function ItemForm() {
  const user = useAppSelector(state => state.userReducer.user);
  const [itemname, setItemname] = useState('');
  const [units, setUnits] = useState(0);

  async function handleItemFormSubmission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await addItem(user!.uid, createId(), { name: itemname, units });
    alert('Item added');
    setItemname("");
    setUnits(0);
  }

  if (!user?.uid) {
    return <Box><Typography>Can't Create Item From User Doesn't Exists</Typography></Box>
  }

  return (
    <Stack border={"1px solid black"} margin={0} padding={"20px"} alignItems={"center"} borderRadius="8px">
      <h1>Item Form</h1>
      <form onSubmit={(e) => handleItemFormSubmission(e)} style={{
        width: "400px",
        gap: "20px"
      }}>
          <TextField variant='standard' label="ItemName:" value={itemname} onChange={(e) => setItemname(e.target.value)} />
          <TextField variant='standard' label="ItemUnit:" value={units} onChange={(e) => setUnits(Number(e.target.value))} />
          <Button variant='outlined' type="submit">
            Add Item
          </Button>
      </form>
      <Box height={"60px"}></Box>
    </Stack>
  );
}
