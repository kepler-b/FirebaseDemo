import { useState } from 'react';
import { Item } from '../types';
import { deleteItem } from '../utility';
import { Popup } from './Popup';
import { UpdateItemForm } from './UpdateItemForm';
import { Container, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Add, Delete, Edit, Update } from '@mui/icons-material';

type ViewerProps = {
  items: Item[];
  userId: string;
  onAdd: () => void
};

export function Viewer({ items, userId, onAdd }: ViewerProps) {
  const [itemToUpdate, setItemToUpdate] = useState<Item | null>(null);

  function setPopClose() {
    setItemToUpdate(null);
  }

  return (
    <>
      <Container sx={{ display: "flex", justifyContent: "space-between" }}><Typography variant='h6'>Items </Typography><IconButton onClick={onAdd}><Add /></IconButton></Container>
      {itemToUpdate ? (
        <Popup active={true}>
          {' '}
          <UpdateItemForm
            item={itemToUpdate}
            userId={userId}
            setClosePop={setPopClose}
          />{' '}
        </Popup>
      ) : (
        ''
      )}
      <TableContainer >
        <Table aria-label="items table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Units</TableCell>
            <TableCell>Update</TableCell>
            <TableCell>Delete Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.units}</TableCell>
              <TableCell>
                <IconButton onClick={() => setItemToUpdate(item)}><Edit /></IconButton>
              </TableCell>
              <TableCell>
                <IconButton onClick={() => deleteItem(userId, item.id || '')}>
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
