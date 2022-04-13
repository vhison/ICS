export default class ReadingSchema {    
    meterId :any;
    meterName :any;
    serialNumber :any;
    meterReading :any;
    chargeCode :any;
    dateTime :any;
    meterImage :any;  
    constructor(meterId="", meterName="", serialNumber="", meterReading="", chargeCode="", dateTime="", meterImage=""){            
        this.meterId = meterId;
        this.meterName = meterName;
        this.serialNumber = serialNumber;
        this.meterReading = meterReading;
        this.chargeCode = chargeCode;
        this.dateTime = dateTime;
        this.meterImage = meterImage;      
    }    
}