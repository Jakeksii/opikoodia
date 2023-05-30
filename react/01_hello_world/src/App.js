import './App.css';
import HelloWorld from './components/HelloWorld.tsx';

function App() {
  return (
    <div className="App">
      <h2>Hello World</h2>
      <HelloWorld/>
      <HelloWorld name="Jaakko"/>
    </div>
  );
}

export default App;
