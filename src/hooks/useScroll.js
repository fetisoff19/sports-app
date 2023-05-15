import {useLayoutEffect, useRef} from "react";

export default function useScroll(parentRef, childRef, callback,) {
  const observer = useRef();

  useLayoutEffect(() => {
    const options = {
      root: parentRef.current,
      rootMargin: '0px',  //установить значение для опережающей загрузки
      threshold: 0
    }
    observer.current = new IntersectionObserver(([target]) => {
      if (target.isIntersecting) {
        callback()
      }
    }, options)

    observer.current.observe(childRef.current)

    return () => observer.current.unobserve(childRef.current)
  }, [callback])
};