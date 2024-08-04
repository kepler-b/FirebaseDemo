import { useState } from 'react';
import { Item } from '../types';
import { deleteItem } from '../utility';
import { Popup } from './Popup';
import { UpdateItemForm } from './UpdateItemForm';

type ViewerProps = {
  items: Item[];
  userId: string;
};

export function Viewer({ items, userId }: ViewerProps) {
  const [itemToUpdate, setItemToUpdate] = useState<Item | null>(null);

  function setPopClose() {
    setItemToUpdate(null);
  }

  return (
    <div>
      <h1>Viewer</h1>
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
      <table border={1}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Units</th>
            <th>Update</th>
            <th>Delete Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.units}</td>
              <td>
                <button onClick={() => setItemToUpdate(item)}>🖋️</button>
              </td>
              <td>
                <button onClick={() => deleteItem(userId, item.id || '')}>
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
