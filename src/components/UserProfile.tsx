import { Box, Button, CircularProgress, List, ListItem, ListItemText, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useState } from "react";
import { Item, User } from "../types";
import { getItems, getUserFromDB } from "../utility";
import { setFriendItems, setFriends } from "../store";
import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";

function RenderItems({ items, showItems }: { items?: Item[], showItems: boolean }) {

    if (!items || !showItems) {
        return <></>;
    }

    if (showItems && items.length === 0) {
        return  <TableRow>
            <TableCell colSpan={3} align="center">
                <Typography>No Items Exists</Typography>
            </TableCell>
        </TableRow>
    }

    return (
        <TableRow>
            <TableCell colSpan={3}>
                <List>
                    {
                        items?.map(item => (
                            <ListItem key={item.id}>
                                <ListItemText>{item.name}</ListItemText>
                            </ListItem>
                        ))
                    }
                </List>
            </TableCell>
        </TableRow>
    )
}


export function FriendListTableRow({ friend, index }: { friend: User, index: number }) {
    const dispatch = useAppDispatch();
    const [itemLoadingStatus, setItemLoadingStatus] = useState(false);
    const [showItems, setShowItems]= useState(false);

    async function loadItems() {
        setShowItems(true);
        if (!friend.items){
            setItemLoadingStatus(true);
            await getItems(friend.id, (items) => dispatch(setFriendItems({ friendId: friend.id, items })));
            setItemLoadingStatus(false);
        }
    }
    
    function removeItems() {
        setShowItems(false)
    }

    return (
        <>
            <TableRow key={friend.id}>
                <TableCell>
                    {index}
                </TableCell>
                <TableCell>
                    {friend.name}
                </TableCell>
                <TableCell>
                    {!showItems? <Button onClick={loadItems} endIcon={<ArrowDropDown />}>
                        Show Items
                    </Button>:
                    <Button onClick={removeItems} endIcon={<ArrowDropUp />}>
                        Remove Items
                    </Button>}
                </TableCell>
            </TableRow>
            {
                itemLoadingStatus ?
                    <TableRow><TableCell colSpan={3} align="center"><CircularProgress /></TableCell></TableRow> :
                    <RenderItems items={friend.items} showItems={showItems} />
            }
        </>
    );
}

export default function UserProfile() {
    const user = useAppSelector(state => state.userReducer.user);
    const dispatch = useAppDispatch();
    const friendsList = useAppSelector(state => state.friendsReducer.friends);
    const [friendListLoadingStatus, setFriendListLoadingStatus] = useState(false);


    function friendExists(): boolean {
        return !!user && !!user.friends && user.friends.length > 0;
    }

    async function loadFriends() {
        setFriendListLoadingStatus(true);
        if (user && user.friends && friendsList.length != user.friends.length) {
            const friendsDetailsResult = await Promise.all(user.friends.map(friendId => getUserFromDB(friendId)));
            const friendsDetails = friendsDetailsResult.filter((fd) => !fd.error).map(fd => fd.user!);
            dispatch(setFriends(friendsDetails));
        }
        setFriendListLoadingStatus(false);
    }

    return (
        <Stack border={"1px solid black"} margin={0} padding={"20px"}>
            <Typography variant="h5" fontWeight="bold">UserProfile</Typography>
            <Box><Typography variant="h6" fontWeight={"bold"}>Id: <Typography component="span">{user?.id}</Typography> </Typography></Box>
            <Box><Typography variant="h6" fontWeight={"bold"}>Username: <Typography component="span">{user?.name} </Typography></Typography></Box>
            <Box><Typography variant="h6" fontWeight={"bold"}>Email: <Typography component="span">{user?.email}</Typography></Typography></Box>
            <Box><Typography variant="h6" fontWeight={"bold"}>Total Friends: <Typography component="span">{user?.friends?.length}</Typography></Typography></Box>

            {friendExists() ? <Box marginY={"12px"}><Button variant="outlined" onClick={loadFriends} disabled={friendListLoadingStatus}>Get Friends List</Button></Box> : ""}

            {
                friendsList.length > 0 ? 
                <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>UserName</TableCell>
                            <TableCell>ItemList</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            friendsList.map((friend, index) => (<FriendListTableRow key={friend.id} friend={friend} index={index + 1} />))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
             :""
            }
        </Stack>
    )
}