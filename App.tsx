import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
// import {PexelsWallpapers} from './components/PexelsWallpapers';
import {DeletePopUp} from './components/DelatePopUp';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      {/* <PexelsWallpapers /> */}
      <DeletePopUp />
    </QueryClientProvider>
  );
}

export default App;
