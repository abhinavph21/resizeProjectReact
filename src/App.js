import "./styles.css";
import "./components.css";
import ResizeComponent from "./ResizeComponent.js";
import { createContext, useRef } from "react";

export const CombinedContext = createContext({
  contextAValue: {},
  contextBValue: {},
});

const MyCombinedProvider = (props) => {
  const combinedValue = {
    contextAValue: {
      ref1: useRef(null),
      ref2: useRef(null),
      ref3: useRef(null),
      ref4: useRef(null),
      ref5: useRef(null),
    },
    contextBValue: {
      component1: useRef(null),
      component2: useRef(null),
      component3: useRef(null),
    },
  };

  return (
    <CombinedContext.Provider value={combinedValue}>
      {props.children}
    </CombinedContext.Provider>
  );
};

export default function App() {
  let arr = [1, 2, 3];
  // function getComponentRef(ref) {
  //   console.log(ref);
  // }
  // function getSideRef(ref1, ref2) {
  //   console.log(ref1, ref2);
  // }
  return (
    <div className="App">
      <MyCombinedProvider>
        <div id="parentElement">
          {arr.map((ele) => {
            return (
              <ResizeComponent
                key={ele}
                n={ele}
                // passComponentRef={getComponentRef}
                // passSideRef={getSideRef}
              />
            );
          })}
        </div>
      </MyCombinedProvider>
    </div>
  );
}
