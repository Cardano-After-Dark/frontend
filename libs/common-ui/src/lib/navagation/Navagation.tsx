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
import Link from 'next/link';

export const Navigation = () => {
  const isScrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 20,
  });

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Stack direction={'row'} justifyContent="start" alignItems="center">
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
    </AppBar>
  );
};

export default Navigation;
