# MMM-Harmony
Magic Mirror Module for interacting with logitech harmony hub

# Install
from  ~/MagicMirror/modules folder: 
`git clone https://github.com/73cirdan/MMM-Harmony MMM-Harmony`
Change into MMM-Harmomny and install
`cd MMM-Harmony` 
`npm install`

After install change into:
`cd node_modules/harmonyhub-api/dist`
And run the following, change XXX.XXX.XXX.XXX for the IP adres of the harmony hub
`node get-remote-id.js XXX.XXX.XXX.XXX` 

The result shows the Harmony remote ID (and your username)

```Found Logitech Harmony Hub
---------------------------`
 - Username    : something@yourecognize
 - Remote id   : 12345678
```
# Config

                {
                        module: "MMM-Harmony",
                        position: "top_right",
                        header: "MMM-Harmony",
                        config: {
                                hubHost: 'XXX.XXX.XXX.XXX', ip adres of your harmony remote hub, check your router
                                hubId: 'An 8 digit number', remote id off your hub, check install for obtaining it
                        }
                },
