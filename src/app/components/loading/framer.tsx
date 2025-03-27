"use client";

import { motion } from "framer-motion";

interface propsType {
  width: string;
  height: string;
  opacity?:string,
  duration?:number
}
const FramerMotion = ({ width, height ,opacity = '9' ,duration = 1}: propsType) => {
  return (
    <>
      <motion.div
        style={{
            width:width,
            height:height,
            backgroundColor : `rgba(200,200,200,0.${opacity})`
        }}
        className=" rounded-lg"
        animate={{ backgroundColor:'rgba(230,230,230,1)'}}
        transition={{
          duration:duration,
          repeatType:"reverse",
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </>
  );
};

export default FramerMotion;
