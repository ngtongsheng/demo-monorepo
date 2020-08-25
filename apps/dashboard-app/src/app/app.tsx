import React from 'react';
import { Card } from '@demo-monorepo/ui';
import Folders from '../app/folders/folders';
import CalendarChart from '../app/calendar-chart/calendar-chart';
import InteractiveAnimation from '../app/interactive-animation/interactive-animation';
import DraggableList from '../app/draggable-list/draggable-list';
import CoronaCases from '../app/corona-cases/corona-cases';
import SimpleChat from '../app/simple-chat/simple-chat';
import SimpleRating from '../app/simple-rating/simple-rating';
import './app.scss';

export const App = () => {
  return (
    <div className="app section container">
      <div
        className="grid"
        style={{
          display: 'grid',
          gridTemplateRows: 'repeat(6, 20em)',
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
            <InteractiveAnimation />
          </Card>
        </div>
        <div
          style={{
            gridArea: '3 / 1 / 5 / 2',
          }}
        >
          <Card>
            <DraggableList />
          </Card>
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
        <div
          style={{
            gridArea: '5 / 2 / 3 / 4',
          }}
        >
          <Card>
            <CoronaCases />
          </Card>
        </div>
        <div
          style={{
            gridArea: '5 / 1 / 7 / 2',
          }}
        >
          <Card>
            <SimpleChat />
          </Card>
        </div>
        <div
          style={{
            gridArea: '5 / 2 / 5 / 2',
          }}
        >
          <Card>
            <SimpleRating />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default App;
