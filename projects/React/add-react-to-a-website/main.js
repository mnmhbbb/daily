import Test from './test';

function App() {
  return (
    <div>
      <h1>app</h1>
      <Test />
    </div>
  );
}

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(<App />);
