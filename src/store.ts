import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item, Items, User } from "./types";

type TUserSliceInitialState = {
    user: User | null
}

type TItemsSliceInitialState = {
    items: Item[]
}

type TFriendListSliceInitialState = {
    friends: User[]
}

const userSliceInitialState: TUserSliceInitialState = {
    user: null
}

const itemsSliceInitialState: TItemsSliceInitialState = {
    items: []
}

const friendListInitialState: TFriendListSliceInitialState = {
    friends: []
}

export const userSlice = createSlice({
    initialState: userSliceInitialState, 
    name: "user",
    reducers: {
        setUser(state, action: PayloadAction<User | null>) {
            state.user = action.payload
        }
    }
});

export const itemsSlice = createSlice({
    initialState: itemsSliceInitialState, 
    name: "items",
    reducers: {
        setItems(state, action: PayloadAction<Item[]>) {
            state.items = action.payload
        }
    }
})

export const friendsListSlice = createSlice({
    initialState: friendListInitialState, 
    name: "friends",
    reducers: {
        setFriends(state, action: PayloadAction<User[]>) {
            state.friends = action.payload;
        },
        setFriendItems(state, action: PayloadAction<{ friendId: string, items: Items}>) {
            const userIndex = state.friends.findIndex((user) => user.uid === action.payload.friendId);
            if (userIndex > -1) {
                state.friends[userIndex].items = action.payload.items;
            }
        }
    }
})

export const { setUser } = userSlice.actions;
export const { setItems } = itemsSlice.actions;
export const { setFriends, setFriendItems } = friendsListSlice.actions;

export const store = configureStore({
    reducer: {
        userReducer: userSlice.reducer,
        itemsReducer: itemsSlice.reducer,
        friendsReducer: friendsListSlice.reducer
    },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
