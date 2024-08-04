import { useEffect, useState } from 'react';
import './App.css';
import { Viewer } from './components/Viewer';
import { User } from './types';
import { getItems, addUserDetails, getUserFromDB } from './utility';
import { UserForm } from './components/UserForm';
import { ItemForm } from './components/ItemForm';
import { useAppDispatch, useAppSelector } from './hooks';
import { setItems, setUser } from './store';
import { FriendListForm } from './components/FriendListForm';
import UserProfile from './components/UserProfile';
import Button from '@mui/material/Button';
import { signInAnonymously } from 'firebase/auth';
import { auth } from './firebase.config';

function App() {
  const user = useAppSelector((state) => state.userReducer.user);
  const items = useAppSelector((state) => state.itemsReducer.items);

  const dispatch = useAppDispatch();
  const [friendListPopUpActivation, setFriendListPopUpActivation] =
    useState(false);

  useEffect(() => {
    if (!user) return;
    getItems(user.id, (itms) => dispatch(setItems(itms)));
  }, [user]);

  async function handleFormSubmission(user: User) {
    const addedUser = await addUserDetails(user);
    alert('User added');
    dispatch(setUser(addedUser));
  }

  useEffect(() => {
    const userData = localStorage.getItem('userId');
    if (!userData) return;
    const localUser = JSON.parse(userData) as User;
    getUserFromDB(localUser.id)
      .then(({user, error}) => {
        console.assert(!error, error);
        if (!error)
        dispatch(setUser(user!));
      })
    dispatch(setUser(localUser));
  }, []);

  async function signIn() {
    const credentials = await signInAnonymously(auth);
    console.log(credentials.user);
  }

  return (
    <>
      <Button onClick={() => signIn()} >Authenticate With Firebase</Button>
      {user ? '' : <UserForm onSubmit={handleFormSubmission} />}
      {user ? <UserProfile /> : ""}
      {user ? <ItemForm userId={user.id} /> : ''}
      {user ? <Viewer userId={user.id} items={items} /> : ''}

      {user ? (
        <>
          <button onClick={() => setFriendListPopUpActivation(true)}>
            Activate FriendList Search
          </button>
          <FriendListForm
            userId={user.id}
            isActivated={friendListPopUpActivation}
            deactivation={() => setFriendListPopUpActivation(false)}
          />
        </>
      ) : (
        ''
      )}
    </>
  );
}

export default App;
