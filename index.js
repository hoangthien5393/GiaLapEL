const { Socket } = require("socket.io-client");

const
    io = require("socket.io-client"),
    ioClient = io.connect("http://66.42.53.74:8888");

ioClient.on("new connect", (msg) => console.info(msg));
var gIDProject = 'Test123';

ioClient.on('connect', () =>{
  ioClient.emit('new connect', {IDDevice: 'MAYTINHLOCAL'});

  } );

ioClient.on('CONTROL' + '_' + gIDProject, (data) => xulyUPDN(data))


var xulyUPDN = (data) => {
  console.info(data)
  if(data.Start == 'AAUUDD' && data.Stop == 'XXUUDD')
  {
    mapUPDN.set(1, data.FloorName);
    ioClient.emit('TPE_CONTROL', {Start: 'ABUUDD', IDProject: gIDProject, 
    IDDeviceSend: 'MAYTINHLOCAL', IDDeviceReceive: data.IDDeviceSend, ControlCode: data.ControlCode, 
    FloorName: data.FloorName, State: true, ErrMess: '', Stop: 'XYUUDD'})
  }
  else if(data.Start == 'AAEELL' && data.Stop == 'XXEELL')
  {
    mapButton.set(1, data.FloorName);
    ioClient.emit('TPE_CONTROL', {Start: 'ABEELL', IDProject: gIDProject, 
    IDDeviceSend: 'MAYTINHLOCAL', IDDeviceReceive: data.IDDeviceSend, ControlCode: data.ControlCode, 
    FloorName: data.FloorName, State: true, ErrMess: '', Stop: 'XYEELL'})
  }
  else if(data.Start == 'CCRRFF' && data.Stop == 'TTRRFF')
  {
    ioClient.emit('TPE_STATUS', {Start: 'BCEELL', IDProject: gIDProject, ElevatorName: 'PL1', FloorHere: FloorNow, ArrowDirection: UpDn, Stop: 'YZEELL'});
    ioClient.emit('TPE_STATUS', {Start: 'BBUUDD', IDProject: 'Test123', ElevatorName: 'PL1', FloorName: FloorNow, StateUP: false, StateDN: false, Stop: 'YYUUDD'});
    //ioClient.emit('TPE_CONTROL', {Start: 'CDRRFF', IDProject: gIDProject, ControlCode: data.ControlCode, State: true, Stop: 'TXRRFF'});
  }
  else
  {
    ioClient.emit('TPE_CONTROL', {Start: 'ABUUDD', IDProject: gIDProject, 
    IDDeviceSend: 'MAYTINHLOCAL', IDDeviceReceive: data.IDDeviceSend, ControlCode: data.ControlCode, 
    FloorName: data.FloorName, State: false, ErrMess: '', Stop: 'XYUUDD'})
  }
}


var FloorNow = 0;
var daochieu = false;
var UpDn = 'UP'
var mapUPDN = new Map();
var mapButton = new Map();
var chaythang = false;
setInterval(() => {
  if(chaythang)
  {
    if(daochieu)
    {
      FloorNow--;
      ioClient.emit('TPE_STATUS', {Start: 'BCEELL', IDProject: gIDProject, ElevatorName: 'PL1', FloorHere: FloorNow, ArrowDirection: UpDn, Stop: 'YZEELL'});
      if(FloorNow <= 1)
      {
        FloorNow = 0;
        daochieu = false;
        UpDn = 'UP'
      }
    }
    else
    {
      FloorNow++;
      ioClient.emit('TPE_STATUS', {Start: 'BCEELL', IDProject: gIDProject, ElevatorName: 'PL1', FloorHere: FloorNow, ArrowDirection: UpDn, Stop: 'YZEELL'});
      if(FloorNow >= 32)
      {
        FloorNow = 33;
        daochieu = true;
        UpDn = 'DN'
      }
    }
  }
 if(mapUPDN.size > 0)
 {
   chaythang = true;
   mapUPDN.forEach((key, value) => {
     if(FloorNow > key)
     {
       daochieu = true;
       UpDn = 'DN'
     }
     else if(FloorNow < key)
     {
       daochieu = false;
       UpDn = 'UP'
     }
     if (FloorNow == key)
     {
       chaythang = false;
       ioClient.emit('TPE_STATUS', {Start: 'BBUUDD', IDProject: 'Test123', ElevatorName: 'PL1', FloorName: FloorNow, StateUP: false, StateDN: false, Stop: 'YYUUDD'});
       mapUPDN.delete(1);
     }
   })
 }
 else
 {
   chaythang = false;
 }
  
}, 2000);

