import { Box, Container, Typography } from "@mui/material";
import LoginPageGuard from "../guards/LoginPageGuard";
import { UserForm } from "../components/UserForm";
import { Link } from "react-router-dom";
import { useState } from "react";
import { checkIfEmpty, getUserFromDB } from "../utility";
import { loginWithEmail, useAuth } from "../contexts/AuthContext";

const valueRequired = {
    "email": "",
    "password": ""
}
export default function LoginPage() {
    const [formSubmissionLoading, setFormSubmissionLoading] = useState(false);
    const { setCurrentUser } = useAuth();

    async function handleFormSubmission(values: typeof valueRequired) {
        if (checkIfEmpty(values)) {
            return;
        }
        try {
            setFormSubmissionLoading(true);
            const credential = await loginWithEmail(values.email, values.password);
            const {user, error} = await getUserFromDB(credential.user.uid);

            if (error) {
                console.log(error);
                setFormSubmissionLoading(false);
                return;
            }
            setCurrentUser!(user);
            setFormSubmissionLoading(false);
        } catch (err) {
            console.log(err);
            setFormSubmissionLoading(false);
        }
    }

    return (
        <LoginPageGuard>
            <Box sx={{ width: "100%", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "start", paddingTop: "80px" }}>
            <Box width="100%" maxWidth={"400px"} border={"1px solid black"} borderRadius={"8px"}>
                <UserForm formSubmissionStatus={formSubmissionLoading}  formTitle="Login" valueRequired={valueRequired} submitButtonName="Login" onSubmit={handleFormSubmission} />
                <Container>
                    <Typography textAlign={"center"}>Don't have an account? <Link to={"/signup"}>Signup</Link></Typography>
                </Container>
                <Box height={"60px"}></Box>
            </Box>
            </Box>
        </LoginPageGuard>
    );
}