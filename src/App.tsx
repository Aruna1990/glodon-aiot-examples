import { BrowserRouter } from 'react-router-dom';
import { WebComponentDemo } from './chat-app-sdk-example/index';

function App() {
  return (
    <BrowserRouter>
      <WebComponentDemo />
    </BrowserRouter>
  );
}

export default App;
