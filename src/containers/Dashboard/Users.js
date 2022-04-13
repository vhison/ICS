import React, { Component, Fragment } from "react";
import { StyleSheet,View,Dimensions,Image,Alert,BackHandler,FlatList,AsyncStorage, SafeAreaView} from 'react-native';
import { Container,Header,Content,Card,CardItem,Form, Item, Input,Left,Right,Body,Title,Button,Icon,Text,ListItem,List,Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as yup from 'yup';
import { Formik } from 'formik';
import theme from  '../../config/theme';
import {styles} from '../../config/style';
import { UsersListComponent, EmptyComponent } from '../../components';
import { viewWaterUsersAPI } from '../../api/methods/waterUsersAPI'

export default class Users extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : true,
      message : null,
      usersList : null ,
      textstring : ""
    };
  }
  viewUsersList = (values) => {  
    this.state.loading == false && this.setState({ loading : true});  
    this.setState({ textstring : values.text});    
    AsyncStorage.getItem('usertoken').then(res => {      
      var formData = new FormData();    
      formData.append("operatorid", res ); 
      formData.append("text", values.text ); 
      viewWaterUsersAPI(formData)      
      .then(users => {         
        console.log("USERS : ", users.data.result)
        if(users.data.status==true){
          this.setState({ usersList : users.data.result, message : null })           
        }
        else {
          this.setState({ usersList : null, message : users.data.message })           
        }
        this.setState({ loading : false})           
      })
      .catch(error => {console.log("Users listing Failed.", error)});  
    }); 
  }
  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress); 
    this.viewUsersList({ text : ""})
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
  renderLoader(){
    return  <Spinner color="#173a65" />
  }
  refreshCurrentPage = async () => {
    Actions.refresh({key: Math.random()})
  }
  render() {
    const { usersList, message, loading, textstring } = this.state
    return (
      <Container style={styles.containerMainDiscover} >
        <Header transparent>
          <Left>  
            <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
                <Icon name='arrow-back' type="MaterialIcons" style={{ color :"#000" }}  />
            </Button>                   
          </Left>
          <Body>
            <Title style={{color:"#000"}}> Users </Title>
          </Body>
          <Right> 
          <Icon name='refresh' type="MaterialIcons" style={{ color :"#000",paddingRight : 15 }}  onPress={()=> this.refreshCurrentPage()}/>           
          </Right>
        </Header>        
        <View style={{ marginHorizontal : 20 }}>
          <Formik
            initialValues={{ text: ""}}          
            onSubmit={values => this.viewUsersList(values)}
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
                    onChangeText={(text) => this.viewUsersList({ text : text})}
                    // onChangeText={handleChange('text')}
                    // onBlur={() => setFieldTouched('text')}
                    placeholder="Search User" 
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
            { usersList != null && <FlatList 
              showsHorizontalScrollIndicator={false}              
              data={usersList}
              renderItem={({ item }) => <UsersListComponent 
                color={true}             
                radius={20}
                id = {item.id}                                     
                username = {item.username}                                     
                contact_name = {item.contact_name}                                     
                created_at = {item.created_at}                                     
              /> }
              keyExtractor={(item, index) => {
                return item.id.toString()
              }}                    
            /> }             
          </View>
          <View>
            { message != null &&  <EmptyComponent/> }
            </View>
        </Content>
      </Container>
    );
  }
}