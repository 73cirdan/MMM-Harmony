'use strict';

/* Magic Mirror
 * Module: MMM-Harmony
 *
 * by Cirdan
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
const HarmonyHub = require('harmonyhub-api').HarmonyHub;

module.exports = NodeHelper.create({

	start: function() {
		this.started = false;
		this.config = null;
		this.hubs = [];
		this.activities = [];
	},

	/*
	 * Requests new data from harmonyhub-api.
	 */
	getData: function() {
		var self = this;

		for (const hub of Object.values(this.hubs))
		{
		    hub.connect()
    			.then((config) => {

        			hub.getCurrentActivity().then((id) => {	
        				config.activity.forEach(activity => {
						if  (activity.id == id) {
							console.log('Connected to the hub activity=' + activity.label);
 							var payload = { 
								"name": this.getHubName(hub.hubRemoteId),
								"activity": activity.label
							};
 							self.sendSocketNotification("DATA", payload);
						}
        				});
				});
    			})
			.catch((error) => {
				console.log('CONNECT ERROR: '+error);
				var payload = { 
					"name": this.getHubName(hub.hubRemoteId),
					"activity": "No connection"
				};
 				self.sendSocketNotification("ERROR", payload);
			});
		
		}		
		setTimeout(function() { self.getData(); }, this.config.refreshInterval);
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === 'CONFIG' && this.started == false) {
			this.config = payload;
			this.sendSocketNotification("STARTED", true);
			console.log(this.name + ": configured");
		
			for (const hub of Object.values(this.config.hubs))
			{
				console.log('MMM-Harmony => connecting to '+hub.hubName);
				this.hubs.push(new HarmonyHub(hub.hubHost, hub.hubId));
			}
			this.getData();
			this.started = true;
		}
	},
	
	/*
	 * Given an hub id, find the hubname
	 */
	getHubName: function( hubId ) {
		for (const hub of Object.values(this.config.hubs))
		{
			if (hub.hubId==hubId) { return hub.hubName };
		}
		return "Harmonyhub";
	}
});
