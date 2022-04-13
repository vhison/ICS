/* PAGE TO VIEW ALL METERS  */
import React, { Component, Fragment } from "react";
import { StyleSheet,View,Dimensions,Image,Alert,BackHandler,FlatList,AsyncStorage, SafeAreaView} from 'react-native';
import { Container,Header,Content,Card,CardItem,Form, Item, Input,Left,Right,Body,Title,Button,Icon,Text,ListItem,List,Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as yup from 'yup';
import { Formik } from 'formik';
import theme from  '../../config/theme';
import {styles} from '../../config/style';
import { searchMetersAPI } from '../../api/methods/waterUsersAPI'
import { MetersDetailsComponent, EmptyComponent } from '../../components';

export default class Meters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : true,
      message : null,
      metersList : null,
      textstring : ""
    };
  }
  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress); 
    this.searchMeter({ text : ""});
  }
  componentDidMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress);
  }
  componentWillUnmount() {    
    this.backHandler.remove();     
  }
  handleBackPress = () => {
    Actions.pop();
    return true;
  } 
  searchMeter(values){
    console.log("VALUES :", values.text)
    this.state.loading == false && this.setState({ loading : true});
    this.setState({ textstring : values.text});       
    AsyncStorage.getItem('usertoken').then(res => {      
      var formData = new FormData();    
      formData.append("operatorid", res ); 
      formData.append("text", values.text ); 
      searchMetersAPI(formData)      
      .then(meters => {         
        // console.log("meters : ", meters.data.result)
        if(meters.data.status==true && meters.data.result.length > 0){
          this.setState({ metersList : meters.data.result, message : null })           
        }
        else {
          console.log("meters else : ", meters.data.message)
          this.setState({ metersList : null, message : meters.data.message })           
        } 
        this.setState({ loading : false})       
      })
      .catch(error => {console.log("Meters listing Failed.", error)});  
    })    
  } 
  refreshCurrentPage = async () => {
    Actions.refresh({key: Math.random()})
  }
  renderLoader(){
    return  <Spinner color="#173a65" />
  }
  render() {
    const { metersList, message, loading, textstring } = this.state
    return (
      <Container style={styles.containerMainDiscover} >
        <Header transparent>
          <Left>  
            <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
                <Icon name='arrow-back' type="MaterialIcons" style={{ color :"#000" }}  />
            </Button>                   
          </Left>
          <Body>
            <Title style={{color:"#000"}}> Meters </Title>
          </Body>
          <Right> 
            <Icon name='refresh' type="MaterialIcons" style={{ color :"#000",paddingRight : 15 }}  onPress={()=> this.refreshCurrentPage()}/>                     
          </Right>
        </Header>
        <View style={{ marginHorizontal : 20 }}>
              <Formik
                initialValues={{ text: ""}}          
                onSubmit={values => this.searchMeter(values)}
                validationSchema={yup.object().shape({
                  text: yup
                  .string()                 
                  .trim()
                  .required('Please fill to search!')                
                })}
                >
                {({ values, handleChange, errors, setFieldTouched, touched, isValid, handleSubmit }) => (
                  <Fragment>
                    <Form>
                      <Item searchBar rounded style={{  height : 40}}>                  
                      <Input 
                        value={textstring}
                        onChangeText={(text) => this.searchMeter({ text : text})}
                        // onChangeText={handleChange('text')}
                        // onBlur={() => setFieldTouched('text')}
                        placeholder="Search meter" 
                        placeholderTextColor="#ccc"
                        style={{ color : "#000", paddingLeft : 40}}                  
                        autoCapitalize="none"
                        selectionColor="#000"
                      />
                      {/* { touched.text && errors.text &&
                        <Text style={{ color : "red", position : "absolute", bottom : 0, left : 50 }} >{errors.text}</Text> }
                        <Icon name="magnifier" type="SimpleLineIcons" onPress={handleSubmit} style={{ color: "#000", paddingRight : 10 }} />  */}
                        <Icon name="magnifier" type="SimpleLineIcons" style={{ color: "#000", paddingRight : 10 }} />
                      </Item>                                   
                    </Form>
                  </Fragment>
                )}
              </Formik>           
            </View>
            <View style={{ justifyContent : "center", alignItems : "center", paddingVertical : 10}}>
            <Image     
              source={theme.LOGO_APP}
              resizeMode="contain"
              style={{ width :290, height :100}}
            />  
          </View> 
        <Content>
        { loading && this.renderLoader()}   
            <View>                                             
            { metersList != null &&  <FlatList 
                  showsHorizontalScrollIndicator={false}              
                  data={metersList}
                  renderItem={({ item }) => <MetersDetailsComponent 
                  id = {item.id} 
                  serial_number = {item.serial_number}                                     
                  meter_name = {item.meter_name}                                     
                  channel_name = {item.channel_name}                                     
                  username = {item.username}                                     
                  property = {item.property}                                     
                  meternumber = {item.meternumber}                                     
                  metertype = {item.metertype}                                     
                  wr_number = {item.wr_number}                                     
                  image = {item.image}                                     
                  createdAt = {item.createdAt}   
                  lastphoto = {item.lastphoto}                                
                /> }
                keyExtractor={(item, index) => {
                    return item.id.toString()
                }}                    
                />  
              }                  
            </View>
            <View>
            { message != null &&  <EmptyComponent/> }
            </View>
        </Content>        
      </Container>
    );
  }
}