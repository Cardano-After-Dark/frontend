import { HeroLayout } from '@after-dark-app/common-ui';
import { LogoTextNoBackground } from '@after-dark-app/images';
import { Button, Stack } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/router';

export function Index() {
  const router = useRouter();

  const playGame = () => router.push('/rooms/0001');

  return (
    <HeroLayout>
      <Stack direction="row" justifyContent="center" alignItems="center">
        <Stack justifyContent="center" alignItems="center">
          <Image src={LogoTextNoBackground} alt="icon" />
          <Button
            color="primary"
            variant="contained"
            size="large"
            sx={{
              width: 200,
            }}
          >
            Play
          </Button>
        </Stack>
      </Stack>
    </HeroLayout>
  );
}

export default Index;
