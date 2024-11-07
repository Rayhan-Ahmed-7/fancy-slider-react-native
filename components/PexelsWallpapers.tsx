import {useQuery} from '@tanstack/react-query';
import {Text, View} from 'react-native';
import {ISearchResponse} from '../types/photo';

export function PexelsWallpapers() {
  const apiKey = 't3dvevS1g2wkO09x1tMILyxgSCDM8LzLaTlPQoUDdQgdd2pKiFnZPvsD';
  const {data, error, isLoading, isError} = useQuery<ISearchResponse>({
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
