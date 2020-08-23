import React from 'react';
import { render } from '@testing-library/react';

import DraggableList from './draggable-list';

describe('DraggableList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DraggableList />);
    expect(baseElement).toBeTruthy();
  });
});
