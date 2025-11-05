import { useEffect, useState } from 'react';

const FloatingCubes = () => {
  const [cubes, setCubes] = useState([]);

  useEffect(() => {
    const createCube = () => {
      const cube = {
        id: Math.random().toString(36).substring(2, 11),
        left: `${Math.random() * 100}%`,
        size: `${50 + Math.random() * 100}px`,
        animationDuration: `${30 + Math.random() * 30}s`,
        transform: `rotate(${Math.random() * 360}deg)`
      };

      setCubes((prevCubes) => {
        const newCubes = [...prevCubes, cube];
        return newCubes.length > 6 ? newCubes.slice(1) : newCubes;
      });

      setTimeout(() => {
        setCubes((prevCubes) => prevCubes.filter(c => c.id !== cube.id));
      }, 30000);
    };

    for (let i = 0; i < 1; i++) {
      createCube();
    }

    const interval = setInterval(createCube, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none">
      {cubes.map(cube => (
        <div
          key={cube.id}
          className="cube"
          style={{
            left: cube.left,
            width: cube.size,
            height: cube.size,
            animationDuration: cube.animationDuration,
            transform: cube.transform
          }}
        />
      ))}
      <style jsx>{`
        .cube {
          position: absolute;
          bottom: -100px;
          background-color: rgba(255, 255, 255, 0.3);
          animation: floatUp 30s linear infinite;
          border-radius: 10px;
        }

        @keyframes floatUp {
          0% {
            transform: translateY(0) rotate(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          90% {
            opacity: 0;
          }
          100% {
            transform: translateY(-200vh) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default FloatingCubes;
