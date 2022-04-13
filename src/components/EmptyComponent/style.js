import {StyleSheet,Dimensions} from 'react-native';
import theme from '../../config/theme';
const SCREEN_WIDTH = Dimensions.get('window').width;
export const styles = StyleSheet.create({    
    albumContainer : { marginHorizontal:5, backgroundColor:"#fff", paddingVertical : 8},
    verticalListComponentInner : {
        marginHorizontal:18,
        paddingHorizontal : 10,        
        justifyContent:"center",
        marginTop:5, 
        backgroundColor:"#fff", 
        borderRadius : 10, 
        height:90,
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
    verticalListComponentColumn : {paddingHorizontal:10},
    verticalListComponentTitleOne : {color:"white",fontWeight:"800",color:"#000",fontSize:11,marginTop:3, textAlign : "left"},
    verticalListTitleOne : {color:"white",fontWeight:"800",color:"#000",fontSize:10,marginTop:3, textAlign : "left"},
    
    verticalListComponentTitle : {color:"white",fontWeight:"400",color:"#000",fontSize:10,marginTop:3, textAlign : "left"},
    verticalListComponentPost : {color:theme.DARK_GREY_COLOR,fontSize:15,marginTop:5,fontSize:10 }
});