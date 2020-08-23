import React from 'react';
import { render } from '@testing-library/react';

import CalendarChart from './calendar-chart';

describe('CalendarChart', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CalendarChart />);
    expect(baseElement).toBeTruthy();
  });
});
