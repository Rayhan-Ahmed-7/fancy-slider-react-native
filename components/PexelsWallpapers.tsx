import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import {IPhoto, ISearchResponse} from '../types/photo';

export function PexelsWallpapers() {
  const apiKey = 't3dvevS1g2wkO09x1tMILyxgSCDM8LzLaTlPQoUDdQgdd2pKiFnZPvsD';
  const {data, isLoading} = useQuery<ISearchResponse>({
    queryKey: ['wallpapers'],
    queryFn: async () => {
      const response = await fetch(
        'https://api.pexels.com/v1/search?query=mobile wallpaper&orientation=portrait&per_page=20',
        {
          headers: {
            Authorization: `${apiKey}`,
          },
        },
      );
      return response.json();
    },
  });
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <View style={styles.centered}>
      <FlatList
        data={data?.photos}
        renderItem={({item, index}) => {
          return <Photo photo={item} key={index} />;
        }}
      />
    </View>
  );
}
const {width} = Dimensions.get('screen');
const _imageWidth = width * 0.7;
const _imageHeight = width * 1.76;
const Photo = ({photo, key}: {photo: IPhoto; key: number}) => {
  console.log(photo);
  return (
    <View key={key}>
      <Image
        source={{uri: photo.src.medium}}
        style={{width: _imageWidth, height: _imageHeight}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
