import gsap from 'gsap-bonus';

const animOut = ({ sceneRef, onStart = () => undefined, onComplete = () => undefined }) => {
  if (sceneRef.current)
    gsap.to([...sceneRef.current.children], {
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

const animIn = ({ sceneRef, onStart = () => undefined, onComplete = () => undefined }) => {
  if (sceneRef.current) {
    gsap.fromTo(
      [...sceneRef.current.children].filter((child) => !child.classList.contains('touch-indicator')),
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
