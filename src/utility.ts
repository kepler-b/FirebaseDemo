import {
  arrayRemove,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { firestore } from './firebase.config';
import { Item, User } from './types';

export async function getItems(
  userId: string,
  setItems: (items: Item[]) => void
) {
  const itemCollection = collection(firestore, `users/${userId}/items`);
  const items: Item[] = [];

  const unsubscribe = onSnapshot(itemCollection, (snapshot) => {
    snapshot.docChanges().forEach((change) => {
      if (change.type === 'added') {
        console.log('New item: ', change.doc.data());
      }
      if (change.type === 'modified') {
        console.log('Modified item: ', change.doc.data());
      }
      if (change.type === 'removed') {
        console.log('Removed item: ', change.doc.data());
      }
      // setItems([...items]);
    });
    let items: Item[] = [];
    snapshot.forEach((result) => {
      const rd = result.data() as Item;
      items.push({
        ...rd,
        id: result.id,
      });
    });
    setItems(items);
  });

  const dataSnapshot = await getDocs(itemCollection);
  dataSnapshot.forEach((result) => {
    const rd = result.data();
    items.push({
      id: result.id,
      name: rd.name,
    });
  });

  return [items, unsubscribe];
}

export async function addItem(userId: string, itemId: string, item: Item) {
  const itemCollection = collection(firestore, `users/${userId}/items`);
  await setDoc(doc(itemCollection, itemId), item);
  return item;
}
export async function updateItem(userId: string, itemId: string, item: Item) {
  const itemRef = doc(firestore, `users/${userId}/items/${itemId}`);
  await updateDoc(itemRef, { ...item });
  return item;
}

export async function deleteItem(userId: string, deleteItemId: string) {
  const itemCollection = collection(firestore, `users/${userId}/items`);
  await deleteDoc(doc(itemCollection, deleteItemId));
}

export async function addUserDetails(user: User) {
  const userCollection = collection(firestore, `users`);
  localStorage.setItem('userId', JSON.stringify(user));
  await setDoc(doc(userCollection, user.id), user);
  return user;
}

export async function getUserFromDB(userID: string): Promise<{user: User | null, error: any | null}> {
  try {
    const userRef = doc(firestore, `users/${userID}`);
    const userDoc = await getDoc(userRef);
    if(userDoc.exists()) {
      return  { user: userDoc.data() as User, error: null };
    }
    return { user: null, error: new Error("User doesn't exists")}
  } catch(error) {
    console.error("Error Getting User Data: ", error);
    return { user: null, error };
  }
}

export async function addUserToFriendList(userId: string, user: User) {
  try {
    const userRef = doc(firestore, `users/${userId}`);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      // const currentFriends = userDoc.data()?.friends || [];
      await updateDoc(userRef, {
        friends: arrayUnion(user.id),
      });

      alert(`${user.name} added to friend list`);
    } else {
      console.error('User does not exist');
    }
  } catch (error) {
    console.error('Error adding user to friend list: ', error);
  }
}

export async function removeFriendFromList(userId: string, friendId: string) {
  try {
    const userRef = doc(firestore, `users/${userId}`);
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      // const currentFriends = userDoc.data()?.friends || [];
      await updateDoc(userRef, {
        friends: arrayRemove(friendId),
      });
    } else {
      console.error('User does not exist');
    }
  } catch (error) {
    console.error('Error adding user to friend list: ', error);
  }
}
