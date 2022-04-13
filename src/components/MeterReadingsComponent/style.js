import {StyleSheet,Dimensions} from 'react-native';
import theme from '../../config/theme';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export const styles = StyleSheet.create({    
    albumContainer : { marginHorizontal:5, backgroundColor:"#fff",height:110, },
    verticalListComponentInner : {
        marginHorizontal:18,
        paddingHorizontal : 10,        
        marginTop:15, 
        height:90,
        justifyContent:"center",
        backgroundColor:"#fff", 
        borderRadius : 10, 
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
    verticalListComponentTitleOne : {fontWeight:"800",color:"#000",fontSize:11,marginTop:3, textAlign : "left"},
    verticalListTitleOne : {fontWeight:"800",color:"#000",fontSize:10,marginTop:3, textAlign : "left"},
    
    verticalListComponentTitle : {fontWeight:"400",color:"#000",fontSize:10,marginTop:3, textAlign : "left"},
    verticalListComponentPost : {color:theme.DARK_GREY_COLOR,fontSize:15,marginTop:5,fontSize:10 },

    downloadComponentOuter : { height:(SCREEN_HEIGHT*100)/100, 
        // backgroundColor : "green" 
        backgroundColor : "transparent" 
    },
    downloadComponentInner : { 
        justifyContent : "center",
        marginTop: (SCREEN_HEIGHT*20)/100, 
        // marginHorizontal:(SCREEN_WIDTH*5)/100, 
        // width:(SCREEN_WIDTH*90)/100,
        alignItems:"center",
        backgroundColor:"#fff",
        borderRadius:20,  
        shadowColor: "#000",
        shadowOffset: { width: 0,height: 10},
        shadowOpacity: 0.53,
        shadowRadius: 13.97,
        elevation: 21
    },    
    downloadComponentClose : { width : "100%", flexDirection:"row-reverse"},
    downloadComponentTopButton : { width :(SCREEN_WIDTH*15)/100},
    downloadComponentTopIcon : { backgroundColor :"#000", color:"#000" ,fontSize: 25},

});