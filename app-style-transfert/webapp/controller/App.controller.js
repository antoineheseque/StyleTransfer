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

			//get artists infos by the API
			let request = new XMLHttpRequest();

			request.open('GET', 'https://style-transfer-isen.herokuapp.com/api/v1/artworks', true);
			request.send();
			request.onload = function () {

				// var oData = request.responseText;
				var oData = [
					{
						"id": "por-amor-al-arte",
						"title": "Por amor al arte",
						"artist": "Julien Raynaud",
						"format": "jpg"
					},
					{
						"id": "twilight",
						"title": "Twilight",
						"artist": "Hale Woodruff",
						"format": "jpg"
					},
					{
						"id": "nuit-etoilee",
						"title": "Nuit étoilée",
						"artist": "Van Gogh",
						"format": "jpg"
					},
					{
						"id": "guernica",
						"title": "Guernica",
						"artist": "Pablo Picasso",
						"format": "png"
					},
					{
						"id": "diptyque-marilyn",
						"title": "Diptyque Marilyn",
						"artist": "Andy Warhol",
						"format": "png"
					},
					{
						"id": "compliment",
						"title": "Compliment",
						"artist": "Frantisek Kupka",
						"format": "png"
					},
					{
						"id": "abstract",
						"title": "Abstract",
						"artist": "Unknown",
						"format": "png"
					},
					{
						"id": "the-great-wave-of-kanagawa",
						"title": "The great wave of Kanagawa",
						"artist": "Katsuki Hokusai",
						"format": "png"
					},
					{
						"id": "autoportrait-a-la-casquette",
						"title": "Autoportrait à la casquette",
						"artist": "André Derain",
						"format": "png"
					},
					{
						"id": "lestaque",
						"title": "L'Estaque",
						"artist": "André Derain",
						"format": "png"
					},
					{
						"id": "contemporain",
						"title": "Contemporain",
						"artist": "Unknown",
						"format": "png"
					},
					{
						"id": "lichtung",
						"title": "Lichtung",
						"artist": "Dagmar Vogt",
						"format": "png"
					},
					{
						"id": "vue-de-collioure",
						"title": "Vue de Collioure",
						"artist": "André Derain",
						"format": "png"
					},
					{
						"id": "lever-du-soleil",
						"title": "Lever du soleil",
						"artist": "Otto Dix",
						"format": "png"
					},
					{
						"id": "girly",
						"title": "Girly",
						"artist": "Jean-Nicolas Gaillard",
						"format": "png"
					},
					{
						"id": "color-talk",
						"title": "Color talk",
						"artist": "Picasso",
						"format": "png"
					},
					{
						"id": "sans-titre",
						"title": "Sans titre",
						"artist": "JonOne",
						"format": "png"
					}
				]

				//set visible false for each artwork
				for(var i = 0; i < oData.length; i++){
					oData[i].visible = false;
				}
				
				var oModel = new JSONModel();
				oModel.setData(oData);
				this.getView().byId('artworks').setModel(oModel);
				//alert(oData);

			}.bind(this);	

			//delete saved input image
			jQuery.ajax({
				type: "POST",
				url: './resources/php/Delete.php'
			});

		},

		onReset: function (){
			window.location.reload();
		},

		onUploadImage: function(){

			var filesId = this.getView().byId("imageUploader").sId + "-fu";
			var files = document.getElementById(filesId).files;
			var formData = new FormData();
			var xhttp = new XMLHttpRequest();


			formData.append("file", files[0]);

			// Set POST method and ajax file path
			xhttp.open("POST", "../webapp/resources/php/Upload.php", true);

			// Send request with data
			xhttp.send(formData);

			//set elements visble 
			this.getView().byId('imgTile').setBackgroundImage('resources/img/'+files[0].name);
			this.getView().byId('imgTile').setVisible(true);
			this.getView().byId('imageUploader').setVisible(false);

			var oArtworks =  this.getView().byId('artworks').getModel().getData();
			for(var i = 0; i < oArtworks.length; i++){
				oArtworks[i].visible = true;
			}
			
			var oModel = new JSONModel();
			oModel.setData(oArtworks);
			this.getView().byId('artworks').setModel(oModel);
			this.getView().byId('stylesTitle').setVisible(true);
		},

		onSelectArtist: function(oEvent){

			var sSourceImg = oEvent.getSource().mProperties.backgroundImage;
			var sArtist = oEvent.getSource().mProperties.imageDescription;

			var oArtworks =  this.getView().byId('artworks').getModel().getData();
			for(var i = 0; i < oArtworks.length; i++){
				oArtworks[i].visible = false;
			}
			var oModel = new JSONModel();
			oModel.setData(oArtworks);
			this.getView().byId('artworks').setModel(oModel);

			this.getView().byId('styleChoosen').setBackgroundImage(sSourceImg);
			this.getView().byId('styleChoosen').setImageDescription(sArtist);
			this.getView().byId('styleChoosen').setVisible(true);
			this.getView().byId('artistChoosen').setText(sArtist);
			this.getView().byId('artistChoosen').setVisible(true);
			this.getView().byId('run').setVisible(true);

		},

		onChangeArtist: function(){

			var oArtworks =  this.getView().byId('artworks').getModel().getData();
			for(var i = 0; i < oArtworks.length; i++){
				oArtworks[i].visible = true;
			}
			var oModel = new JSONModel();
			oModel.setData(oArtworks);
			this.getView().byId('artworks').setModel(oModel);

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

			$.ajax({
				type: "POST",
				url: "./resources/python/process.py",
				success: function(data){
					var response = JSON.stringify(data);
				}
			});
			//
			
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
