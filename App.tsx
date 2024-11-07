import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {PexelsWallpapers} from './components/PexelsWallpapers';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <PexelsWallpapers />
    </QueryClientProvider>
  );
}

export default App;
