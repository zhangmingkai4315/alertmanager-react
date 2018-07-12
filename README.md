### Alertmanager React 

Rewrite promethus alertmanager webui with react.

#### Install 

1. install nodejs

- [Installing Node.js and npm](https://nodejs.org/en/download/package-manager/)

2. install dependencies

```
npm install or yarn 
```
3. start web server in dev mode

```
npm start 
```

#### Usage

After install all the dependencies and start the dev server, go to `http://localhost:3000` and connect your own alertmanager api server. The server api address should be like `http://localhost:9093/api/v1` or `http://alertmanager.example.com/api/v1`. 

> Notice: If you not set the url address, you app will be locked at **setting** pages

Click Connect button, if connect success, the menu will be unlocked and you can retrive all the alerts and silences information from sever.

#### Build

```
npm build 
```

After build success, the **build** folder will include all static files you need. Copy the static files to your nginx web folder or any web server.


#### Some lib

- state manage (redux)
- router (react-router-dom)
- form (react-form)
- async (react-saga)
- i18n (react-intl)
