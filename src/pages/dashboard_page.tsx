import { AppBar, Box, Button, Toolbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks";
import { useEffect } from "react";
import { getItems } from "../utility";
import { setItems } from "../store";
import { Link, Outlet } from "react-router-dom";
import { Person } from "@mui/icons-material";

export default function DashboardPage({ }) {
    const user = useAppSelector(state => state.userReducer.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!user) return;
        getItems(user.uid, (itms) => dispatch(setItems(itms)));
    }, [user]);

    return (
        <Box sx={{ width: "100%", minHeight: "100vh", padding: "80px" }}>
            <AppBar
                elevation={0}
                color="transparent"
                sx={{
                    maxWidth: "100%",
                    padding: {
                        xs: "0 0px",
                        sm: "0 20px",
                        md: "0 40px",
                    },
                }}
            >
                <Toolbar
                    sx={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "end",
                        marginTop: "12px",
                        marginLeft: 0,
                        marginRight: 0,
                        boxSizing: "border-box",
                    }}
                >
                    <Link to={"/profile"}>
                        <Button startIcon={<Person />}>
                            Profile
                        </Button>
                    </Link>
                </Toolbar>
            </AppBar>
            <Outlet />
        </Box>
    )
}