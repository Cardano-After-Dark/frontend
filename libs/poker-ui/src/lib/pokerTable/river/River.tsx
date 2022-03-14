import { theme } from '@after-dark-app/common-ui';
import { Box } from '@mui/system';

type RiverProps = {
  children: React.ReactChild;
};

export function River({ children }: RiverProps) {
  return (
    <Box
      sx={{
        border: `3px solid rgba(255, 255, 255, 0.2)`,
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

export default River;
