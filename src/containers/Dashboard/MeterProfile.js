import React, { Component } from 'react';
import { StyleSheet,View,Dimensions,Image,Alert,BackHandler,FlatList,AsyncStorage, SafeAreaView} from 'react-native';
import { Container,Header,Content,Card,CardItem,Left,Right,Body,Title,Button,Icon,Text,ListItem,List,Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import theme from  '../../config/theme';
import {styles} from '../../config/style';
import { MeterProfileComponent } from '../../components';

export default class MeterProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message : null,
      userDetails : null 
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
  render() {
    const { id,meter_id,meter_reading,date_of_reading,charge_code,photo,wr_number,type,channel,serial,metername,meterproperty,meteractive,metercomment,username,contact_name,email,contact,phone,address,stock_supply } = this.props    
    return (
      <Container style={styles.containerMainDiscover} >
        <Header transparent>
          <Left>  
            <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
                <Icon name='arrow-back' type="MaterialIcons" style={{ color :"#000" }}  />
            </Button>                   
          </Left>
          <Body>
            <Title style={{color:"#000"}}> </Title>
          </Body>
          <Right>             
          </Right>
        </Header>
        <Content>
           <MeterProfileComponent id={id} meter_id={meter_id} meter_reading={meter_reading} date_of_reading={date_of_reading} charge_code={charge_code} photo={photo} wr_number={wr_number} type={type} channel={channel} serial={serial} metername={metername} meterproperty={meterproperty} meteractive={meteractive} metercomment={metercomment} username={username} contact_name={contact_name} email={email} contact={contact} phone={phone} address={address} stock_supply={stock_supply} />
        </Content>        
      </Container>
    );
  }
}