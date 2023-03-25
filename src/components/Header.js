// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { styled } from '@mui/system';

const CustomAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#121212',
}));

const CustomTypography = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
}));

const Header = () => {
  return (
    <CustomAppBar position="static">
      <Toolbar>
        <CustomTypography variant="h6">
          DataSling
        </CustomTypography>
      </Toolbar>
    </CustomAppBar>
  );
};

export default Header;
