import React from 'react';
import { Card } from '@demo-monorepo/ui';
import Folders from '../app/folders/folders';
import CalendarChart from '../app/calendar-chart/calendar-chart';
import Goo from '../app/goo/goo';
import './app.scss';

export const App = () => {
  return (
    <div className="app section container">
      <div
        className="grid"
        style={{
          display: 'grid',
          gridTemplateRows: 'repeat(3, 20em)',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridGap: '1.5em',
        }}
      >
        <div
          style={{
            gridArea: '1 / 1 / 1 / 3',
          }}
        >
          <Card>
            <Goo />
          </Card>
        </div>
        <div>
          <Card>2</Card>
        </div>
        <div
          style={{
            gridArea: '1 / 3 / 3 / 3',
          }}
        >
          <Card>
            <Folders />
          </Card>
        </div>
        <div
          style={{
            gridArea: '2 / 1 / 3 / 3',
          }}
        >
          <Card>
            <CalendarChart />
          </Card>
        </div>
        <div>
          <Card>5</Card>
        </div>
        <div
          style={{
            gridArea: '4 / 2 / 3 / 4',
          }}
        >
          <Card>6</Card>
        </div>
      </div>
    </div>
  );
};

export default App;
