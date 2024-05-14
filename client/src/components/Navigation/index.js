import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { logout } from '../../utils/Authentication';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';
import { Stack } from '@mui/material';

export default function Navigation() {
    const history = useHistory()
    const handleHomepageRedirection = () => {
        history.push("/dashboard")
    }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
            <Stack direction={"row"} justifyContent={"space-between"} padding={2}>
                <Typography variant='h5' onClick={handleHomepageRedirection} style={{cursor: "pointer"}}>Smart Report</Typography>
                <Button color="inherit" onClick={logout}><PowerSettingsNewRoundedIcon /></Button>
            </Stack>
      </AppBar>
    </Box>
  );
}