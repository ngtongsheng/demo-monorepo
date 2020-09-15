import React, { useCallback, useEffect, useState } from 'react';
import clone from 'ramda/src/clone';
import { PhotoService } from '@demo-monorepo/service-photo';
import { Carousel } from '@demo-monorepo/carousel';
import './app.scss';

const shuffle = (array, slice = 6) => {
  const cloned = clone(array);
  let currentIndex = cloned.length;
  let temporaryValue;
  let randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    console.log(randomIndex);
    currentIndex -= 1;
    temporaryValue = cloned[currentIndex];
    cloned[currentIndex] = cloned[randomIndex];
    cloned[randomIndex] = temporaryValue;
  }

  return cloned.slice(0, slice);
};

const ProductVideo = () => {
  return (
    <iframe
      title="vimeo-player"
      src="https://player.vimeo.com/video/432428736"
      width="100%"
      height="100%"
      frameBorder="0"
    ></iframe>
  );
};

const Offices = () => {
  return (
    <div
      className="columns"
      style={{
        textAlign: 'left',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
      }}
    >
      <div className="column">
        <div>
          <img
            style={{ marginBottom: '1em' }}
            src="https://assets.website-files.com/5e8b2028eaa78519a8d80c63/5eea13a244943cc61b9200a4_image_about-us_what%E2%80%99s_our_story_1.jpg"
            alt=""
          />

          <div className="title is-6">FRANCE</div>
          <div className="subtitle is-3">
            <b>Nantes</b>
          </div>
          <p>
            Located near the beautiful Atlantic coast in western Fran ce, the
            Nantes office is our R&amp;D and production site.
          </p>
        </div>
      </div>
      <div className="column">
        <div>
          <img
            style={{ marginBottom: '1em' }}
            src="https://assets.website-files.com/5e8b2028eaa78519a8d80c63/5eea13a22cb7db4660cdc026_image_about-us_what%E2%80%99s_our_story_2.jpg"
            alt=""
          />

          <div className="title is-6">GERMANY</div>
          <div className="subtitle is-3">
            <b>Berlin</b>
          </div>
          <p>
            Our main offices for marketing and software development, at the
            heart of kaleidoscopic Kreuzberg.
          </p>
        </div>
      </div>
      <div className="column">
        <div>
          <img
            style={{ marginBottom: '1em' }}
            src="https://assets.website-files.com/5e8b2028eaa78519a8d80c63/5eea13a3d858ea4e6c1510cd_image_about-us_what%E2%80%99s_our_story_3.jpg"
            alt=""
          />

          <div className="title is-6">FRANCE</div>
          <div className="subtitle is-3">
            <b>Paris</b>
          </div>
          <p>
            The famed City of Love is home to our offices for Business
            Development and Customer Experience.
          </p>
        </div>
      </div>
    </div>
  );
};

export const App = () => {
  const [photos, setPhotos] = useState([]);

  const getPhotos = useCallback(async () => {
    const res = await PhotoService.getPhoto({ resolution: 'HD', limit: 12 });
    setPhotos(res);
  }, []);

  useEffect(() => {
    getPhotos();
  }, [getPhotos]);

  return (
    <>
      <section className="section is-full-height">
        <Carousel isKeyboard isBoxShadow={false} contents={shuffle(photos)} />
      </section>
      <section className="section is-full-height">
        <Carousel
          isBoxShadow={false}
          contents={[<ProductVideo />, <Offices />]}
        />
      </section>
      <section className="section is-full-height">
        <Carousel isGapless isBoxShadow={false} contents={shuffle(photos)} />
      </section>
      <section className="section is-full-height">
        <Carousel
          contents={shuffle(photos)}
          isNavigation={false}
          isPagination={false}
        />
      </section>
      <div className="columns is-multiline is-gapless">
        <div className="column is-relative is-6">
          <Carousel
            isGapless
            isBoxShadow={false}
            isNavigation={false}
            contents={shuffle(photos, 6)}
          />
        </div>
        <div className="column is-relative is-6">
          <Carousel
            isGapless
            isBoxShadow={false}
            isNavigation={false}
            contents={shuffle(photos, 6)}
          />
        </div>
      </div>
    </>
  );
};

export default App;
