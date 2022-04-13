import {StyleSheet, Dimensions, Platform} from 'react-native';
import theme from './theme';
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
export const styles = StyleSheet.create({
    menuIcon: { 
        flex: 1,  
    },
    menuIconSubview : {
    ...Platform.select({ 
        ios : {
        top :(SCREEN_HEIGHT * 2.2)/100,
        left : (SCREEN_WIDTH * 2)/100,
        paddingVertical : (SCREEN_WIDTH * 1)/100
        }, 
        android : {          
        top :(SCREEN_HEIGHT * 3.2)/100,
        left : (SCREEN_WIDTH * 2.5)/100,
        paddingVertical : (SCREEN_WIDTH * 0.5)/100,
        backgroundColor : "grey"
        }})

    }, 
    containerMain : {
        flex:1,        
        backgroundColor : theme.DEFAULT_COLOR,
        height : (SCREEN_HEIGHT * 100) / 100,  
        width  :(SCREEN_WIDTH * 100) / 100,     
        backgroundColor: 'transparent',
        justifyContent : "center",
        alignItems : "center"         
    },
    outerSignIn : {
        marginTop : (SCREEN_HEIGHT * 12) / 100
    },
    drawerScollView: { 
        // backgroundColor:"red", 
        height : (SCREEN_HEIGHT * 85) / 100
    },
    containerMainDiscover: {
        flex:1,        
        backgroundColor : theme.DEFAULT_COLOR,
        height : (SCREEN_HEIGHT * 100) / 100,  
        width  :(SCREEN_WIDTH * 100) / 100, 
    },
    containerInnerSignup : {
        width : (SCREEN_WIDTH * 80) / 100,  
        paddingHorizontal: (SCREEN_WIDTH * 5) / 100,
        borderRadius:38,      
        backgroundColor : theme.WHITE_COLOR,
        marginTop:(SCREEN_HEIGHT * 12) / 100
    },
    containerInner : { 
        width : (SCREEN_WIDTH * 80) / 100,  
        height : (SCREEN_HEIGHT * 58) / 100,  
        paddingHorizontal: (SCREEN_WIDTH * 5) / 100,
        borderRadius:38,      
        backgroundColor : theme.WHITE_COLOR,
        marginTop:(SCREEN_HEIGHT * 13) / 100
    },
    containerInnerSignIn : { 
        width : (SCREEN_WIDTH * 80) / 100,  
        height : (SCREEN_HEIGHT * 62) / 100,  
        paddingHorizontal: (SCREEN_WIDTH * 5) / 100,
        borderRadius:38,      
        backgroundColor : theme.WHITE_COLOR,
        justifyContent : "flex-end"
    },
    containerInnerimg : { 
        height : (SCREEN_HEIGHT * 18) / 100,         
        alignItems:"center",
        marginTop:50,
        marginBottom:40        
    },    
    logoSignIn: {        
        width :"100%",
        height :"100%",        
        resizeMode: 'contain'
    },   
    inputItem: {
        marginBottom:15,
        height : (SCREEN_WIDTH * 12) / 100,   
    },    
    footerSize:{
        backgroundColor:'transparent',
        borderTopWidth:0,
        height: 70,
        position:"relative"
    },
    footerIcon:{
        fontSize: (SCREEN_WIDTH * 5) / 100, 
        color: '#fff'
    },   
    bottomTextTermsConditionsSignIn : {
        flexDirection : "row",  
        height : (SCREEN_WIDTH * 20) / 100,
        justifyContent : "center",
        alignItems : "center"
    },
    bottomTextTermsConditions : {
        flexDirection : "row",  
        height : (SCREEN_WIDTH * 20) / 100,
        justifyContent : "center",
        alignItems : "center"              
    },
    buttonTermsConditions : {
        paddingRight : (SCREEN_WIDTH * 2) / 100,
        alignItems : "center",
    },      
    footerLinkText : {
        color : theme.BLACK_COLOR,
        height : 40,  
        paddingVertical : 10,
        paddingHorizontal : 6     
    },
    bottomLinks:{ 
        marginTop : 50,
        justifyContent : "center",
        alignItems:"center"
    },
    errorInput : {        
        color : "red",         
        position : "absolute",
        bottom : 0,
        left : 50        
    },
    linkText : {
        color : theme.WHITE_COLOR,
        fontWeight : "bold",      
    },
    submitButton: {
        marginVertical:20,
        marginHorizontal:20,
        height:50,
        backgroundColor:theme.BLUE_COLOR,
        borderRadius:20
    },
    // modal
    maincontainerModal:{
        marginTop: (SCREEN_WIDTH*30)/100,
        marginHorizontal:(SCREEN_WIDTH*5)/100,
        width:(SCREEN_WIDTH*90)/100,
        height:(SCREEN_HEIGHT*35)/100, 
        alignItems:"center", 
        backgroundColor:theme.WHITE_COLOR,
        borderRadius:20,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 10,
        },
        shadowOpacity: 0.53,
        shadowRadius: 13.97,
        elevation: 21,
    },
    containerInnerimgModal : { 
        width : "100%",  
        height : (SCREEN_HEIGHT*20)/100,         
        alignItems:"center",
        paddingVertical:5 
    },    
    logoSignInModal: {        
        height : "100%", 
        width : "100%",        
        resizeMode: 'contain',
    },   
    submitButtonModal: {
        marginVertical:5,
        backgroundColor:theme.PINK_COLOR,
        borderRadius:50,
        marginHorizontal:"20%"  
    },
    linkTextModal: {
        color : theme.WHITE_COLOR,
        fontWeight : "bold",      
    },
    containerInnerForgotPassword : { 
        width : (SCREEN_WIDTH * 80) / 100,  
        height : (SCREEN_HEIGHT * 58) / 100,  
        paddingHorizontal: (SCREEN_WIDTH * 5) / 100,
        borderRadius:38,      
        backgroundColor : theme.WHITE_COLOR,
    },
    offlineSynchronizingModal : { 
        marginTop : 200, 
        marginHorizontal : 10, 
        height : 300, 
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
    }


});
