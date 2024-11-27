import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
// import {PexelsWallpapers} from './components/PexelsWallpapers';
// import {DeletePopUp} from './components/DelatePopUp';
import CanvasPractice from './components/CanvasPractice';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <PexelsWallpapers /> */}
      {/* <DeletePopUp /> */}
      <CanvasPractice />
    </QueryClientProvider>
  );
}

export default App;
