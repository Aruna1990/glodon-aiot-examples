import { BrowserRouter } from 'react-router-dom';
import { WebComponentDemo } from './chat-app-sdk-example/index';

// 获取 base 路径，与 vite.config.ts 保持一致
const getBasePath = () => {
  if (import.meta.env.MODE === 'production') {
    return '/glodon-aiot-examples/';
  }
  return '/';
};

function App() {
  return (
    <BrowserRouter basename={getBasePath()}>
      <WebComponentDemo />
    </BrowserRouter>
  );
}

export default App;
