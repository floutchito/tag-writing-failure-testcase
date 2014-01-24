/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var NFC_EVENT;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        //app.receivedEvent('deviceready');
        nfc.addNdefListener(
	        function(nfcEvent) {
	            // ignore what's on the tag
	            console.log("preparing to write tag");
                console.log(nfcEvent);
                NFC_EVENT = nfcEvent;
	            console.log("OK!");
	
	        }, 
	        function() { console.log("listening for NDEF tags"); }, 
	        function(error) { console.log("Error registering NDEF listener " + error); } 
	    );
	    
	    
	    nfc.addNdefFormatableListener(
        	function(nfcEvent) {
	            // ignore what's on the tag
	            console.log("preparing to write tag if NdefFormatable");
                console.log(nfcEvent);
                NFC_EVENT = nfcEvent;
	            console.log("OK!");
	
	        }, 
	        function() { console.log("listening for NDEF FORMATABLE tags"); }, 
	        function(error) { console.log("Error registering NDEF FORMATABLE listener " + error); } 
        );
        
        //if (device.platform == "Android") {

            // Android reads non-NDEF tag. BlackBerry and Windows don't.
            nfc.addTagDiscoveredListener(
                function(nfcEvent) {
		            // ignore what's on the tag
		            console.log("preparing to write tag if Non-NDEF");
                	console.log(nfcEvent);
                	NFC_EVENT = nfcEvent;
		            console.log("OK!");
		
		        }, 
		        function() { console.log("listening for NON-NDEF tags"); }, 
		        function(error) { console.log("Error registering NON-NDEF listener " + error); } 
            );

            nfc.addMimeTypeListener(
                'tko/ty',
                function(nfcEvent) {
		            // ignore what's on the tag
		            console.log("preparing to write tag if tko/ty");
                	console.log(nfcEvent);
                	NFC_EVENT = nfcEvent;
		            console.log("OK!");
		
		        }, 
		        function() { console.log("listening for MIME NDEF tags"); }, 
		        function(error) { console.log("Error registering MIME NDEF listener " + error); } 
            );
            
        //}
    },
    clickedWriteButton: function(){
    	var message = [
    		ndef.mimeMediaRecord("tko/ab", nfc.stringToBytes("0")),
    		ndef.mimeMediaRecord("tko/ac", nfc.stringToBytes("Some text")),
    		ndef.mimeMediaRecord("tko/ad", nfc.stringToBytes("Some other text")),
    		ndef.mimeMediaRecord("tko/ae", nfc.stringToBytes("45"))
    	];
    	app.writeTag( message );
    },
    writeTag: function( message ) {

		nfc.write(
	        message,
	        app.onTagWritten(),
	        function (reason) {
	            app.onTagWritingError( reason );
	        }
		);
	},
    onTagWritten: function(){
    		
    	console.log( "Tag successfully written by " + NFC_EVENT.type );
    },
    onTagWritingError: function( e ){
    	
		console.log( "Tag writing failed : " + e + "for handler " + NFC_EVENT.type );
    }
};
