import { render } from '@testing-library/react';

import PokerEngine from './poker-engine';

describe('PokerEngine', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<PokerEngine />);
    expect(baseElement).toBeTruthy();
  });
});
