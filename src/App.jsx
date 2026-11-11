import { useEffect } from 'react';
import { ScrollRestoration } from 'react-router-dom';
import './App.css';
import LoadingScreen from './components/common/LoadingScreen';
import { AppRouters } from './routers';
import useContentStore from './stores/content-store';

function App() {
  const isLoading = useContentStore((state) => state.isLoading);
  const loadContent = useContentStore((state) => state.loadContent);

  useEffect(() => {
    loadContent();
  }, [loadContent]);
  
  if (isLoading) {
    return <LoadingScreen />
  }
  return (
    <AppRouters>
      <ScrollRestoration />
    </AppRouters>
  )
}

export default App
