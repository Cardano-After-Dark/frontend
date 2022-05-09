import { Icon } from '@after-dark-app/images';
import {
  AppBar,
  Box,
  Container,
  Stack,
  Typography,
  useScrollTrigger,
} from '@mui/material';
import Image from 'next/image';

export const Navigation = () => {
  return (
    <Box
      sx={{
        color: 'rgba(255, 255, 255)',
      }}
    >
      <Container maxWidth="xl">
        <Stack direction={'row'} justifyContent="center" alignItems="center">
          <Box
            position={'relative'}
            width={100}
            height={100}
            display="inline-block"
          >
            <Image src={Icon} layout="fill" objectFit="contain" />
          </Box>
          <Typography variant="h3">Cardano After Dark</Typography>
        </Stack>
      </Container>
    </Box>
  );
};

export default Navigation;
