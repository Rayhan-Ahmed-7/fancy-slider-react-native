import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {PexelsWallpapers} from './components/PexelsWallpapers';
const queryClient = new QueryClient();
function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [count, setCount] = useState(0);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <PexelsWallpapers />
        <Text>You clicked {count} times</Text>
        <Button onPress={() => setCount(count + 1)} title="Click me!" />
      </View>
    </QueryClientProvider>
  );
  // return (
  //   <SafeAreaView style={backgroundStyle}>
  //     <StatusBar
  //       barStyle={isDarkMode ? 'light-content' : 'dark-content'}
  //       backgroundColor={backgroundStyle.backgroundColor}
  //     />
  //     <ScrollView
  //       contentInsetAdjustmentBehavior="automatic"
  //       style={backgroundStyle}>
  //       <View style={styles.container}>
  //         <Text>You clicked {count} times</Text>
  //         <Button onPress={() => setCount(count + 1)} title="Click me!" />
  //       </View>
  //     </ScrollView>
  //   </SafeAreaView>
  // );
}

// React Native Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
