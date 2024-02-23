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
	
		this.hubs = {};
		Log.info("Starting module: " + this.name);
		this.sendSocketNotification('CONFIG', this.config);
	},

 	// Override dom generator.
        getDom: function() {
		var wrapper = document.getElementById('harmonystate');
		if (!wrapper) {
                   wrapper = document.createElement("div");
    		   wrapper.id = "harmonystate";
                   wrapper.className = "small light label_text";

                   text = document.createElement("div");
    		   text.id = "harmonytext";
		   text.innerHTML = this.translate("STARTING");
		   wrapper.appendChild(text);


        	   table = document.createElement("table");
	           table.className = "small thin light";
    		   table.id = "harmonytable";
		   wrapper.appendChild(table);

		}
                return wrapper;
        },

	showHubs: function(hubs){


        	table = document.createElement("table");
	        table.className = "small thin light";
    		table.id = "harmonytable";

                for (const key in hubs)
		{
        		const row = document.createElement("tr");
			table.appendChild(row)

                        const name = document.createElement("td");
                        //name.className = "fa fa-house-user align-right"; // an icon
                        name.className = "fa fa-" + key; // an icon
                        //name.innerHTML = key; // a text label
                        row.appendChild(name);

                        const value = document.createElement("td");
                        value.innerHTML = hubs[key];
                        value.className = "small light table_cell";
                        row.appendChild(value);

		}
		var wrapper = document.getElementById('harmonystate');
		var tableold = document.getElementById('harmonytable');
		wrapper.replaceChild( table, tableold );

	},

	/* socketNotificationReceive(notification)
	 * used to get communication from the nodehelper
	 *
	 * argument notification object - status label from nodehelper.
	 * argument payload object - Weather information received via buienradar.nl.
	 */
       	socketNotificationReceived: function(notification, payload) {

		text = document.getElementById('harmonytext');
		text.style.display = '';

		// configured succesfully
    		if (notification === "STARTED") {
			Log.info(this.name + ": configured");
			text.innerHTML = this.translate("STARTED");
		} else 
		// data received
       		if (notification === "DATA" || notification === "ERROR") {
       			// data received from node_helper.js, but empty payload
			if (!payload || payload ==="") {
				Log.warn(this.name + "no payload ");
		   		text.innerHTML = this.translate("NODATA");
			} else 
			// data received and payload to parse
			{
				this.hubs[ payload.name ] = (notification==="ERROR"?
								this.translate(payload.activity):
								payload.activity);
				this.showHubs(this.hubs);
				text.style.display = 'none'; // no need to show the status line
			}
       	 	}
                this.updateDom();
    	},

});
