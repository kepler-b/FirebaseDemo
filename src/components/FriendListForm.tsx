import React, { useState } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore';
import { firestore } from '../firebase.config'; // Ensure this path is correct for your setup
import { User } from '../types';
import styles from './friendlist.module.css';
import { Popup } from './Popup';
import { addUserToFriendList } from '../utility';
import { useAppSelector } from '../hooks';

export function FriendListForm({
  userId,
  isActivated,
  deactivation,
}: {
  userId: string;
  isActivated: boolean;
  deactivation: () => void;
}) {
  const user = useAppSelector(state=>state.userReducer.user);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [queryiedResult, setQueriedResult] = useState<User[]>([]);

  async function addToFriendList(user: User) {
    console.log('Add user to friend list:', user);
    await addUserToFriendList(userId, user);
  }

  async function handleUserSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchQuery(value);
    console.log(searchQuery);

    if (value === '') {
      setQueriedResult([]);
      return;
    }

    try {
      const userQuery = query(
        collection(firestore, 'users'),
        where('name', '>=', value),
        where('name', '<=', value + '\uf8ff'),
        orderBy('name'),
        limit(10)
      );

      const querySnapshot = await getDocs(userQuery);
      const usersList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<User, 'id'>),
      }));
      setQueriedResult(usersList.filter((v) => v.id !== user?.id));
    } catch (error) {
      console.error('Error fetching users: ', error);
    }
  }

  return (
    <Popup active={isActivated}>
      <button
        style={{ position: 'absolute', right: '12px', top: '12px' }}
        onClick={() => deactivation()}
      >
        Close
      </button>
      <div className={styles.friendlistformcontianer}>
        <form>
          <div className={styles.searchField}>
            <input
              type="text"
              placeholder="Enter friend name:"
              value={searchQuery}
              onChange={handleUserSearch}
            />
          </div>
          {queryiedResult.length > 0 ? (
            <ul className={styles.searchList}>
              {queryiedResult.map((user) => (
                <li key={user.id}>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      addToFriendList(user);
                    }}
                  >
                    {user.name}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No users found</p>
          )}
        </form>
      </div>
    </Popup>
  );
}
