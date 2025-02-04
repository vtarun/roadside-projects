import React, {useState, useEffect} from 'react';
import './ProgressBar.css';

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if(prev === 99){
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      })
    }, 300);

    return () => {
      clearInterval(timer);
    } 
  }, []);

  return (
    <div className="container">
      <h1>Progress bar example</h1>
      <div className="progress-container">
        <div className="progress-bar" style={{width: `${progress}%`}}></div>
        <div className="progress-text" style={{color: progress > 49 ? 'green':'black'}}>{progress}%</div>
      </div>
    </div>
  )
}

export default ProgressBar
