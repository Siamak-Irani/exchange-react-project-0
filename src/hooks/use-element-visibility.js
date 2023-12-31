import { useEffect, useState } from "react";

const defaultConfig = {
  visibilityThreshold: 1,
  depthLevel: 0,
};

const useVisibilityStatus = (elementRef, config = defaultConfig) => {
  // if (elementRef.current) throw new Error("Ref must refer to an element");

  const [distanceFromTop, setDistanceFromTop] = useState(
    window.innerHeight * 2
  );
  const [seen, setSeen] = useState(false);
  const [inView, setInView] = useState(false);

  const elementHeight = elementRef.current
    ? elementRef.current.scrollHeight
    : 0;

  useEffect(() => {
    const scrollHandler = () => {
      setDistanceFromTop((prev) => {
        if (elementRef.current) {
          return (
            elementRef.current.getBoundingClientRect().top +
            elementHeight * config.depthLevel
          );
        }
      });
    };
    window.addEventListener("scroll", scrollHandler);
    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  useEffect(() => {
    setSeen((prev) => {
      return !prev
        ? distanceFromTop <= window.innerHeight * config.visibilityThreshold
        : true;
    });
    if (elementRef.current) {
      setInView(
        elementRef.current.getBoundingClientRect().top - elementHeight <= 0 &&
          elementRef.current.getBoundingClientRect().bottom >= 0
      );
    }
  }, [distanceFromTop]);

  return { seen, setSeen, inView };
};

export default useVisibilityStatus;
