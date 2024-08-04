import React, { useEffect } from 'react';
import { AuthLoadStatus, useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Box, LinearProgress, Typography } from '@mui/material';
import { useAppSelector } from '../hooks';

export default function LoginPageGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { loaded } = useAuth();
  const user = useAppSelector(state => state.userReducer.user);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user && !user.displayName);
    if (user) {
      navigate('/');
    }
  }, [user]);

  if (!user && loaded === AuthLoadStatus.LOADING) {
    return (
      <>
        <LinearProgress color="warning" />
        <Box
          sx={{
            width: "100%",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Typography fontWeight="bold" sx={{ opacity: "0.8" }}>
            Checking Authentication Status
          </Typography>
        </Box>
      </>
    );
  }


  return <>{children}</>;
}
