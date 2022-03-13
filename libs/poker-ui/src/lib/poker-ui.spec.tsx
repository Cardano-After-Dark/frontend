import { render } from '@testing-library/react';

import PokerUi from './poker-ui';

describe('PokerUi', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PokerUi />);
    expect(baseElement).toBeTruthy();
  });
});
