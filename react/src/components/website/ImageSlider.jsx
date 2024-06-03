// import { useRef } from 'react';
// import { useGesture } from 'react-use-gesture';
// import { useSprings, animated } from 'react-spring';

// const ImageSlider = ({ images }) => {
//   const containerRef = useRef(null);

//   const [springs, set] = useSprings(images.length, (index) => ({
//     x: index * containerRef.current.clientWidth,
//     scale: 1,
//     display: 'block',
//   }));

//   const bind = useGesture({
//     onDrag: ({ down, movement: [x], direction: [dirX], distance }) => {
//       const index = Math.round(
//         (containerRef.current.scrollLeft +
//           (dirX > 0 ? -x : x) * (down ? 1 : 3)) /
//           containerRef.current.clientWidth
//       );
//       set((i) => {
//         if (index !== i) {
//           const isActive = index === i || (down && distance < 10);
//           return {
//             x: (isActive ? 0 : i - index) * containerRef.current.clientWidth,
//             scale: isActive ? 1 : 0.85,
//             display: 'block',
//             immediate: down,
//           };
//         }
//       });
//     },
//   });

//   return (
//     <div className="relative w-full h-64 overflow-x-hidden" ref={containerRef}>
//       {springs.map(({ x, display, scale }, index) => (
//         <animated.div
//           key={index}
//           className="absolute w-full h-full"
//           style={{
//             display,
//             transform: x.interpolate((value) => `translate3d(${value}px, 0, 0)`),
//           }}
//           {...bind()}
//         >
//           <animated.img
//             className="object-cover w-full h-full"
//             style={{ transform: scale.interpolate((value) => `scale(${value})`) }}
//             src={images[index]}
//             alt={`Image ${index}`}
//           />
//         </animated.div>
//       ))}
//     </div>
//   );
// };