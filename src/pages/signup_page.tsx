import { Box, Container, Typography } from "@mui/material";
import SignupPageGuard from "../guards/SignupPageGuard";
import { UserForm } from "../components/UserForm";
import { Link } from "react-router-dom";
import { signupWithEmail, useAuth } from "../contexts/AuthContext";
import { addUserDetails, checkIfEmpty } from "../utility";
import { useState } from "react";

const valueRequired = {
    fullname: "",
    "email": "",
    "password": "",
}

export default function SignupPage() {
    const { setCurrentUser } = useAuth();
    const [formSubmissionLoading, setFormSubmissionLoading] = useState(false);

    async function handleFormSubmission(values: typeof valueRequired) {
        if (checkIfEmpty(values)) {
            return;
        }
        try {
            setFormSubmissionLoading(true);
            const credential = await signupWithEmail(values.email, values.password);
            const user = await addUserDetails({
                email: credential.user.email!,
                displayName: values.fullname,
                emailVerified: credential.user.emailVerified!,
                uid: credential.user.uid,
                photoURL: credential.user.photoURL,
                isAnonymous: credential.user.isAnonymous,
            });
            setCurrentUser!(user);
            setFormSubmissionLoading(false);
        } catch (err) {
            console.log(err);
            setFormSubmissionLoading(false);
        }
    }

    return (
        <SignupPageGuard>
            <Box sx={{ width: "100%", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "start", paddingTop: "80px" }}>
                <Box width="100%" maxWidth={"400px"} border={"1px solid black"} borderRadius={"8px"}>
                    <UserForm formSubmissionStatus={formSubmissionLoading} formTitle="Signup" valueRequired={valueRequired} submitButtonName="Signup" onSubmit={handleFormSubmission} />
                    <Container>
                        <Typography textAlign={"center"}>Have an account? <Link to={"/login"}>Login</Link></Typography>
                    </Container>
                    <Box height={"60px"}></Box>
                </Box>
            </Box>
        </SignupPageGuard>
    )
}