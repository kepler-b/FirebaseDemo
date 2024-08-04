import { Box, IconButton } from "@mui/material";
import { ItemForm } from "../components/ItemForm";
import { Viewer } from "../components/Viewer";
import { useAppSelector } from "../hooks";
import { Popup } from "../components/Popup";
import { useState } from "react";
import { Close } from "@mui/icons-material";

export default function ItemsPage() {
    const items = useAppSelector(state => state.itemsReducer.items);
    const user = useAppSelector(state => state.userReducer.user);
    const [showPopup, setShowPopup] = useState(false);

    return (
        <Box>
            <Viewer userId={user!.uid} items={items} onAdd={() => setShowPopup(true)} />
            <Popup active={showPopup}>
                <IconButton
                    style={{ position: 'absolute', right: '12px', top: '12px' }}
                    onClick={() => setShowPopup(false)}
                >
                    <Close />
                </IconButton>
                <ItemForm />
            </Popup>
        </Box>
    )
}