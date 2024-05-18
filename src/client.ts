import { RemoteInfo } from "dgram";
import { createSocket, Socket } from "dgram";

class Client {
    private client: Socket;
    private port: number;

    constructor() {
        this.client = createSocket('udp4');
        this.port = Number(process.env.UDP_PORT) ?? 1337;

        this.client.on('message', function(msg: Buffer, rinfo: RemoteInfo) {
            console.log('Data received from server : ' + msg.toString());
            console.log('Received %d bytes from %s:%d\n', msg.length, rinfo.address, rinfo.port);
        });
    }

    sendMessage(data: string) {
        const dataBuffer = Buffer.from(data);

        this.client.send([dataBuffer], this.port, 'localhost', (error) => {
            if (error) {
                this.client.close();
            }

            console.log('Data sent !!!');
        });
    }
}


async function main() {
    const client = new Client();
    while (true) {
        client.sendMessage('New message!')

        await new Promise(resolve => setTimeout(resolve, 5000));
    }
}


export default Client;
