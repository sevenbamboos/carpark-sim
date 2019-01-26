# carpark-sim

## Summary
server.js is running carpark engine together with a command parser.

client.js reads commands from a local file and sends them to server.js. The result will be returned to client. Invalid commands will be ignored.

server.js holds a global carpark and will reset it after the use of each client, which means each client will be assigned with a new bus and there is no existing buses from previous clients.

## Draft Design
https://www.lucidchart.com/documents/edit/2fa398e2-f830-42e4-b42d-5fc79ad5d0cd/0

## Installation
npm install

## Run
1. Start the server: 
```
npm run server
```

2. Start the clients (in a new terminal): 
```
npm run client1
npm run client2
```
client1 uses commands-sample1.txt; 

client2 uses commands-sample2.txt.

Feel free to change the commands in these two files, just make sure to keep an empty line at the end of file.

## Test
```
npm test
```
Both socket server and client have NOT been covered by unit test.
