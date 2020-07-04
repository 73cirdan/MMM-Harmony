/* global Module */

/* Magic Mirror
 * Module: MMM-Harmony
 * Displays the current activity selected on your Harmony hub remote control using the harmonyhub-api
 *
 * By Cirdan.
 */

Module.register("MMM-Harmony",{

	// Default module config.
	defaults: {
		css: "MMM-Harmony.css",
		refreshInterval: 1000 * 60 * 1, //refresh every 1 minute(s)
		//autohide: false,
		//displaymode: "smooth",
		//faultToleration: 5,
	},

	// Define required scripts.
	getStyles: function() {
		return [this.config.css];
	},

	// Define required translations.
	getTranslations: function() {
       		return {
            		en: "translations/en.json",
            		nl: "translations/nl.json",
            		de: "translations/de.json",
        	};
	},

	// Define start sequence.
	start: function() {
		Log.info("Starting module: " + this.name);
		this.sendSocketNotification('CONFIG', this.config);
        	//if (!["line", "smooth", "block"].includes(this.config.displaymode)) {
			//Log.warn(this.name + ": invalid or no displaymode in config, valid values are: line, smooth or block");
			//this.confg.displaymode = "smooth";
		//}
	},

 	// Override dom generator.
        getDom: function() {
		var wrapper = document.getElementById('harmonystate');
		if (!wrapper) {
                   wrapper = document.createElement("div");
    		   wrapper.id = "harmonystate";
		   wrapper.innerHTML = this.translate("STARTING");
                   wrapper.className = "small light label_text";
		}
                return wrapper;
        },

	/* socketNotificationReceive(notification)
	 * used to get communication from the nodehelper
	 *
	 * argument notification object - status label from nodehelper.
	 * argument payload object - Weather information received via buienradar.nl.
	 */
       	socketNotificationReceived: function(notification, payload) {

		wrapper = document.getElementById('harmonystate');

		// configured succesfully
    		if (notification === "STARTED") {
			Log.info(this.name + ": configured");
			wrapper.innerHTML = this.translate("STARTED");
		} else 
       		// error received from node_helper.js
       		if (notification === "ERROR") {
			Log.error(this.name + ": error: " + payload);
			wrapper.innerHTML = this.translate("ERROR");
       		} else
		// data received
       		if (notification === "DATA") {
       			// data received from node_helper.js, but empty payload
			if (!payload || payload ==="") {
				Log.warn(this.name + "no payload ");
				wrapper.innerHTML = "no payload";
			} else 
			// data received and payload to parse
			{
				Log.warn(this.name + "payload: " + payload);
				wrapper.innerHTML = payload;
			}
       	 	}
                this.updateDom();
    	},

});
