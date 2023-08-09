import socketIOClient, {io} from 'socket.io-client';
const socket = socketIOClient('http://192.168.4.151:8020/');

export default socket;
