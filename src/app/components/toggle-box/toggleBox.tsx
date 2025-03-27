"use client";

import { MouseEventHandler, useEffect, useState } from "react";
import Button from "../button/Button";

interface togglePropsType {
  children: React.ReactNode;
  onToggle?: MouseEventHandler;
  toggle?: boolean;
  clasaNameItems?: string;
  possition?: string;
  childClass?: string;
}

interface boxPropsType {
  children?: React.ReactNode;
  childrenItems?: React.ReactNode;
  clasaNameItems?: string;
  possition?: string;
  childClass?: string;
  btnClassName?:string
}

interface boxStyle {
  left?: string;
  right?: string;
  bottom?: string;
  top?: string;
}

const Toggle = ({ children, clasaNameItems, toggle, possition, onToggle, childClass }: togglePropsType) => {
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
    <div style={styleBox} className={`${clasaNameItems} ${toggle ? "h-auto" : "h-0"} z-10 absolute w-auto overflow-auto  rounded-lg shadow-2xl`}>
      <div onClick={onToggle} className={`${toggle ? "fixed" : "hidden"}  left-0 right-0 -z-10 top-0 bottom-0`}></div>
      <div className={`${childClass} z-10 bg-white`} onClick={onToggle}>
        {children}
      </div>
    </div>
  );
};

const Box = ({children,btnClassName,childrenItems , possition , clasaNameItems ,childClass} : boxPropsType) => {

  const [open,setOpen] = useState(false)

  const onToggle = ()=>{
    setOpen(open ? false : true)
  }

  return (
    <div className="relative">
      <Button onClick={onToggle} className={`${btnClassName}`}>
        {children}
      </Button>
      <Toggle toggle={open} onToggle={onToggle} possition={possition} clasaNameItems={clasaNameItems} childClass={childClass}>
        {childrenItems}
      </Toggle>
    </div>
  );
};

export default Box;
