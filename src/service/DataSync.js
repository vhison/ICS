import { AsyncStorage} from 'react-native';
import { Toast } from 'native-base';
import { addMeterReadingAPI } from '../api/methods/waterUsersAPI';

export default class DataSync {        
    constructor(){} 
    viewLog = async (l) => {
        if(l){
            console.log("ICS DataSync ",l)
            try {
                const jsonValue = await AsyncStorage.getItem('OFFLINE_READINGS')
                if(jsonValue != null) {
                    console.log("ICS DataSync 1")
                    var storage = JSON.parse(jsonValue)
                    if(storage != null && storage.length > 0) {                
                        console.log("ICS DataSync 2")
                        this.uploadIfConnection(storage)
                    }                                            
                }                   
            } catch(e) {
                // error reading value
                console.log("ICS DataSync view log ",e)
            } 
        }     
        console.log("ICS DataSync view log 1",l)
    } 
    uploadIfConnection = async (metersList) => {            
        if(metersList!=null){
            console.log("ICS DataSync READINGS", metersList + typeof metersList)
            //  start loader
            try {
                var response = [];
                metersList.forEach( async (row)=>{
                    console.log("ICS DataSync ROW > metername : ", row.meterName )
                    await this.uploadReadingsOnServer(row.meterId,row.meterName,row.serialNumber,row.meterReading,row.meterImage,row.chargeCode,row.dateTime)   
                    response.push(row.meterId);
                    if(response.length  === metersList.length) {
                        //foreach work done
                        console.log("ICS DataSync work done");                
                        await AsyncStorage.removeItem('OFFLINE_READINGS')                
                        Toast.show({
                            text: "Readings Syncronized successfully",
                            textStyle : { color : "#fff", textAlign : "center" },    
                            duration: 5000,
                            useNativeDriver: true,
                            style: { backgroundColor : "#173a65" }    
                        })                    
                    }
                })                        
            } catch(e) {
                // remove error
                console.log("ICS DataSync err ", e)
            }           
        }       
      }
    
      uploadReadingsOnServer = async (meter_id,meter_name,serial_number,meter_reading,file,charge_code,date_time) => {
        var formData = new FormData();    
        formData.append("meter_id", meter_id ); 
        formData.append("meter_reading", meter_reading ); 
        formData.append("date", date_time ); 
        formData.append("charge_code", charge_code );    
        formData.append("file", { name: "meterImage.jpg", type: 'image/jpg', uri: file  } );            
        addMeterReadingAPI(formData)      
        .then(reading => {  
          if(reading.data.status==true){
            return true;
          }   
          else {
            return false;
          }   
        })
        .catch(error => {
          console.log("ICS DataSync saved Failed.", error)
          return false;
        })   
      }
}