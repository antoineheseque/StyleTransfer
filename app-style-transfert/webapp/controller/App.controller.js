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

		onReset: function (){
			window.location.reload();
		},

		onUploadImage: function(oEvent){

			// var file = oEvent.mParameters.files[0];
			var pagePath = window.location.pathname;
			var form_data = new FormData();
			var file_data = oEvent.mParameters.files[0];

			form_data.append("file_name", file_data);

			jQuery.ajax({
                url: pagePath + "resources/img",
                cache: false,
                contentType: false,
                processData: false,
                async: false,
                data: form_data,
                type: 'post',
                success: function(data) {
                    // display image
					var rep=data;
                }

			});

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
		},

		onProcess: function(){
			this.getView().byId('choices').setVisible(false);			
			this.getView().byId('processedImg').setSrc('resources/imgprocessed/processed.jpg');
			this.getView().byId('after').setVisible(true);
		},

		onDownload: function(){
			var img = this.getView().byId('processedImg').getSrc();
			var link = document.createElement('a');
			link.href = img;
			link.download = 'ProcessedImg.jpg';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}

	});

});
