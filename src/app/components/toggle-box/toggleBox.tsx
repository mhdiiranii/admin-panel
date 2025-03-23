"use client";

import { MouseEventHandler, useEffect, useState } from "react";

interface propsType {
  children: React.ReactNode;
  onToggle? : MouseEventHandler,
  toggle?: boolean;
  clasName?: string;
  possition?: string;
}

interface boxStyle {
  left?: string;
  right?: string;
  bottom?: string;
  top?: string;
}

const Box = ({ children, clasName, toggle, possition,onToggle }: propsType) => {
  const [styleBox, setStyleBox] = useState<boxStyle>();

  useEffect(() => {
    switch (possition) {
      case "bottom":
        setStyleBox({
          top: "100%",
        });
        break;
      case "bottom-left":
        setStyleBox({
          top: "100%",
          right: "50%",
        });
        break;
      case "bottom-right":
        setStyleBox({
          top: "100%",
          left: "50%",
        });
        break;
      case "right":
        setStyleBox({
          left: "100%",
        });
        break;
      case "left":
        setStyleBox({
          right: "100%",
        });
        break;
      case "top":
        setStyleBox({
          bottom: "100%",
        });
        break;
      case "top-right":
        setStyleBox({
          bottom: "100%",
          left: "50%",
        });
        break;
      case "top-left":
        setStyleBox({
          bottom: "100%",
          right: "50%",
        });
        break;
      default:
        setStyleBox({
          top: "100%",
        });
        break;
    }
  }, [possition]);

  return (
    <div style={styleBox} className={`${clasName} ${toggle ? "h-auto" : "h-0"} absolute w-auto overflow-auto  rounded-lg shadow-2xl`}>
      <div onClick={onToggle} className={`${ toggle ? 'fixed' : 'hidden' }  left-0 right-0 z-0 top-0 bottom-0`}></div>
      <div className="z-10  bg-white" onClick={onToggle}>{children}</div>
    </div>
  );
};

export default Box;
