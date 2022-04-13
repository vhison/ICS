import {StyleSheet,Dimensions} from 'react-native';
import theme from '../../config/theme';
const SCREEN_WIDTH = Dimensions.get('window').width;
export const styles = StyleSheet.create({    
    albumContainer : { marginHorizontal:5, backgroundColor:"#fff",height:(SCREEN_WIDTH*25)/100, },
    verticalListComponentInner : {
        marginHorizontal:18,
        paddingHorizontal : 10,
        paddingVertical : 10,
        marginTop:15, 
        backgroundColor:"#fff", 
        borderRadius : 10, 
        height:(SCREEN_WIDTH*20)/100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7
    },
    verticalListComponentRow : {flexDirection:"row", width:(SCREEN_WIDTH*100)/100},
    verticalListComponentColumn : {flexDirection:"column",paddingHorizontal:10, width:(SCREEN_WIDTH*63)/100},
    verticalListComponentTitle : { fontSize: 14, fontWeight:"600",color:"#000",marginTop:5, textAlign : "left"},
    verticalListComponentPost : {color:theme.DARK_GREY_COLOR,fontSize:15,marginTop:5,fontSize:10 }
});