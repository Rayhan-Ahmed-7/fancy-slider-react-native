import {useQuery} from '@tanstack/react-query';
import {Text, View} from 'react-native';

export function PexelsWallpapers() {
  const apiKey = 't3dvevS1g2wkO09x1tMILyxgSCDM8LzLaTlPQoUDdQgdd2pKiFnZPvsD';
  const {data, error, isLoading, isError} = useQuery({
    queryKey: ['wallpapers'],
    queryFn: async () => {
      const response = await fetch(
        `https://api.pexels.com/v1/search?query=mobile wallpaper&orientation=portrait&per_page=20`,
        {
          headers: {
            Authorization: `${apiKey}`,
          },
        },
      );
      return response.json();
    },
  });
  console.log(data);
  return (
    <View>
      <Text>Wallpapers</Text>
    </View>
  );
}
