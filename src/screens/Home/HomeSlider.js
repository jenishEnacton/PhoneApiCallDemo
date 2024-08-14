import React, {useState, useRef} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import {COLORS} from '../../assets/Theme/colors';

export default function HomeSlider(props) {
  const {item} = props;
  const data = Object.values(item.slides);

  const width = Dimensions.get('window').width;
  const ref = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const renderCarousel = ({item}) => {
    return (
      <View>
        <TouchableOpacity style={styles.container}>
          <Image
            source={{uri: item?.mobile_image_url?.en}}
            style={styles.image_sty}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const renderPaginationDots = () => {
    return (
      <View style={styles.paginationContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Carousel
        ref={ref}
        width={width}
        height={220}
        data={data}
        renderItem={renderCarousel}
        onSnapToItem={index => setCurrentIndex(index)}
        autoPlay
        autoPlayInterval={3000}
      />
      {renderPaginationDots()}
    </View>
  );
}

const styles = StyleSheet.create({
  image_sty: {
    height: 200,
    width: 370,
    resizeMode: 'cover',
    margin: 10,
    borderRadius: 15,
  },
  container: {
    backgroundColor: COLORS.primary,
    paddingBottom: 10,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: COLORS.secondary,
  },
  inactiveDot: {
    backgroundColor: COLORS.white,
  },
});
