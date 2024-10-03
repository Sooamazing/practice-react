import React, { useEffect, useState } from 'react';
import SubCount from '../features/SubCount';

const Home = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // This will run on mount
    console.log('Home component mounted');

    // This will run on unmount or before the next effect runs
    return () => {
      console.log('Home cleanup before count changes or component unmounts');
    };
  }, [count]);

  return (
    <div>
      <SubCount count={count} setCount={setCount} />
      <p>Home Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment from Home</button>
    </div>
  );
};

export default Home;