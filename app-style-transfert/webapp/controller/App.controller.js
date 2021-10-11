sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/format/DateFormat",
	"sap/ui/thirdparty/jquery",
	"sap/ui/model/Filter",
	"sap/ui/Device",
	"sap/base/Log",
	"sap/ui/model/FilterOperator"
], function (Controller, MessageToast, JSONModel, Device, Log, Filter, FilterOperator) {
	"use strict";

	return Controller.extend("Quickstart.view.App", {

		/**
		 * Initialisation de l'application
		 */
		onInit: function () {

		},

		onUploadImage: function(){

			//var oFileUploader = this.byId("imageUploader").files[0];
			//var sName = oFileUploader.mProperties.value;

			//jquery request to get response: 
			//0 no  problem with file propreties
			//1 problem 
			//send directly image to process in php

			//set elements visble 
			this.getView().byId('imgTile').setBackgroundImage('resources/img/chat.jpg');
			this.getView().byId('imgTile').setVisible(true);
			this.getView().byId('imageUploader').setVisible(false);
			this.getView().byId('styles1').setVisible(true);
			this.getView().byId('styles2').setVisible(true);
			this.getView().byId('styles3').setVisible(true);
			this.getView().byId('stylesTitle').setVisible(true);
		},

		onSelectArtist: function(oEvent){

			var sSourceImg = oEvent.getSource().mProperties.backgroundImage;
			var sArtist = oEvent.getSource().mProperties.imageDescription;

			this.getView().byId('styles1').setVisible(false);
			this.getView().byId('styles2').setVisible(false);
			this.getView().byId('styles3').setVisible(false);
			
			this.getView().byId('styleChoosen').setBackgroundImage(sSourceImg);
			this.getView().byId('styleChoosen').setImageDescription(sArtist);
			this.getView().byId('styleChoosen').setVisible(true);
			this.getView().byId('artistChoosen').setText(sArtist);
			this.getView().byId('artistChoosen').setVisible(true);
			this.getView().byId('run').setVisible(true);

		},

		onChangeArtist: function(){

			this.getView().byId('styles1').setVisible(true);
			this.getView().byId('styles2').setVisible(true);
			this.getView().byId('styles3').setVisible(true);
			this.getView().byId('stylesTitle').setVisible(true);

			this.getView().byId('styleChoosen').setVisible(false);
			this.getView().byId('artistChoosen').setVisible(false);
			this.getView().byId('run').setVisible(false);

		},

		handleCloseButton: function (oEvent) {
			// note: We don't need to chain to the _pPopover promise, since this event-handler
			// is only called from within the loaded dialog itself.
			this.byId("myPopover").close();
		},


		handleUploadComplete: function(oEvent) {
			var sResponse = oEvent.getParameter("response"),
				iHttpStatusCode = parseInt(/\d{3}/.exec(sResponse)[0]),
				sMessage;

			if (sResponse) {
				sMessage = iHttpStatusCode === 200 ? sResponse + " (Upload Success)" : sResponse + " (Upload Error)";
				MessageToast.show(sMessage);
			}
		},

		handleTypeMissmatch: function(oEvent) {
			var aFileTypes = oEvent.getSource().getFileType();
			aFileTypes.map(function(sType) {
				return "*." + sType;
			});
			MessageToast.show("The file type *." + oEvent.getParameter("fileType") +
									" is not supported. Choose one of the following types: " +
									aFileTypes.join(", "));
		}

	});

});
