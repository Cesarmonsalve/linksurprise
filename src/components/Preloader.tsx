'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const wordRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Animate counter from 0 to 100
    const obj = { val: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        // Split and reveal
        gsap.to(counterRef.current, {
          opacity: 0,
          scale: 1.2,
          duration: 0.4,
          ease: 'power2.in',
        });
        gsap.to(wordRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.in',
        });

        gsap.to(topRef.current, {
          yPercent: -100,
          duration: 1,
          ease: 'power4.inOut',
          delay: 0.3,
        });
        gsap.to(bottomRef.current, {
          yPercent: 100,
          duration: 1,
          ease: 'power4.inOut',
          delay: 0.3,
          onComplete: () => {
            if (preloaderRef.current) {
              preloaderRef.current.style.display = 'none';
            }
            onComplete();
          },
        });
      },
    });

    tl.to(obj, {
      val: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate: () => {
        setCount(Math.round(obj.val));
      },
    });

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div className="preloader" ref={preloaderRef}>
      <div className="preloader-top" ref={topRef}>
        <div style={{ paddingBottom: '1rem', textAlign: 'center' }}>
          <span className="preloader-counter" ref={counterRef}>
            {count}%
          </span>
        </div>
      </div>
      <div className="preloader-bottom" ref={bottomRef}>
        <div style={{ paddingTop: '1rem', textAlign: 'center' }}>
          <span className="preloader-word" ref={wordRef}>
            Cargando tu experiencia
          </span>
        </div>
      </div>
    </div>
  );
}
