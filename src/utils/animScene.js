import gsap from 'gsap-bonus';

const animOut = ({ sceneRef, el, onStart = () => undefined, onComplete = () => undefined }) => {
  if (el || sceneRef.current)
    gsap.to(el || [...sceneRef.current.children], {
      opacity: 0,
      yPercent: 4,
      duration: 2.4,
      delay: 0.6,
      stagger: { each: 0.4 },
      ease: 'Power4.InOut',
      onStart,
      onComplete,
    });
};

const animIn = ({ sceneRef, el, onStart = () => undefined, onComplete = () => undefined }) => {
  if (el || sceneRef.current) {
    gsap.fromTo(
      el || [...sceneRef.current.children].filter((child) => !child.classList.contains('touch-indicator')),
      { opacity: 0, yPercent: 4 },
      {
        opacity: 1,
        yPercent: 0,
        duration: 2.4,
        delay: 0.6,
        stagger: { each: 0.4 },
        ease: 'Power4.InOut',
        onStart,
        onComplete,
      }
    );
  }
};

export { animOut, animIn };
