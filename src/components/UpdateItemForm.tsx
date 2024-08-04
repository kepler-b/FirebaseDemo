import { useState } from 'react';
import { updateItem } from '../utility';
import { Item } from '../types';

export function UpdateItemForm({
  userId,
  item,
  setClosePop,
}: {
  userId: string;
  item: Item;
  setClosePop: (r: boolean) => void;
}) {
  const [itemname, setItemname] = useState(item.name);
  const [units, setUnits] = useState(item.units ?? 0);

  async function handleItemFormSubmission(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (item.id) {
      await updateItem(userId, item.id, { name: itemname, units });
      alert('Item Updated');
      setClosePop(true);
    }
  }

  return (
    <div>
      <h1>Item Form</h1>
      <form onSubmit={(e) => handleItemFormSubmission(e)}>
        <div>
          <label>
            ItemName:{' '}
            <input
              type="text"
              value={itemname}
              onChange={(e) => setItemname(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            ItemUnit:{' '}
            <input
              type="text"
              value={units}
              onChange={(e) => setUnits(Number(e.target.value))}
            />
          </label>
        </div>
        <button>Update Item</button>
      </form>
    </div>
  );
}
