import React from 'react';
import { render } from '@testing-library/react';

import ChatBubble from './chat-bubble';

describe('ChatBubble', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ChatBubble />);
    expect(baseElement).toBeTruthy();
  });
});
