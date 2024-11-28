import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
// import {PexelsWallpapers} from './components/PexelsWallpapers';
// import {DeletePopUp} from './components/DelatePopUp';
import CanvasPractice from './components/CanvasPractice';
import {AnimatedImages} from './components/FlyingBird';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <PexelsWallpapers /> */}
      {/* <DeletePopUp /> */}
      {/* <CanvasPractice /> */}
      <AnimatedImages />
    </QueryClientProvider>
  );
}

export default App;
