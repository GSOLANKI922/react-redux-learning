import logo from "./logo.svg";
import "./App.css";
import Parent from "./page/useCallBack/Parent";
import MemoParent from "./page/useMemo/MemoParent";
import StateParent from "./page/useState/StateParent";
import UseEffectHook from "./page/useEfffects/UseEffectHook";

function App() {
  return (
    <div className="App">
      <Parent />
      <MemoParent/>
      <StateParent/>
      <UseEffectHook/>
    </div>
  );
}

export default App;
