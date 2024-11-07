import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';
import {IPhoto, ISearchResponse} from '../types/photo';
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
// solves the cache issue
// npx react-native start --reset-cache
const {width} = Dimensions.get('screen');
const _imageWidth = width * 0.7;
const _imageHeight = width * 1.76;
const _spacing = 12;

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

  const scrollX = useSharedValue(0);
  const onScroll = useAnimatedScrollHandler(e => {
    scrollX.value = e.contentOffset.x / (_imageWidth + _spacing);
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
      <View style={StyleSheet.absoluteFillObject}>
        {data?.photos.map((photo, index) => (
          <BackDropPhoto photo={photo} index={index} scrollX={scrollX} />
        ))}
      </View>
      <Animated.FlatList
        style={{flexGrow: 0}}
        data={data?.photos}
        horizontal
        renderItem={({item, index}) => {
          return <Photo photo={item} index={index} scrollX={scrollX} />;
        }}
        snapToInterval={_imageWidth + _spacing}
        decelerationRate={'fast'}
        contentContainerStyle={{
          gap: _spacing,
          paddingHorizontal: (width - _imageWidth) / 2,
        }}
        onScroll={onScroll}
        scrollEventThrottle={1000 / 60} //16.6ms
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}

const Photo = ({
  photo,
  index,
  scrollX,
}: {
  photo: IPhoto;
  index: number;
  scrollX: SharedValue<number>;
}) => {
  const stylez = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [1.6, 1, 1.6],
          ),
        },
        {
          rotate: `${interpolate(
            scrollX.value,
            [index - 1, index, index + 1],
            [15, 0, -15],
          )}deg`,
        },
      ],
    };
  });
  return (
    <View
      style={{
        width: _imageWidth,
        height: _imageHeight,
        borderRadius: 18,
        overflow: 'hidden',
      }}
      key={index}>
      <Animated.Image
        source={{uri: photo.src.large}}
        style={[{flex: 1}, stylez]}
      />
    </View>
  );
};
const BackDropPhoto = ({
  photo,
  index,
  scrollX,
}: {
  photo: IPhoto;
  index: number;
  scrollX: SharedValue<number>;
}) => {
  const stylez = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollX.value,
        [index - 1, index, index + 1],
        [0, 1, 0],
      ),
    };
  });
  return (
    <Animated.Image
      key={index}
      style={[StyleSheet.absoluteFillObject, stylez]}
      source={{uri: photo.src.large}}
    />
  );
};
const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
