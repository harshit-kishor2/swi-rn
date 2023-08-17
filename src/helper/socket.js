import socketIOClient, {io} from 'socket.io-client';
// const socket = socketIOClient('http://192.168.4.151:8020/');   // develop
const socket = socketIOClient('https://swi.singsys.net:8020/'); // staging

export default socket;
