import React, { useEffect } from 'react';

const SubCount = ({ count, setCount }) => {
  useEffect(() => {
    // This will run on mount
    console.log('SubCount component mounted');

    // This will run on unmount or before the next effect runs
    return () => {
      console.log('SubCount cleanup before count changes or component unmounts');
    };
  }, [count]);

  return (
    <div>
      <p>SubCount: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment from SubCount</button>
    </div>
  );
};

export default SubCount;