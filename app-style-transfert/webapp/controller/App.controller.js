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

		onUploadImage: function(){

			// var file = oEvent.mParameters.files[0];
			//var file_data = oEvent.mParameters.files[0];
			//let photo = document.getElementById("image-file").files[0];
			
			// var photo = this.getView().byId('imageUploader');
			//var pagePath = window.location.pathname;
			// let formData = new FormData();
			
			// formData.append("photo_name", photo);
			// fetch(pagePath+'resources/img', {method: "POST", body: formData});
			//This code is used for uploading documents and images

			//var oFileUploader = this.getView().byId("imageUploader");
			//oFileUploader.upload();

			// var oFileUpload = this.getView().byId("imageUploader");
			// var domRef = oFileUpload.getFocusDomRef();
			// var file = domRef.files[0];

			// jQuery.ajax({
			// 	type: "POST",
			// 	url: "/resources/php/Dispatcher.php",
			// 	action: "process",
			// 	data: file,
			// 	success: function(data){
			// 		console.log(data);
			// 	}
			// });


			// var that = this;
   
   			//This code is used for uploading image or document file
   
			// this.fileName = file.name;
			// this.fileType = file.type;
   
	 		// var reader = new FileReader();
			// reader.onload = function (e) {

   			// 	var vContent = e.currentTarget.result	 
			// 	that.updateFile(that.fileName, that.fileType, vContent);
			// }
			// reader.readAsDataURL(file);


			var filesId = this.getView().byId("imageUploader").sId + "-fu";
			var files = document.getElementById(filesId).files;
			var formData = new FormData();
			var xhttp = new XMLHttpRequest();


			formData.append("file", files[0]);

			// Set POST method and ajax file path
			xhttp.open("POST", "../webapp/resources/php/Dispatcher.php", true);

			// Send request with data
			xhttp.send(formData);

			
			//set elements visble 
			this.getView().byId('imgTile').setBackgroundImage('resources/img/'+files[0].name);
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
			// var sResponse = oEvent.getParameter("response"),
			var sResponse = oEvent.getParameter("status"),
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
			//change file name to processed img			
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
