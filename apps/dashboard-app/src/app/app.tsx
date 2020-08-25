import React from 'react';
import { Card, Columns, Column, Thumb } from '@demo-monorepo/ui';
import Folders from '../app/folders/folders';
import CalendarChart from '../app/calendar-chart/calendar-chart';
import InteractiveAnimation from '../app/interactive-animation/interactive-animation';
import DraggableList from '../app/draggable-list/draggable-list';
import CoronaCases from '../app/corona-cases/corona-cases';
import SimpleChat from '../app/simple-chat/simple-chat';
import SimpleRating from '../app/simple-rating/simple-rating';
import './app.scss';
import FormValidation from './form-validation/form-validation';

export const App = () => {
  return (
    <div className="app section container">
      <Columns isVcentered>
        <Column isNarrow>
          <Thumb isMedium src="/assets/me.jpg" />
        </Column>
        <Column>
          <div className="title is-4">Tong Sheng</div>
          <div className="subtitle is-6">
            Principal front end engineer / Front end lead @ Cheetah Digital
            <p>
              <a
                rel="noreferrer"
                target="_blank"
                href="mailto:ngtongsheng@gmail.com"
              >
                ngtongsheng@gmail.com
              </a>
            </p>
          </div>
        </Column>
        <Column isNarrow>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://www.linkedin.com/in/ngtongsheng/"
          >
            <img width="50" src="/assets/linkedin.png" alt="Linkedin" />
          </a>
        </Column>
        <Column isNarrow>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://leetcode.com/tong_sheng/"
          >
            <img
              style={{ transform: 'translateY(5px)' }}
              width="60"
              src="/assets/leetcode.png"
              alt="Leetcode"
            />
          </a>
        </Column>
        <Column isNarrow>
          <a
            rel="noreferrer"
            target="_blank"
            href="https://drive.google.com/file/d/1QrPyAj2BNZnlPlq0otyoWBHeXGMwvDlS/view?usp=sharing"
          >
            <img
              style={{ transform: 'translateY(0px)', height: '55px' }}
              src="/assets/resume.png"
              alt="Resume"
            />
          </a>
        </Column>
      </Columns>
      <br />
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
        <div
          style={{
            gridArea: '6 / 2 / 6 / 3',
          }}
        >
          <Card>
            <FormValidation />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default App;
