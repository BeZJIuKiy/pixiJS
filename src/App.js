import { Stage } from '@inlet/react-pixi';
import './App.css';
import { Pixi } from './components/Pixi/Pixi';

function App() {
  return (
    <div className="App">
      {/* <Stage width="500" height="500"> */}
        <Pixi />
      {/* </Stage> */}
    </div>
  );
}

export default App;
