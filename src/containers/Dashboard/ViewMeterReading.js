/* PAGE TO VIEW METER READINGS  */
import React, { Component } from 'react';
import { StyleSheet,View,Dimensions,Image,Alert,BackHandler,FlatList,AsyncStorage, SafeAreaView} from 'react-native';
import { Container,Header,Content,Footer,Left,Right,Body,Title,FooterTab,Button,Icon,Text,ListItem,List,Spinner } from 'native-base';
import { Actions } from 'react-native-router-flux';
import theme from  '../../config/theme';
import {styles} from '../../config/style';
import { viewMeterReadingsAPI } from '../../api/methods/waterUsersAPI'
import { MeterReadingsComponent, EmptyComponent, MeterPropertiesComponent } from '../../components';

export default class ViewMeterReading extends Component {
   constructor(props) {
    super(props);
    this.state = {
      loading : true,
      message : null,
      meterReadings : null
    };
  }
  componentWillMount(){
    this.backHandler = BackHandler.addEventListener('handleBackPress', this.handleBackPress); 
    this.viewMeterReadings(this.props.meter_id)
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
  viewMeterReadings(meter_id){    
    this.state.loading == false && this.setState({ loading : true})   
    var formData = new FormData();          
    formData.append("meter_id", meter_id ); 
    viewMeterReadingsAPI(formData)      
    .then(meters => {               
      if(meters.data.status==true){
        this.setState({ meterReadings : meters.data.result, message : null })         
      }
      else {
        this.setState({ meterReadings : null, message : meters.data.message })     
      }   
      this.setState({ loading : false})           
    })
    .catch(error => {
      console.log("Meter Readings listing Failed.", error)
      this.setState({ loading : false})      
    });    
  }  
  renderLoader(){
    return  <Spinner color="#173a65" />
  }
  render() {
    const { meter_id,username,contact_name,serial_number,meter_name,channel_name,property,meternumber,metertype,wr_number,image,createdAt,lastphoto } = this.props
    const { meterReadings, message, loading } = this.state
    return (
      <Container style={styles.containerMainDiscover} >
        <Header transparent>
          <Left>  
            <Button transparent style={{ paddingLeft : 15}} onPress={()=>Actions.pop()}>
                <Icon name='arrow-back' type="MaterialIcons" style={{ color :"#000" }}  />
            </Button>                   
          </Left>
          <Body>
            <Title style={{color:"#000"}}> Readings </Title>
          </Body>
          <Right>                               
          </Right>
        </Header>
        <Content>
          <MeterPropertiesComponent photo={lastphoto} wr_number={wr_number} type={metertype} channel={channel_name} serial={serial_number} metername={meter_name} meterproperty={property} username={username} contact_name={contact_name}  />
          { loading && this.renderLoader()}   
         <View style={{ paddingBottom : 20}}>                                             
            { meterReadings != null &&  <FlatList 
                showsVerticalScrollIndicator={false}           
                data={meterReadings}
                renderItem={({ item }) => <MeterReadingsComponent 
                id = {item.id!=null?item.id:""} 
                meter_id = {item.meter_id!=null?item.meter_id:""}                                     
                meter_reading = {item.meter_reading!=null?item.meter_reading:""}                                     
                date_of_reading = {item.date_of_reading!=null?item.date_of_reading:""}                                     
                charge_code = {item.charge_code!=null?item.charge_code:""}                                     
                photo = {item.photo!=null?item.photo:""}  
                wr_number = {item.wr_number!=null?item.wr_number:""}                                     
                type = {item.type!=null?item.type:""}                                     
                channel = {item.channel!=null?item.channel:""}                                     
                serial = {item.serial!=null?item.serial:""}                                     
                metername = {item.metername!=null?item.metername:""}                                     
                meterproperty = {item.meterproperty!=null?item.meterproperty:""}                                      
                meteractive = {item.meteractive!=null?item.meteractive:""} 
                metercomment = {item.metercomment!=null?item.metercomment:""}                                     
                username = {item.username!=null?item.username:""}                                     
                contact_name = {item.contact_name!=null?item.contact_name:""}                                     
                email = {item.email!=null?item.email:""}                                     
                contact = {item.contact!=null?item.contact:""}                                     
                phone = {item.phone!=null?item.phone:""}                                     
                address = {item.address!=null?item.address:""}                                     
                stock_supply = {item.stock_supply!=null?item.stock_supply:""}                                                
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
            <View style={{ paddingVertical : 10}}>            
              <Button full style={styles.submitButton} onPress={()=>Actions.jump('addreading',{ meter_id:meter_id, username:username, contact_name:contact_name, serial_number:serial_number, meter_name:meter_name, channel_name:channel_name, property:property, meternumber:meternumber, metertype:metertype, wr_number:wr_number, image:image, createdAt:createdAt, lastphoto : lastphoto })}>
                <Text style={styles.linkText} > Add Reading </Text>
              </Button>  
            </View>
          </Content>
      </Container>
    );
  }
}