import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/Valid.json";
import { useAuthStateContext } from "../../providers/AuthProvider";

export const LottieCheckedInput = ({ invalid, isDirty, exists }) => {
  const authState = useAuthStateContext();
  const [isShowed, setIsShowed] = useState(false);
  const animRef = useRef(null);

  useEffect(() => {
    animRef.current.setSpeed(3);

    if (authState.isAuth && isShowed) {
      setIsShowed(false);
      animRef.current.setDirection(-1);
      return animRef.current.play();
    }

    if (isDirty) {
      console.log(`Статус: ${exists}`);
      if (invalid || exists) {
        setIsShowed(false);
        animRef.current.setDirection(-1);
      } else {
        setIsShowed(true);
        animRef.current.setDirection(1);
      }
      return animRef.current.play();
    }
    if (isShowed) {
      animRef.current.setDirection(-1);
      return animRef.current.play();
    }
  }, [invalid, isDirty, authState.isAuth]);

  const style = {
    width: "30px",
    height: "30px",
  };

  return (
    <>
      <Lottie
        autoplay={false}
        loop={false}
        animationData={animationData}
        style={style}
        lottieRef={animRef}
      />
    </>
  );
};
