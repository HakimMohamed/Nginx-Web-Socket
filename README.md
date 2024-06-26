### 1. Clone the Repository

```
git clone https://github.com/HakimMohamed/Nginx-Web-Socket.git
```

### 2. Navigate to the Project Directory

```bash
cd Nginx-Web-Socket
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Install Nginx

Download and install Nginx from [nginx.org](https://nginx.org/).

---

## Usage

### Layer 4 Proxying

#### 1. Checkout to the `layer-4-proxying` Branch

```bash
git checkout layer-4-proxying
```

#### 2. Start the Application and Nginx

Open four terminals and start four different servers on ports:

```bash
node index.js 2222
node index.js 3333
node index.js 4444
node index.js 5555

nginx -c "path/to/tcp.cfg"
```

#### 3. Open Your Web Browser Developer Tools

- In Google Chrome, go to the dots on the top right, then go to more tools, and select developer tools.

#### 4. Open the Console in the Dev Tools of Chrome and Type

```javascript
let ws = new WebSocket("ws://localhost");
ws.onmessage = e => console.log(e.data);
ws.send("hello"); // to send a message
```

You will receive a message indicating which server the WebSocket actually connected to. Open `tcp.cfg` to check the Nginx layer config.

---

### Layer 7 Proxying

#### 1. Checkout to the `layer-7-proxying` Branch

```bash
git checkout layer-7-proxying
```

#### 2. Start the Application and Nginx

Open four terminals and start four different servers on ports:

```bash
node index.js 2222
node index.js 3333
node index.js 4444
node index.js 5555

nginx -c "path/to/ws.cfg"
```

#### 3. Open Your Web Browser Developer Tools

- In Google Chrome, go to the dots on the top right, then go to more tools, and select developer tools.

#### 4. Open the Console in the Dev Tools of Chrome and Type

```javascript
let ws = new WebSocket("ws://localhost/wschat")
or
let ws = new WebSocket("ws://localhost/wsapp")
then
ws.onmessage = e => console.log(e.data);
ws.send("hello"); // to send a message
```

You will receive a message indicating which server the WebSocket actually connected to. Open `tcp.cfg` to check the Nginx layer config.

---

## Difference between Layer 7 and Layer 4 WebSockets

### Layer 4

- Layer 4 proxying is done as a tunnel. Once a connection is established on any of the servers, it sticks to the same server until the connection is closed.
- We can see TCP/IP content.
- Connection ports, IP addresses, and content remain encrypted.

### Layer 7

- We get to see all Layer 7 content.
- Content is decrypted (TLS termination).
- We can read headers, paths, URLs, etc.

```
