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
						"format": "jpg",
						"link": "https://1.bp.blogspot.com/-FpJf3U_amU8/Xb63rMBTGtI/AAAAAAAIrlI/f0DYf4ix8zwYFDnQWHpxzZ3QguZ3NfxZACLcBGAsYHQ/s1600/Julien%2BRaynaud%2B%25282%2529.jpg"
					},
					{
						"id": "twilight",
						"title": "Twilight",
						"artist": "Hale Woodruff",
						"format": "jpg",
						"link": "https://i.pinimg.com/originals/df/0c/fd/df0cfd2ca3ecb465beb1e9c9bb74a3c7.jpg"
					},
					{
						"id": "nuit-etoilee",
						"title": "Nuit étoilée",
						"artist": "Van Gogh",
						"format": "jpg",
						"link": "https://www.kazoart.com/blog/wp-content/uploads/2017/03/van-gogh-la-nuit-etoilee-1.jpg"
					},
					{
						"id": "guernica",
						"title": "Guernica",
						"artist": "Pablo Picasso",
						"format": "png",
						"link": "https://www.connaissancedesarts.com/wp-content/uploads/2021/03/guernica-onu-1.jpg"
					},
					{
						"id": "diptyque-marilyn",
						"title": "Diptyque Marilyn",
						"artist": "Andy Warhol",
						"format": "png",
						"link": "https://img2.freepng.fr/20180524/rvl/kisspng-marilyn-monroe-marilyn-diptych-campbell-s-soup-can-5b078864d85e17.9273665915272203248863.jpg"
					},
					{
						"id": "compliment",
						"title": "Compliment",
						"artist": "Frantisek Kupka",
						"format": "png",
						"link": "https://blog.artsper.com/wp-content/uploads/2018/12/thumb_large.jpg"
					},
					{
						"id": "abstract",
						"title": "Abstract",
						"artist": "Unknown",
						"format": "jpg",
						"link": "https://www.artmajeur.com/medias/standard/s/c/schreiber-patrice/artwork/10929673_100-1032.jpg"
					},
					{
						"id": "the-great-wave-of-kanagawa",
						"title": "The great wave of Kanagawa",
						"artist": "Katsuki Hokusai",
						"format": "png",
						"link": "https://upload.wikimedia.org/wikipedia/commons/a/a5/Tsunami_by_hokusai_19th_century.jpg"
					},
					{
						"id": "autoportrait-a-la-casquette",
						"title": "Autoportrait à la casquette",
						"artist": "André Derain",
						"format": "png",
						"link": "https://i.pinimg.com/originals/cd/a2/27/cda227bd429d7ea27bd47e3b18e9a0b4.jpg"
					},
					{
						"id": "lestaque",
						"title": "L'Estaque",
						"artist": "André Derain",
						"format": "png",
						"link": "https://img.over-blog-kiwi.com/1/47/74/15/20190505/ob_b8de79_derain-theturningroad-l-estaque-1906.jpg"
					},
					{
						"id": "contemporain",
						"title": "Contemporain",
						"artist": "Unknown",
						"format": "png",
						"link": "https://urdla.com/blog/wp-content/uploads/2019/08/deleglise0710-copie-1.jpg"
					},
					{
						"id": "lichtung",
						"title": "Lichtung",
						"artist": "Dagmar Vogt",
						"format": "png",
						"link": "https://cdn.singulart.com/artworks/pictures/cropped/323/481/fhd/481_db1778b9c154d42790124de7d94f8a7b.jpeg"
					},
					{
						"id": "vue-de-collioure",
						"title": "Vue de Collioure",
						"artist": "André Derain",
						"format": "png",
						"link": "https://live.staticflickr.com/7835/32490437447_09729cb799_b.jpg"
					},
					{
						"id": "lever-du-soleil",
						"title": "Lever du soleil",
						"artist": "Otto Dix",
						"format": "png",
						"link": "https://wahooart.com/Art.nsf/O/8LT3CL/$File/Otto-Dix-Sunrise.jpg"
					},
					{
						"id": "girly",
						"title": "Girly",
						"artist": "Unknown",
						"format": "jpg",
						"link": "https://wallpaperaccess.com/full/958076.jpg"
					},
					{
						"id": "color-talk",
						"title": "Color talk",
						"artist": "Picasso",
						"format": "png",
						"link": "https://m.media-amazon.com/images/I/51F7Watf59L._AC_SX450_.jpg"
					},
					{
						"id": "sans-titre",
						"title": "Sans titre",
						"artist": "JonOne",
						"format": "png",
						"link": "https://galerie-provost-hacker.com/wp-content/uploads/2020/05/bd-2019-le-depart-acrylique-et-encre-sur-toile-150-x-142-cm-jonone-2019-repro-706-460x460-1.jpg"
					}
				]

				//set visible false for each artwork
				for(var i = 0; i < oData.length; i++){
					oData[i].visible = false;
				}
				
				var oModel = new JSONModel();
				oModel.setData(oData);
				this.getView().byId('artworks').setModel(oModel);

			}.bind(this);	

		},

		onChooseImg: function(){

			var url = this.getView().byId("inputUrl").getValue();
			this.onValidateUrl(url);
		},

		onValidateUrl: function(url){
			if(url.match(/\.(jpeg|jpg|png)$/) != null){
				this.onUploadImage(url);
			}else{
				this.getView().byId("inputUrl").setValue("");
				MessageToast.show("Invalid image link !");
			}
		},

		onReset: function (){
			window.location.reload();
		},

		onUploadImage: function(url){
			
			this.getView().byId('imgTile').setBackgroundImage(url);
			this.getView().byId('imgTile').setVisible(true);
			this.getView().byId('inputImgBox').setVisible(false);

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
			var sLink = oEvent.getSource().mProperties.ariaLabel;
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
			this.getView().byId('styleChoosen').setAriaLabel(sLink);
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

			this.byId("myPopover").close();
		},


		handleUploadComplete: function(oEvent) {

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

			this.getView().byId('busybox').setVisible(true);

			setTimeout(function(){
				this.getView().byId('busybox').setVisible(false);
			}.bind(this), 5000);


			var inputStyleLink = this.getView().byId('styleChoosen').getAriaLabel();
			var inputImgLink = this.getView().byId('imgTile').getBackgroundImage();

			this.getView().byId('choices').setVisible(false);

			/////DEEPAI/////
			deepai.setApiKey('8d8f1046-9f13-4f0f-9bbd-9baa9a3246fe');

			(async function() {
				var resp = await deepai.callStandardApi("fast-style-transfer", {
						content: inputImgLink,
						style: inputStyleLink,
				});
				this.getView().byId('processedImg').setSrc(resp.output_url);
				this.getView().byId('after').setVisible(true);
			}).bind(this)()
			/////DEEPAI/////
			
		},

		onDownload: function(){
			var img = this.getView().byId('processedImg').getSrc();
			var link = document.createElement('a');
			link.href = img;
			link.download = 'ProcessedImg.png';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);

		},

		onLoad: function(){
			MessageToast.show('yes');

		}

	});

});
