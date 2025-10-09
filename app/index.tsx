import { Platform } from 'react-native';
import MobileApp from '../src/mobile/App';
import WebApp from '../src/web/App';

const App = () => {
  
  if (Platform.OS === 'web') {
    return <WebApp />;
  }

  return <MobileApp />;
};

export default App;
