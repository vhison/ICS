import React, { Component } from 'react';
import { View } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import {styles} from './style';
export default class SliderImagesComponent extends Component {
  render() {
    const { sliderimages } = this.props
    return (
      <View style={styles.albumContainer}>        
        <SliderBox
          images={sliderimages}
          sliderBoxHeight={styles.sliderHeight}                
          dotColor="#173a65"
          inactiveDotColor="#ccc"                
          paginationBoxStyle={styles.paginationBox}
          imageLoadingColor="#173a65"
          autoplay={true}
          circleLoop={true}
        />      
    </View>
    );
  }
}
