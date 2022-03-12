import { Layout } from '@after-dark-app/common-ui';
import { useRouter } from 'next/router';

export function PokerRoom() {
  const router = useRouter();

  const roomId = router.query.roomId;

  return <Layout></Layout>;
}

export default PokerRoom;
