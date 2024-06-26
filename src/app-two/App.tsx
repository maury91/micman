import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useCounterContext } from '../utils/CounterContext.tsx';
import { createSectionPlaceholder } from '../utils/createSectionPlaceholder.tsx';

const AdditionalLogo = createSectionPlaceholder('AdditionalLogo');

function App() {
  const { count, setCount } = useCounterContext();

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Hello I'm App B</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <button onClick={() => window.navigate('/appA')}>
          Go to App one
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <AdditionalLogo />
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
