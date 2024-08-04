import { useState } from 'react';
import { addItem } from '../utility';
import { createId } from '@paralleldrive/cuid2';
import { Box, Button, Stack, TextField } from '@mui/material';

export function ItemForm({ userId }: { userId: string }) {
  const [itemname, setItemname] = useState('');
  const [units, setUnits] = useState(0);

  async function handleItemFormSubmission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await addItem(userId, createId(), { name: itemname, units });
    alert('Item added');
    setItemname("");
    setUnits(0);
  }

  return (
    <Stack border={"1px solid black"} margin={0} padding={"20px"} alignItems={"center"}>
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
