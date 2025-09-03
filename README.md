# MQTT API

## Websocket
Together with the api there is a websocket the websocket is used as a middle man for the MQTT connection the the MQTT broker. That will say that every message going in or out of either MQTT or WebSocket will be sendt on both interfaces.


## Paths

> ## GET /Locations [Requires Token]
>Response
> ```
> [
>{
>    "id": 1,
>    "name": "Location name",
> },
> ...
> ]
> ```


> ## POST /location [Requires Token]
> Body
>```
>{
>    "id": 1
>    "name": "Location name"
>}
>```
>Response
> ```
>{
>    "success": true
> }
> ```


> ## POST /data/temperature [Requires Token]
> Body
>```
>{
>    "Temperature": 12.54
>    "Humidity": 43.25
>    "DeviceID": "Device id"
>    "LocationID": 1
>}
>```
>Response
> ```
>{
>    "success": true
> }
> ```


> ## GET /data/temperature [Requires Token]
>Response
> ```
>{
>    "Temp": 25,
>    "humidity": 50,
>    "LocationID": 1,
>    "DeviceID": 2
> }
> ```

> ## POST /data/Light [Requires Token]
> Body
>```
>{
>    "LightLevel": 1234
>    "DeviceID": "Device id"
>    "LocationID": 1
>}
>```
>Response
> ```
>{
>    "success": true
> }
> ```

> ## POST /device [Requires Token]
> Authorizes the device so it can upload to database
> 
> Body
>```
>{
>    "DeviceID": "Device id"
>    "LocationID": 1
>}
>```
>Response
> ```
>{
>    "success": true
> }
> ```


> ## POST /device/verify [Requires Token]
> return the device token if the device is authorized
> 
> Body
>```
>{
>    "DeviceID": "Device id"
>}
>```
>Response
> ```
>{
>    "success": true,
>    "Token": "JWT token"
> }
> ```


> ## POST /device/unverify [Requires Token]
> Makes the device unable to post to database
> 
> Body
>```
>{
>    "DeviceID": "Device id"
>}
>```
>Response
> ```
>{
>    "success": true
> }
> ```

> ## POST /device/location [Requires Token]
> Updates where the device is
> 
> Body
>```
>{
>    "DeviceID": "Device id"
>    "LocationID": 1
>}
>```
>Response
> ```
>{
>    "success": true
> }
> ```

> ## POST /user [Requires Token]
> Creates a new user
> 
> Body
>```
>{
>    "username": "username"
>    "password": "password"
>}
>```
>Response
> ```
>{
>    "success": true
> }
> ```

> ## POST /login
> 
> Body
>```
>{
>    "username": "username"
>    "password": "password"
>}
>```
>Response
> ```
>{
>    "success": true,
>    "Token": "JWT user token"
> }
> ```
