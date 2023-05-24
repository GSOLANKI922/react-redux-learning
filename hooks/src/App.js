import logo from "./logo.svg";
import "./App.css";
import Parent from "./page/useCallBack/Parent";
import MemoParent from "./page/useMemo/MemoParent";
import StateParent from "./page/useState/StateParent";
import UseEffectHook from "./page/useEfffects/UseEffectHook";
import UseReduceHook from "./page/useReducerHook/UseReduceHook";
import AllData from "./page/contextAPI/allData";

function App() {
  return (
    <div className="App">
      <Parent />
      <MemoParent />
      <StateParent />
      <UseEffectHook />
      <UseReduceHook />
      <AllData/>
    </div>
  );
}

export default App;
