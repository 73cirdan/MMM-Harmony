'use strict';

/* Magic Mirror
 * Module: MMM-Harmony
 *
 * by Cirdan
 * MIT Licensed
 */

const NodeHelper = require('node_helper');
const HarmonyHub = require('harmonyhub-api').HarmonyHub;

module.exports = NodeHelper.create({

	start: function() {
		this.started = false;
		this.config = null;
		this.hub = null;
		this.activities = [];
	},

	/*
	 * Requests new data from harmonyhub-api.
	 */
	getData: function() {
		var self = this;

		this.hub.connect()
    			.then((config) => {

        			this.hub.getCurrentActivity().then((id) => {	
					var result="Unknown";
        				config.activity.forEach(activity => {
						if  (activity.id == id) {
							result = activity.label;
						}
        				});
					console.log('Connected to the hub: ' + result);
                                	self.sendSocketNotification("DATA", result);
				})
				.catch((error) => {
					console.log('GETACT ERROR: '+error);
				});
    			})
			.catch((error) => {
				console.log('CONNECT ERROR: '+error);
			});
		
				
		setTimeout(function() { self.getData(); }, this.config.refreshInterval);
	},

	socketNotificationReceived: function(notification, payload) {
		if (notification === 'CONFIG' && this.started == false) {
			this.config = payload;
			this.sendSocketNotification("STARTED", true);
			console.log(this.name + ": configured");
			console.log('MMM-Harmony => connecting to '+this.config.hubHost);
			this.hub = new HarmonyHub(this.config.hubHost, this.config.hubId);
			this.getData();
			this.started = true;
		}
	}
});
