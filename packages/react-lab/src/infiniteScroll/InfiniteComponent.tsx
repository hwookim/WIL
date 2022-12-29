import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';

const InfiniteComponent = (): JSX.Element => {
  const interSectRef = useRef<HTMLDivElement>(null);
  const [arr, setArr] = useState<number[]>([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  const handleObserver: IntersectionObserverCallback = useCallback(
    async (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting) {
        console.log('add');
        const add = arr.map((v) => v + 10).slice(-10);
        setArr([...arr, ...add]);
      }
    },
    [arr],
  );

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    });
    if (interSectRef.current) observer.observe(interSectRef.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <Container>
      {arr?.map((v) => (
        <Item key={v}>{v}</Item>
      ))}
      <div ref={interSectRef}></div>
    </Container>
  );
};

const Container = styled.div`
  min-width: 100vw;
  min-height: 100vh;
`;

const Item = styled.div`
  width: 100%;
  height: 20vh;
  border: 1px solid black;
`;

export default InfiniteComponent;
