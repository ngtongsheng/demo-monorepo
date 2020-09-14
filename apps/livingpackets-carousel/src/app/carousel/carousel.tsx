import React, {
  useRef,
  useMemo,
  useEffect,
  useState,
  useCallback,
} from 'react';

import clamp from 'ramda/src/clamp';
import NavigationButton from '../navigation-button/navigation-button';
import PageIndicator from '../page-indicator/page-indicator';
import { useSprings, animated, interpolate } from 'react-spring';
import { useGesture } from 'react-use-gesture';
import { PhotoService } from '@demo-monorepo/service-photo';
import { useKeyDown } from '@demo-monorepo/hooks';

import './carousel.scss';

interface CarouselAnimationProp {
  x?: number;
  rotateY?: number;
  scale?: number;
  display: string;
}

function Carousel() {
  const index = useRef(0);
  const [page, setPage] = useState(index.current);
  const [photos, setPhotos] = useState([]);

  const [props, set] = useSprings(
    photos.length,
    (i: number): CarouselAnimationProp => ({
      x: i * window.innerWidth,
      rotateY: 0,
      scale: 1,
      display: 'block',
    })
  );

  const slide = useCallback(() => {
    setPage(index.current);

    set(
      // @ts-ignore
      (i: number): CarouselAnimationProp => {
        const x = (i - index.current) * window.innerWidth;

        if (i < index.current - 1 || i > index.current + 1) {
          return { x, display: 'none' };
        }

        return { x, rotateY: 0, scale: 1, display: 'block' };
      }
    );
  }, [set]);

  const clampWithinPagination = useMemo(() => clamp(0, photos.length - 1), [
    photos,
  ]);

  const getPhotos = useCallback(async () => {
    const res = await PhotoService.getPhoto();
    setPhotos(res.slice(0, 7));
  }, []);

  const goPrev = useCallback(async () => {
    index.current = clampWithinPagination(index.current - 1);
    slide();
  }, [clampWithinPagination, slide]);

  const goNext = useCallback(async () => {
    index.current = clampWithinPagination(index.current + 1);
    slide();
  }, [clampWithinPagination, slide]);

  const gotoPage = useCallback(
    async (i) => {
      index.current = i;
      slide();
    },
    [slide]
  );

  const bind = useGesture(
    ({ down, delta: [xDelta], direction: [xDir], distance, cancel }) => {
      const dir = xDir > 0 ? -1 : 1;

      if (down && distance > window.innerWidth / 5) {
        index.current = clampWithinPagination(index.current + dir);
        setPage(index.current);
        cancel();
      }

      set(
        // @ts-ignore
        (i: number): CarouselAnimationProp => {
          const x =
            (i - index.current) * window.innerWidth + (down ? xDelta : 0);

          if (i < index.current - 1 || i > index.current + 1) {
            return { x, display: 'none' };
          }

          const scale = down ? 1 - distance / window.innerWidth / 4 : 1;
          const rotateY = down ? (xDelta / 15) * -1 : 0;

          return { x, scale, rotateY, display: 'block' };
        }
      );
    }
  );

  useEffect(() => {
    getPhotos();
  }, [getPhotos]);

  useKeyDown(['ArrowLeft'], () => {
    goPrev();
  });

  useKeyDown(['ArrowRight'], () => {
    goNext();
  });

  return (
    <div className="carousel">
      {!!photos.length && (
        <>
          <NavigationButton color="light" direction="left" onClick={goPrev} />
          <NavigationButton color="light" direction="right" onClick={goNext} />
          {props.map(({ x, display, scale, rotateY }, i) => (
            <animated.div
              {...bind()}
              className="carousel-draggable"
              key={i}
              style={{
                display,
                transform: interpolate([x], (x) => `translate3d(${x}px,0,0)`),
              }}
            >
              <animated.div
                className="carousel-image"
                style={{
                  transform: interpolate(
                    [scale, rotateY],
                    (scale, rotateY) =>
                      `perspective(1400px) rotateY(${rotateY}deg) scale(${scale}) `
                  ),
                  backgroundImage: `url(${photos[i].url})`,
                }}
              />
            </animated.div>
          ))}
          <div className="carousel-indicators">
            {photos.map((photo, i) => (
              <PageIndicator
                key={i}
                onClick={() => gotoPage(i)}
                isActive={i === page}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Carousel;
