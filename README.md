# MMM-Harmony
Magic Mirror Module for interacting with logitech harmony hub

# Install
from  ~/MagicMirror/modules folder: 
`git clone https://github.com/73cirdan/MMM-Harmony MMM-Harmony`
Change into MMM-Harmony and install
`cd MMM-Harmony`

`npm install`

After install change into:
`cd node_modules/harmonyhub-api/dist`
And run the following, change XXX.XXX.XXX.XXX for the IP adres of the harmony hub
`node get-remote-id.js XXX.XXX.XXX.XXX` 

The result shows the Harmony remote ID (and your username)

```
Found Logitech Harmony Hub
---------------------------
 - Username    : something@yourecognize
 - Remote id   : 12345678
```
# Config

                {
                        module: "MMM-Harmony",
                        position: "top_right",
                        header: "Whats happening",
                        config: {
                                hubs: [
                                        {
                                                hubName: "Living room",     // The name to show in the gui
                                                hubHost: 'XXX.XXX.XXX.XXX', // ip address of your harmony remote hub, check your router
                                                hubId: 'An 8 digit number', // remote id of your hub, check install for obtaining it
                                        },
                                        {       //delete or add more hubs if you like
                                                hubName: "2nd hub",
                                                hubHost: 'ip address',
                                                hubId: 'An 8 digit number',
                                        }
                                ]
                        }
                },
