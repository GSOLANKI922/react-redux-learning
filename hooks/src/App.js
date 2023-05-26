import logo from "./logo.svg";
import "./App.css";
import Parent from "./page/useCallBack/Parent";
import MemoParent from "./page/useMemo/MemoParent";
import StateParent from "./page/useState/StateParent";
import UseEffectHook from "./page/useEfffects/UseEffectHook";
import UseReduceHook from "./page/useReducerHook/UseReduceHook";
import AllData from "./page/contextAPI/allData";
import RedCounter from "./page/HOC/RedCounter";
// import Counter from "./page/HOC/Counter";
import GreenCOunter from "./page/HOC/GreenCOunter";
import Call from "./page/callApplyBind/Call";
import Currying from "./page/curryingFunction/Currying";
import ToDos from "./page/ToDoList/ToDos";
import Counter from "./page/redux/Counter";
import Factorial from "./page/factorial/Factorial";
import FibonakiSerese from "./page/FibonakiSerise/FibonakiSerese";

function App() {
  return (
    <div className="App">
    <h1> todo</h1>
   
    <FibonakiSerese/>
    </div>
  );
}

export default App;

// <Parent />
// <MemoParent />
// <StateParent />
// <UseEffectHook />
// <UseReduceHook />
// <AllData />
// <RedCounter cmp={Counter} />
// <GreenCOunter cmp={Counter} />
// <Call />
// <Currying />
// <ToDos />
// <Counter />
// <Factorial/>
