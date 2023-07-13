import "./App.css";
import { AppRouter } from "./Router";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <div className="font-referi">
        <AppRouter />
      </div>
    </RecoilRoot>
  );
}

export default App;
