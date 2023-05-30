import './App.css';
import Counter from './components/Counter';

function App() {

  return (
    <div className="App">
      <Counter count={1}/>
      <Counter count={0}/>
    </div>
  );
}

export default App;
