import React, { Component } from 'react';
import { StyleSheet,View,Dimensions,Image,Alert,BackHandler,FlatList,AsyncStorage, SafeAreaView} from 'react-native';
import { Container,Header,Content,Card,CardItem,Left,Right,Body,Title,Button,Icon,Text,ListItem,List,Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import theme from  '../../config/theme';
import {styles} from '../../config/style';
import { UserProfileComponent, MetersDetailsComponent, EmptyComponent } from '../../components';
import { viewUserDetailsAPI } from '../../api/methods/waterUsersAPI'

export default class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading : true,
      message : null,
      userDetails : null,
      connections : []
    };
  }
  viewUserDetails = (id) => {   
    console.log("USER ID : ", id)   
    this.state.loading == false && this.setState({ loading : true})        
    var formData = new FormData();    
    formData.append("userid", id ); 
    viewUserDetailsAPI(formData)      
    .then(users => {               
      console.log("USER DETAILS > ", users.data)
      if(users.data.status==true){
        console.log("USER DETAILS : ", users.data.result[0].connections)
        this.setState({ userDetails : users.data.result, connections: users.data.result[0].connections, message : null })           
      }
      else {
        this.setState({ userDetails : null, connections : null, message : users.data.message })           
      }
      this.setState({ loading : false})           
    })
    .catch(error => {console.log("User Details Failed.", error)});      
  }
  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress); 
    this.viewUserDetails(this.props.id)
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
  render() {
    const { id, username, image, created_at } = this.props
    const { userDetails, connections, message, loading } = this.state
    return (
      <Container style={styles.containerMainDiscover} >
        <Header transparent>
          <Left>  
            <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
                <Icon name='arrow-back' type="MaterialIcons" style={{ color :"#000" }}  />
            </Button>                   
          </Left>
          <Body>
            <Title style={{color:"#000"}}> Water User </Title>
          </Body>
          <Right> 
            {/* <Icon name='add-circle-outline' type="MaterialIcons" style={{ color :"#000" }} onPress={()=>Actions.jump('addreading',{ id : id, title : username, image : image })} />                      */}
          </Right>
        </Header>        
        <Content>
            <View style={{ backgroundColor : "white"}}>                                             
             { userDetails!=null && <UserProfileComponent details={userDetails} />}
             { loading && this.renderLoader()}   
            </View>
            <Card transparent>
                <CardItem>
                  <Left>
                    <Text style={{ fontWeight : "500", textAlign : "left"}}>Meters </Text>
                  </Left>                              
                </CardItem>
              </Card>             
            <View style={{ backgroundColor : "white", height : 400, paddingBottom : 50}}>  
                                                         
             {(typeof connections !== 'undefined' && connections.length > 0) && <FlatList 
                showsHorizontalScrollIndicator={false}              
                data={connections}
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
                  lastphoto = {item.image !="" ? item.lastphoto : ""}                                  
                />  }
                keyExtractor={(item, index) => {
                  return item.id.toString()
                }}                    
              /> }
               { connections.length < 1 &&  <EmptyComponent/> }
            </View>
        </Content>        
      </Container>
    );
  }
}