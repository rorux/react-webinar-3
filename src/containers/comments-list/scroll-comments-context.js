import React, { useCallback, useEffect, useRef } from 'react';

export const ScrollCommentsContext = React.createContext();

const ScrollCommentsContextProvider = props => {
  const commentRef = useRef();
  const urlParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    if (urlParams.has('comment'))
      commentRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
      });
  }, [urlParams, commentRef]);

  const isActiveComment = useCallback(id => urlParams.get('comment') === id, [urlParams]);

  return (
    <ScrollCommentsContext.Provider
      value={{
        commentRef,
        isActiveComment,
      }}
    >
      {props.children}
    </ScrollCommentsContext.Provider>
  );
};

export default ScrollCommentsContextProvider;
