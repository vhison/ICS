import {StyleSheet,Dimensions} from 'react-native';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export const styles = StyleSheet.create({    
    paginationBox : {
        position: "absolute",
        bottom: -30,
        padding: 0,
        alignItems: "center",
        alignSelf: "center",
        justifyContent: "center",
        paddingVertical: 10                  
      },
    albumContainer : { height : (SCREEN_HEIGHT * 90)/100},
    sliderHeight : (SCREEN_HEIGHT * 100)/100 
});