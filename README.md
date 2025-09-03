# MQTT API

## Websocket
Together with the api there is a websocket the websocket is used as a middle man for the MQTT connection the the MQTT broker. That will say that every message going in or out of either MQTT or WebSocket will be sendt on both interfaces.


## Paths
> GET /Locations
response
```
{
    "id": 1
    "name": "Location name"
}
```

> POST /Locations
body
```
{
    "id": 1
    "name": "Location name"
}
```
response
```
{
    "sucess": true
}
```