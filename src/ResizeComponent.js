import React, { useRef, useEffect, useContext } from "react";
import "./components.css";
import "./side.css";
import { CombinedContext } from "./App";

const ResizeComponent = ({ n }) => {
  // console.log(CombinedContext);
  const { contextAValue, contextBValue } = useContext(CombinedContext);
  let { ref1, ref2, ref3, ref4, ref5 } = contextAValue;
  let { component1, component2, component3 } = contextBValue;
  let topRef, bottomRef, leftRef, rightRef, componentRef;
  topRef = useRef(null);
  bottomRef = useRef(null);
  leftRef = useRef(null);
  rightRef = useRef(null);
  componentRef = useRef(null);

  function resizeYNegative(e, componentRef) {
    e.stopPropagation();
    console.log("resize y negative", componentRef);
    let minH = 10,
      minW = 10;
    let offsetY;
    let startY;
    let startH;
    let maxY;
    function dragMouseDown(e) {
      console.log("change y");
      if (e.button !== 0) return;
      e = e || window.event;
      e.preventDefault();
      const { clientY } = e;
      startY = componentRef.current.offsetTop;
      startH = componentRef.current.offsetHeight;
      offsetY = clientY - startY;
      maxY = startY + startH - minH;
      document.addEventListener("mouseup", closeDragElement, false);
      document.addEventListener("mousemove", elementDrag, false);
    }
    function elementDrag(e) {
      const { clientY } = e;
      let y = clientY - offsetY;
      let h = startH + startY - y;
      if (h < minH) h = minH;
      if (y > maxY) y = maxY;
      console.log("changing y top");
      componentRef.current.style.top = y + "px";
      componentRef.current.style.height = h + "px";
      componentRef.current.offsetHeight;
    }
    function closeDragElement() {
      document.removeEventListener("mouseup", closeDragElement);
      document.removeEventListener("mousemove", elementDrag);
    }

    return dragMouseDown(e);
  }

  function resizeYPositive(e, componentRef) {
    console.log("resize y positive", componentRef);
    let minH = 10,
      minW = 10;
    let offsetY;
    function dragMouseDown(e) {
      console.log("changing y bottom");
      e.stopPropagation();
      if (e.button !== 0) return;
      e = e || window.event;
      e.preventDefault();
      const { clientY } = e;
      offsetY =
        clientY -
        componentRef.current.offsetTop -
        componentRef.current.offsetHeight;

      document.addEventListener("mouseup", closeDragElement);
      document.addEventListener("mousemove", elementDrag);
    }

    function elementDrag(e) {
      const { clientY } = e;
      let y = clientY - componentRef.current.offsetTop - offsetY;
      if (y < minH) y = minH;
      componentRef.current.style.height = y + "px";
    }

    function closeDragElement() {
      document.removeEventListener("mouseup", closeDragElement);
      document.removeEventListener("mousemove", elementDrag);
    }
    return dragMouseDown(e);
  }

  function resizeXNegative(e, componentRef) {
    console.log("resize x ", componentRef);
    let offsetX;
    let startX;
    let startW;
    let maxX;
    let minW = 10;
    function dragMouseDown(e) {
      console.log("change x left");
      e.stopPropagation();
      if (e.button !== 0) return;
      e = e || window.event;
      e.preventDefault();
      const { clientX } = e;
      startX = componentRef.current.offsetLeft;
      startW = componentRef.current.offsetWidth;
      offsetX = clientX - startX;
      maxX = startX + startW - minW;

      document.addEventListener("mouseup", closeDragElement);
      document.addEventListener("mousemove", elementDrag);
    }

    function elementDrag(e) {
      console.log("changing x left");
      const { clientX } = e;
      let x = clientX - offsetX;
      let w = startW + startX - x;
      if (w < minW) w = minW;
      if (x > maxX) x = maxX;
      componentRef.current.style.left = x + "px";
      componentRef.current.style.width = w + "px";
    }

    function closeDragElement() {
      document.removeEventListener("mouseup", closeDragElement);
      document.removeEventListener("mousemove", elementDrag);
    }
    return dragMouseDown(e);
  }

  function resizeXPositive(e, componentRef) {
    e.stopPropagation();
    let offsetX,
      minW = 10;
    function dragMouseDown(e) {
      if (e.button !== 0) return;
      e = e || window.event;
      e.preventDefault();
      const { clientX } = e;
      offsetX =
        clientX -
        componentRef.current.offsetLeft -
        componentRef.current.offsetWidth;
      document.addEventListener("mouseup", closeDragElement);
      document.addEventListener("mousemove", elementDrag);
    }

    function elementDrag(e) {
      const { clientX } = e;
      let x = clientX - componentRef.current.offsetLeft - offsetX;
      if (x < minW) x = minW;
      componentRef.current.style.width = x + "px";
    }

    function closeDragElement() {
      document.removeEventListener("mouseup", closeDragElement);
      document.removeEventListener("mousemove", elementDrag);
    }
    return dragMouseDown(e);
  }

  useEffect(() => {
    if (topRef.current) {
      topRef.current.addEventListener("mousedown", (e) => {
        resizeYNegative(e, componentRef);
      });
    }
    if (bottomRef.current) {
      bottomRef.current.addEventListener("mousedown", (e) => {
        resizeYPositive(e, componentRef);
      });
    }
    if (leftRef.current) {
      leftRef.current.addEventListener("mousedown", (e) => {
        resizeXNegative(e, componentRef);
      });
    }
    if (rightRef.current) {
      rightRef.current.addEventListener("mousedown", (e) => {
        resizeXPositive(e, componentRef);
      });
    }
    // if (ref1.current) {
    //   ref1.current.addEventListener();
    // }

    return () => {
      if (topRef.current) {
        topRef.current.removeEventListener("mousedown", resizeYNegative);
      }
      if (bottomRef.current) {
        bottomRef.current.removeEventListener("mousedown", resizeYPositive);
      }
      if (leftRef.current) {
        leftRef.current.removeEventListener("mousedown", resizeXNegative);
      }
      if (rightRef.current) {
        rightRef.current.removeEventListener("mousedown", resizeXPositive);
      }
    };
  }, []);

  return (
    <div
      id={`element${n}`}
      ref={(ele) => {
        componentRef.current = ele;
        // if (n == 1) component1.current = ele;
        // if (n == 2) component2.current = ele;
        // if (n == 3) component3.current = ele;
      }}
    >
      <div
        className="top"
        ref={(ele) => {
          topRef.current = ele;
          // if (n == 3) ref5.current = ele;
        }}
      ></div>
      <div
        className="bottom"
        ref={(ele) => {
          bottomRef.current = ele;
          // if (n == 1) ref3.current = ele;
          // if (n == 2) ref4.current = ele;
        }}
      ></div>
      <div
        className="left"
        ref={(ele) => {
          leftRef.current = ele;
          // if (n == 2) ref2.current = ele;
        }}
      ></div>
      <div
        className="right"
        ref={(ele) => {
          rightRef.current = ele;
          // if (n == 1) ref1.current = ele;
        }}
      ></div>
    </div>
  );
};

export default ResizeComponent;
