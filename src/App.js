import React from "react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import StepperComponent from "./components/stepperComponent";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <StepperComponent />
      </div>
    </Provider>
  );
}

export default App;
