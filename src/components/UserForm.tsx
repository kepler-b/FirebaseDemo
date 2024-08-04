import { useState } from 'react';
import { User } from '../types';
import { createId } from '@paralleldrive/cuid2';
import { Stack } from '@mui/material';

type UserFormProps = {
  onSubmit: (user: User) => void;
};

export function UserForm({ onSubmit }: UserFormProps) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
  });

  return (
    <Stack border={"1px solid black"} margin={0} padding={"20px"}>
      <h1>UserForm</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit({ ...formData, id: formData.id || createId() });
        }}
      >
        <div>
          <label>
            Id:{' '}
            <input
              type="text"
              value={formData.id}
              onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            />
          </label>
        </div>
        <div>
          <label>
            Username:{' '}
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </label>
        </div>
        <div>
          <label>
            Email:{' '}
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </label>
        </div>
        <div>
          {' '}
          <button type="submit">Authenticate</button>
        </div>
      </form>
    </Stack>
  );
}
