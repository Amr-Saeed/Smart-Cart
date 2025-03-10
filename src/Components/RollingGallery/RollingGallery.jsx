import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimation,
  useTransform,
} from "framer-motion";
import "./RollingGallery.css";

// Define getScreenSize before using it
const getScreenSize = () => {
  const width = window.innerWidth;
  if (width < 640) return "xs"; // New category for screens smaller than 640px
  if (width === 768) return "md-768"; // Special case for 768px
  if (width <= 640) return "sm";
  if (width <= 1024) return "md";
  return "lg";
};

const RollingGallery = ({
  autoplay = false,
  pauseOnHover = false,
  images = [],
}) => {
  images = images.length > 0 ? images : [];
  const [screenSize, setScreenSize] = useState(getScreenSize());

  const cylinderWidth = {
    xs: 1100, // Keeping it consistent for small screens

    sm: 1100,
    "md-768": 1300, // Specific width for 768px screens

    md: 1500,
    lg: 1800,
  }[screenSize];

  const faceCount = images.length;
  const faceWidth =
    screenSize === "md-768"
      ? 162.25 // Exact 16.25px for 768px screens
      : screenSize === "xs"
      ? 120.25
      : screenSize === "md"
      ? 230.25 // Fixed width for medium screens
      : (cylinderWidth / faceCount) * 2; // Default dynamic width
  // Increased width for items
  const dragFactor = 0.05;
  const radius = cylinderWidth / (2 * Math.PI);

  const rotation = useMotionValue(0);
  const controls = useAnimation();
  const autoplayRef = useRef();

  const handleDrag = (_, info) => {
    rotation.set(rotation.get() + info.offset.x * dragFactor);
  };

  const handleDragEnd = (_, info) => {
    controls.start({
      rotateY: rotation.get() + info.velocity.x * dragFactor,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 20,
        mass: 0.1,
        ease: "easeOut",
      },
    });
  };

  const transform = useTransform(rotation, (value) => {
    return `rotate3d(0, 1, 0, ${value}deg)`;
  });

  // Autoplay effect with adjusted timing
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        controls.start({
          rotateY: rotation.get() - 360 / faceCount, // Rotating smoothly
          transition: { duration: 2, ease: "easeInOut" }, // Smooth transition
        });
      }, 3000); // Adjust interval time for smooth effect

      return () => clearInterval(autoplayRef.current);
    }
  }, [autoplay, rotation, controls, faceCount]);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Pause on hover with smooth transition
  const handleMouseEnter = () => {
    if (autoplay && pauseOnHover) {
      clearInterval(autoplayRef.current);
      controls.stop(); // Stop the animation smoothly
    }
  };

  const handleMouseLeave = () => {
    if (autoplay && pauseOnHover) {
      controls.start({
        rotateY: rotation.get() - 360 / faceCount,
        transition: { duration: 2, ease: "linear" },
      });
      rotation.set(rotation.get() - 360 / faceCount);

      autoplayRef.current = setInterval(() => {
        controls.start({
          rotateY: rotation.get() - 360 / faceCount,
          transition: { duration: 2, ease: "linear" },
        });
        rotation.set(rotation.get() - 360 / faceCount);
      }, 2000);
    }
  };

  const style = {
    paddingLeft: "30px",
    paddingRight: "30px",
    placeItems: "center",
  };
  return (
    <div style={style} className="section slider ">
      <div className="gallery-container">
        <div className="gallery-gradient gallery-gradient-left"></div>
        <div className="gallery-gradient gallery-gradient-right"></div>
        <div className="gallery-content">
          <motion.div
            drag="x"
            className="gallery-track"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: transform,
              rotateY: rotation,
              width: cylinderWidth,
              transformStyle: "preserve-3d",
            }}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
            animate={controls}
          >
            {images.map((url, i) => (
              <div
                key={i}
                className="gallery-item"
                style={{
                  width: `${faceWidth}px`,
                  transform: `rotateY(${
                    i * (360 / faceCount)
                  }deg) translateZ(${radius}px) `,
                }}
              >
                <img
                  loading="lazy"
                  src={url}
                  alt="gallery"
                  className="gallery-img"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RollingGallery;
