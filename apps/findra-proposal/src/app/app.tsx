import React from 'react';
import { Columns, Column, Card } from '@demo-monorepo/ui';
import { Carousel } from '@demo-monorepo/carousel';
import './app.scss';

export const App = () => {
  return (
    <section className="section container">
      <Columns>
        <Column>
          <img
            width="300"
            src="https://www.findrajobs.com/images/logo.svg"
            alt=""
          />
        </Column>
      </Columns>
      <Columns>
        <Column>
          <div className="title is-2">
            <b>Scope of service</b>
          </div>
          <p>Things we thing can be helpful to your business</p>
        </Column>
      </Columns>
      <Columns>
        <Column>
          <Card isRounded className="ux">
            <div className="title is-3" style={{ color: '#4f57a5' }}>
              <b>User experience</b>
            </div>
            <div className="content">
              <p>
                Focuses on the visible parts of your software, that the end user
                interacts with
              </p>
              <ul>
                <li>User interface best practice</li>
                <li>Usability test</li>
                <li>Design consistency audit</li>
                <li>Product experience validation</li>
                <li>User experience sharing</li>
              </ul>
            </div>
          </Card>
        </Column>
        <Column>
          <Card isRounded className="ui">
            <div className="title is-3" style={{ color: '#f4804d' }}>
              <b>Front end</b>
            </div>
            <div className="content">
              <p>Focuses on the development team excellence and scalability</p>
              <ul>
                <li>Architecture review</li>
                <li>Front end best practice</li>
                <li>Mobile readiness analysis</li>
                <li>Automation recommendation</li>
              </ul>
            </div>
          </Card>
        </Column>
        <Column>
          <Card isRounded className="qa">
            <div className="title is-3">
              <b>Quality</b>
            </div>
            <div className="content">
              <p>Focuses on making sure your product is ready to release</p>
              <ul>
                <li>Bug report</li>
                <li>Performance analysis</li>
                <li>Accesibility analysis</li>
                <li>Basic security audit</li>
              </ul>
            </div>
          </Card>
        </Column>
      </Columns>

      <Columns>
        <Column>
          <div className="content">
            <p>What we have discovered so far?</p>
          </div>
        </Column>
      </Columns>
      <Columns>
        <Column>
          <Card isRounded className="ux">
            <Columns isVcentered>
              <Column isNarrow>
                <div className="title is-1" style={{ color: '#4f57a5' }}>
                  <b>8</b>
                </div>
              </Column>
              <Column>
                <div className="title is-5">Usability issues</div>
              </Column>
            </Columns>
          </Card>
        </Column>
        <Column>
          <Card isRounded className="ui">
            <Columns isVcentered>
              <Column isNarrow>
                <div className="title is-1" style={{ color: '#f4804d' }}>
                  <b>6</b>
                </div>
              </Column>
              <Column>
                <div className="title is-5">Potential improvements</div>
              </Column>
            </Columns>
          </Card>
        </Column>
        <Column>
          <Card isRounded className="qa">
            <Columns isVcentered>
              <Column isNarrow>
                <div className="title is-1" style={{ color: '#f4804d' }}>
                  <b>12</b>
                </div>
              </Column>
              <Column>
                <div className="title is-5">Bugs</div>
              </Column>
            </Columns>
          </Card>
        </Column>
      </Columns>
      <div style={{ position: 'relative', height: '700px' }}>
        <Carousel
          isKeyboard={false}
          isGapless
          isPagination={false}
          contents={[
            'https://factoryfour.s3.eu-central-1.amazonaws.com/issue3.png',
            'https://factoryfour.s3.eu-central-1.amazonaws.com/issue4.png',
            'https://factoryfour.s3.eu-central-1.amazonaws.com/issue2.png',
          ]}
        />
      </div>
    </section>
  );
};

export default App;
