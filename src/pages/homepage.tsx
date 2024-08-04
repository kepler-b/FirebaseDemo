import { Link } from "react-router-dom";
import MainRouteGuard from "../guards/MainRouteGuard";
import DashboardPage from "./dashboard_page";
import { Box, Button } from "@mui/material";

function LandingPage() {

    return (
        <Box sx={{ width: "100%", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Link to={"/login"}><Button>Login</Button></Link>
            <Link to={"/signup"}><Button>Signup</Button></Link>
        </Box>
    )
}

export default function HomePageRoute({}) {

    return (
        <MainRouteGuard DefaultComponent={LandingPage}>
            <DashboardPage />
        </MainRouteGuard>
    )
}