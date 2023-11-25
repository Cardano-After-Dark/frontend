import { theme } from '../../theme';
import { Box } from '@mui/system';
import React, { ReactNode } from 'react';


type RiverProps = {
  children: ReactNode;
};

const River: React.FC<RiverProps> = ({ children }) => {
  return (
    <Box
      sx={{
        border: {
          xs: 'none',
          sm: `3px solid rgba(255, 255, 255, 0.2)`,
        },
        position: 'absolute',
        padding: '5px',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        borderRadius: 3,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        [theme.breakpoints.down('md')]: {
          top: '53%',
        },
      }}
    >
      {children}
    </Box>
  );
}

export { River };
