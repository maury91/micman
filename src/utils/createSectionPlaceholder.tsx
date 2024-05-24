import React, { useEffect } from 'react';

export const createSectionPlaceholder = (name: string) => {
  return () => {
    const elementRef = React.createRef<HTMLDivElement>();
    useEffect(() => {
      return window.onRenderSection({
        name,
        node: elementRef.current!
      });
    }, [elementRef]);
    return <div ref={elementRef}/>
  }
}