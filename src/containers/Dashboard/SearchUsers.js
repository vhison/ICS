import React, { Component ,Fragment} from 'react';
import { StyleSheet,View,Dimensions,Image,Alert,BackHandler,FlatList,AsyncStorage, SafeAreaView} from 'react-native';
import { Container,Header,Content,Form ,Input,Item,Left,Right,Body,Title,FooterTab,Button,Icon,Text,ListItem,List,Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import * as yup from 'yup';
import { Formik } from 'formik';
import {styles} from '../../config/style';

export default class SearchUsers extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress); 
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
  searchUsers(values){
    Alert.alert(
        values.text,
        "Under development",
          [{
            text: "OK",
            style: "cancel"
            },                  
          ],
          { cancelable: true }
        )        
  } 
  render() {
    return (
      <Container style={styles.containerMainDiscover} >
        <Header transparent>
          <Left>  
            <Button transparent style={{ paddingLeft : 15}} onPress={()=>{Actions.pop()}}>
                <Icon name='arrow-back' type="MaterialIcons" style={{ color :"#000" }}  />
            </Button>                   
          </Left>
          <Body>
            <Title style={{color:"#000"}}>Search</Title>
          </Body>
          <Right>                
          </Right>
        </Header>
        <Content>
        <View style={{ marginHorizontal : 20, paddingVertical : 20}}>
            <Formik
              initialValues={{ text: ""}}          
              onSubmit={values => this.searchUsers(values)}
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
                <Item searchBar rounded style={{ height : 45}}>                                    
                  <Input 
                    value={values.text}
                    onChangeText={handleChange('text')}
                    onBlur={() => setFieldTouched('text')}
                    placeholder="Search users" 
                    placeholderTextColor="#ccc"
                    style={{ color : "#000", paddingLeft : 40}}                  
                    autoCapitalize="none"
                    selectionColor="#000"                  
                  />
                  { touched.text && errors.text &&
                    <Text style={{ color : "red", position : "absolute", bottom : 0, left : 50 }} >{errors.text}</Text> }
                     <Icon name="magnifier" type="SimpleLineIcons" onPress={handleSubmit} style={{ color: "#000", paddingRight : 20 }} /> 
                  </Item>                                   
                </Form>
              </Fragment>
              )}
            </Formik>           
          </View>
        </Content>
      </Container>
    );
  }
}
