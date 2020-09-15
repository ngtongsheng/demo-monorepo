import React, {
  useRef,
  useMemo,
  useState,
  useCallback,
  FunctionComponent,
} from 'react';
import classNames from 'classnames';
import clamp from 'ramda/src/clamp';
import NavigationButtons from './navigation-buttons/navigation-buttons';
import PageIndicators from './page-indicators/page-indicators';
import { useSprings, animated, interpolate } from 'react-spring';
import { useGesture } from 'react-use-gesture';

import './carousel.scss';

export interface CarouselStyleProps {
  isBoxShadow?: boolean;
}

export interface CarouselProps extends CarouselStyleProps {
  contents: (JSX.Element | Element | HTMLElement | string)[];
  isPagination?: boolean;
  isNavigation?: boolean;
  isGapless?: boolean;
  isKeyboard?: boolean;
}

interface CarouselAnimationProp {
  x?: number;
  rotateY?: number;
  scale?: number;
  display: string;
}

export const Carousel: FunctionComponent<CarouselProps> = ({
  contents,
  isPagination = true,
  isNavigation = true,
  isBoxShadow = true,
  isGapless = false,
  isKeyboard = false,
}: CarouselProps) => {
  const index = useRef(0);
  const [page, setPage] = useState(index.current);
  const isContents = !!contents.length;

  const [props, set] = useSprings(
    contents.length,
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

  const clampRange = useMemo(() => clamp(0, contents.length - 1), [contents]);

  const gotoPage = useCallback(
    (i) => {
      index.current = clampRange(i);
      slide();
    },
    [clampRange, slide]
  );

  const goPrev = useCallback(() => {
    gotoPage(index.current - 1);
  }, [gotoPage]);

  const goNext = useCallback(() => {
    gotoPage(index.current + 1);
  }, [gotoPage]);

  const bind = useGesture(
    ({ down, delta: [xDelta], direction: [xDir], distance, cancel }) => {
      const dir = xDir > 0 ? -1 : 1;

      if (down && distance > window.innerWidth / 5) {
        index.current = clampRange(index.current + dir);
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

  return (
    <div className="carousel">
      {isContents && isNavigation && (
        <NavigationButtons
          isKeyboard={isKeyboard}
          isBoxShadow={isBoxShadow}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
      {props.map(({ x, display, scale, rotateY }, i) => (
        <animated.div
          {...bind()}
          className={classNames('carousel-draggable', {
            'is-gapless': isGapless,
          })}
          key={i}
          style={{
            display,
            transform: interpolate([x], (x) => `translate3d(${x}px,0,0)`),
          }}
        >
          <animated.div
            className={classNames('carousel-image', {
              'is-box-shadow': isBoxShadow,
            })}
            style={{
              transform: interpolate(
                [scale, rotateY],
                (scale, rotateY) =>
                  `perspective(1400px) rotateY(${rotateY}deg) scale(${scale}) `
              ),
              backgroundImage:
                typeof contents[i] === 'string' && `url(${contents[i]})`,
            }}
          >
            {typeof contents[i] !== 'string' && contents[i]}
          </animated.div>
        </animated.div>
      ))}
      {isContents && isPagination && (
        <PageIndicators
          length={contents.length}
          currentPage={page}
          onClick={gotoPage}
        />
      )}
    </div>
  );
};

export default Carousel;
