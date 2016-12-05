// Initialize app
var myApp = new Framework7({
    material: true,
    swipePanel: 'left',
    modalTitle: 'Camera-File Test',
    showBarsOnPageScrollEnd: false,
    upscroller: {text : 'Back to top'},
    preprocess: function (content, url, next) {

        if (url === 'index.html') {
        // Following code will be executed for page with data-page attribute equal to "camera"
            // if(!(window.localStorage.getItem('imgProfile') === null)){
            //    // img = "data:image/jpeg;base64," + localStorage.getItem('imgProfile');
            //     img = localStorage.getItem('imgProfile');
            // }
            // else
            //     img = "";


            // if(!(window.localStorage.getItem('imgProfile2') === null)){
            //    // img = "data:image/jpeg;base64," + localStorage.getItem('imgProfile');
            //     img2 = localStorage.getItem('imgProfile2');
            // }
            // else
               // img2 = "https://lh3.googleusercontent.com/ONPtz8Sl5q3Dg76NYDuX4TzukTYwXb_cdXEIjSoLFPY5xLKvVID08o4hS0yOUrmKgOTNoRd8lQ=w5120-h3200-rw-no";
                img = "cdvfile://localhost/persistent/xivao/profile.jpg";

            var template = Template7.compile(content);
            var resultContent = template({
                imgProfile: img
            });
            return resultContent;
        }
        if (url === 'about.html') {
        // Following code will be executed for page with data-page attribute equal to "camera"
            var template = Template7.compile(content);
            var resultContent = template({
                imgProfile: img
            });
            return resultContent;
        }

    }
});

// If we need to use custom DOM library, let's save it to $$ variable:
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we want to use dynamic navbar, we need to enable it for this view:
    dynamicNavbar: true
});

// Handle Cordova Device Ready Event
$$(document).on('deviceready', function() {
    console.log("Device is ready!");

    // filepath = cordova.file.dataDirectory + "/xivao/gallery/pi-2.jpg";
    // filepath = "cdvfile://localhost/persistent/xivao/gallery/pi-2.jpg";
    // myApp.alert("filepath: "+ filepath + " is " + fileExists(filepath));

    // Camera plugin
        pictureSource=navigator.camera.PictureSourceType;
        destinationType=navigator.camera.DestinationType;

                //DownloadFile(imgURL, imgFolderName, imgFileName);
        $('#toCanvas').click(htmlToImage);  
        $('#monthImage').click(refreshImage);          
        $('#saveImage').click(saveImageToGallery);
        $('#downloadImg').click(downloadImg);
        $('#capturePhoto').click(capturePhoto);
        $('#capturePhotoEdit').click(capturePhotoEdit);
        $('#getPhotoLib').click(getPhotoLib);
        $('#getPhotoSaved').click(getPhotoSaved);
});

// Add views
var view1 = myApp.addView('#view-1');
var view2 = myApp.addView('#view-2', {
    // Because we use fixed-through navbar we can enable dynamic navbar
    dynamicNavbar: true
});
var view3 = myApp.addView('#view-3');
var view4 = myApp.addView('#view-4');


$$('#view-2').on('show', function () {
   // myApp.alert('Tab 1 is visible');
   //	     view2.router.refreshPage();
 //   	var d = new Date();
	// var n = d.getMonth();
	// var img = document.getElementById('tableBanner');
	// var imgPath = "cdvfile://localhost/persistent/xivao/gallery/pi-" + n + ".jpg";
      document.getElementById("monthImage").src = document.getElementById("monthImage").src + "?" + Math.floor(Math.random() * 9);
});

// Now we need to run the code that will be executed only for About page.

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('about', function (page) {
    // Do something here for "about" page

})

// Option 1. Using page callback for page (for "about" page in this case) (recommended way):
myApp.onPageInit('camera', function (page) {
    // if(!(window.localStorage.getItem('imgProfile') === null)){
    //     document.getElementById('tableBanner').src = window.localStorage.getItem('imgProfile');
    //     document.getElementById('resultImg').innerHTML = window.localStorage.getItem('imgProfile');
        
    // }

    	// document.getElementById('tableBanner').src = "";
        //DownloadFile(imgURL, imgFolderName, imgFileName);

        $('#saveImage').click(saveImageToGallery);
        $('#downloadImg').click(downloadImg);
        $('#capturePhoto').click(capturePhoto);
        $('#capturePhotoEdit').click(capturePhotoEdit);
        $('#getPhotoLib').click(getPhotoLib);
        $('#getPhotoSaved').click(getPhotoSaved);

})


// Option 2. Using one 'pageInit' event handler for all pages:
$$(document).on('pageInit', function (e) {
    // Get page data from event data
    var page = e.detail.page;

    if (page.name === 'about') {
        // Following code will be executed for page with data-page attribute equal to "about"
        myApp.alert('Here comes About page');
    }    
})

// Option 2. Using live 'pageInit' event handlers for each page
$$(document).on('pageInit', '.page[data-page="about"]', function (e) {
    // Following code will be executed for page with data-page attribute equal to "about"
    myApp.alert('Here comes About page');
})

/*=== With Captions ===*/
function getImageList(){
	var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var imgList = [];
	var d = new Date();
	var n = d.getMonth();
	//var imgPath = "cdvfile://localhost/persistent/xivao/gallery/pi-" + n + ".jpg";
    for(var count=0 ; count < 12 ; count++){
    	//createImgItem("cdvfile://localhost/persistent/xivao/gallery/pi-" + n + ".jpg",imgList[count] , monthNames[n]);
	    imgList[count] = {
	        url: "cdvfile://localhost/persistent/xivao/gallery/pi-" + n + ".jpg",
	        caption: monthNames[n]
        };
        n--; // the month before this
        if(n < 0)
        	n = 11; // December is 11
    }
    return imgList;
}

var myPhotoBrowserPopupDark = myApp.photoBrowser({
    photos : getImageList(),
    theme: 'dark',
    type: 'standalone'
});
$$('.pb-standalone-captions').on('click', function () {
    myPhotoBrowserPopupDark.open();
});

/************************************************************/
//      To Canvas
/************************************************************/
function htmlToImage(){
	pageToCanvas(document.getElementById('toRender'));
}

function pageToCanvas(html){
	html2canvas(html, {
	  onrendered: function(canvas) {
	    document.getElementById('monthImage').src = canvas.toDataURL("image/jpeg"); // "data:image/jpeg;base64," + canvas;
	  },
	  allowTaint: true,
	  background: '#ffffff'
	});
}

/************************************************************/
//      Camera Plugin Functions
/************************************************************/

// function dataURItoBlob(dataURI) {
//     // convert base64/URLEncoded data component to raw binary data held in a string
//     var byteString;
//     if (dataURI.split(',')[0].indexOf('base64') >= 0)
//         byteString = atob(dataURI.split(',')[1]);
//     else
//         byteString = unescape(dataURI.split(',')[1]);

//     // separate out the mime component
//     var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

//     // write the bytes of the string to a typed array
//     var ia = new Uint8Array(byteString.length);
//     for (var i = 0; i < byteString.length; i++) {
//         ia[i] = byteString.charCodeAt(i);
//     }

//     return new Blob([ia], {type:mimeString});
// }

// function fromURLtoBlob(URI) {
// alert(URI);
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', URI, true);
//     xhr.responseType = 'blob';

//     xhr.onload = function() {
//         if (this.status == 200) {
//             alert("200");
//             var blob = new Blob([this.response], { type: 'image/png' });
//            // saveFile(dirEntry, blob, "downloadedImage.png");
//            return blob;
//         }
//     };
//     xhr.send();
// }

    // Get Base64 Image with especific size
    
function getBase64Image(img) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function saveURLtoLocal(img) {
    img.src = "data:image/jpeg;base64," + getBase64Image(img);
    localStorage.setItem("imgProfile2", img.src);
}

    // Called when a photo is successfully retrieved
    //
    function onPhotoDataSuccess(imageData) {
        // Uncomment to view the base64-encoded image data
        // console.log(imageData);

        // Get image handle
        //
        var img = document.getElementById('tableBanner');

        // Unhide image elements
        //
        img.style.display = 'block';


      img.src = "data:image/jpeg;base64," + imageData;
   //   img.src = "data:image/jpeg;base64," + getBase64Image(img);

        var imgURL = img.src;
        var imgPath = "cdvfile://localhost/persistent/xivao/profile.jpg";
        DownloadImgFromURL(imgPath, imgURL);

     // localStorage.setItem("imgProfile", img.src);

    }

    // Called when a photo is successfully retrieved
    //
    // function onPhotoURISuccess(imageURI) {

    //     alert(imageURI);
    //         //var files = evt.target.files;
    //         var blob = fromURLtoBlob(imageURI);

    //         if (blob) {
    //             var reader = new FileReader();

    //             reader.onload = function(readerEvt) {
    //                 var imageData = readerEvt.target.result;
    //                 var img = document.getElementById('tableBanner');
    //                 img.src = "data:image/jpeg;base64," + btoa(imageData);
    //                // localStorage.setItem("imgProfile", img.src);
    //                 //document.getElementById("base64textarea").value = btoa(binaryString);
    //             };

    //             reader.readAsBinaryString(blob);
    //         }
    // }


    // A button will call this function
    //
    function capturePhoto() {
      // Take picture using device camera and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 50,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function capturePhotoEdit() {
      // Take picture using device camera, allow edit, and retrieve image as base64-encoded string
      navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20, allowEdit: true,
        destinationType: destinationType.DATA_URL });
    }

    // A button will call this function
    //
    function getPhoto(source) {
      // // Retrieve image file location from specified source

        navigator.camera.getPicture(onPhotoDataSuccess, onFail, { quality: 20,
        destinationType: destinationType.DATA_URL, sourceType: source });
    }

    // Called if something bad happens.
    //
    function onFail(message) {
      alert('Failed because: ' + message);
    }

    //**** Fake functions ****
    function getPhotoLib() {
        getPhoto(pictureSource.PHOTOLIBRARY);
    }

    function getPhotoSaved() {
        getPhoto(pictureSource.SAVEDPHOTOALBUM);
    }

/********************************************************/
//   File Transfer Functions 
/********************************************************/

function DownloadImgFromURL (filePath, url) {

    var fileTransfer = new FileTransfer();
    var uri = encodeURI(url);
    // console.log("Download : " + url);

    fileTransfer.download(
        uri,
        filePath,
        function(entry) {
            console.log("download complete: " + entry.fullPath);
            // add a randon number to prevent cache.
            document.getElementById('tableBanner').src = filePath + "?" + Math.floor(Math.random() * 99);
        },
        function(error) {
            console.log("download error source " + error.source);
            console.log("download error target " + error.target);
            console.log("upload error code" + error.code);
        },
        false,
        {
            headers: {
                "Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
            }
        }
    );
}

function saveImageToGallery(){
	// myApp.alert("foi");
	var d = new Date();
	var n = d.getMonth();
	var img = document.getElementById('tableBanner');
	var imgPath = "cdvfile://localhost/persistent/xivao/gallery/pi-" + Math.floor(Math.random() * 11) + ".jpg";
//	myApp.alert(imgPath);
    DownloadImgFromURL(imgPath, img.src);
   // listDir("cdvfile://localhost/persistent/xivao/gallery/");
 //   listDir(cordova.file.applicationDirectory + "xivao/gallery/");
     document.getElementById("monthImage").src = imgPath; //+ "?" + Math.floor(Math.random() * 9);

     view2.router.refreshPage();

}


function DownloadFile(URL, Folder_Name, File_Name) {
//Parameters mismatch check
if (URL == null && Folder_Name == null && File_Name == null) {
    return;
}
else {
    //checking Internet connection availablity
    var networkState = navigator.connection.type;
    if (networkState == Connection.NONE) {
        return;
    } else {
        console.log("Downloading: " + URL);
        download(URL, Folder_Name, File_Name); //If available download function call
    }
  }
}

function download(URL, Folder_Name, File_Name) {
//step to request a file system 
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, fileSystemSuccess, fileSystemFail);

function fileSystemSuccess(fileSystem) {
    console.log("downloading...");
    var download_link = encodeURI(URL);
    ext = download_link.substr(download_link.lastIndexOf('.') + 1); //Get extension of URL

    var directoryEntry = fileSystem.root; // to get root path of directory
    directoryEntry.getDirectory(Folder_Name, { create: true, exclusive: false }, onDirectorySuccess, onDirectoryFail); // creating folder in sdcard
    var rootdir = fileSystem.root;
    var fp = rootdir.fullPath; // Returns Fulpath of local directory

    fp = fp + "/" + Folder_Name + "/" + File_Name + "." + ext; // fullpath and name of the file which we want to give
    // download function call
    filetransfer(download_link, fp);
}

function onDirectorySuccess(parent) {
    // Directory created successfuly
}

function onDirectoryFail(error) {
    //Error while creating directory
    alert("Unable to create new directory: " + error.code);
}

  function fileSystemFail(evt) {
    //Unable to access file system
    alert(evt.target.error.code);
 }
}

function filetransfer(download_link, fp) {
	var fileTransfer = new FileTransfer();
	// File download function with URL and local path
	fileTransfer.download(download_link, fp,
                    function (entry) {
                        alert("download complete: " + entry.fullPath);
                    },
                 function (error) {
                     //Download abort errors or download failed errors
                     alert("download error source " + error.source);
                     //alert("download error target " + error.target);
                     //alert("upload error code" + error.code);
                 }
            );
}

// Proto functions

function downloadImg(){
    //    document.getElementById("tableBanner").src = "https://lh3.googleusercontent.com/ONPtz8Sl5q3Dg76NYDuX4TzukTYwXb_cdXEIjSoLFPY5xLKvVID08o4hS0yOUrmKgOTNoRd8lQ=w5120-h3200-rw-no";
        //saveURLtoLocal(document.getElementById("tableBanner"));
        var imgURL = "https://graph.facebook.com/10207829362552322/picture?type=large";
        var imgPath = "cdvfile://localhost/persistent/xivao/profile.jpg";
// console.log("Download cmd : " + imgURL);
        DownloadImgFromURL(imgPath, imgURL)
}

function refreshImage(){
	myApp.alert("clique");
	     view2.router.refreshPage();
}


/********************************************************/
//   File Functions 
/********************************************************/


function createImgItem(path, item, month){
	//var exists = null;

	window.resolveLocalFileSystemURL(path, 
			function (entry){
				var nativePath = entry.toURL();
		    	item = {
			        url: nativePath,
			        caption: month
		        };
		        return;
			},
			function (){
	    		item = {
			        url: "cdvfile://localhost/persistent/xivao/profile.jpg",
			        caption: month
		        };
		       	return;
			});
}

function fileExists(path){
	var exists = null;

	window.resolveLocalFileSystemURL(path, successResolve, failResolve);
	
	
	function successResolve(entry){
		// var nativePath = entry.toURL();
  //   	myApp.alert(entry + '   Native URI: ' + nativePath);
		exists = true;
	}
	function failResolve(){
		exists = false;
	}


	function sleep(ms) {
	  return new Promise(resolve => setTimeout(resolve, ms));
	}

	// while(exists == null){
	// 	sleep(500);
	// }
	// $.when( d1, d2 ).done(function ( v1, v2 ) {
	//     console.log( v1 ); // "Fish"
	//     console.log( v2 ); // "Pizza"
	// });
	return exists;
}

function win(entry) {
    console.log("New Path: " + entry.fullPath);
}

function fail(error) {
    alert(error.code);
}

function copyFile(entry) {
    var parent = document.getElementById('parent').value,
        parentName = parent.substring(parent.lastIndexOf('/')+1),
        parentEntry = new DirectoryEntry(parentName, parent);

    // copy the file to a new directory and rename it
    entry.copyTo(parentEntry, "file.copy", success, fail);
}

// function listDir(path){
//   window.resolveLocalFileSystemURL(path,
//     function (fileSystem) {
//       var reader = fileSystem.createReader();
//       reader.readEntries(
//         function (entries) {
//           myApp.alert(entries);
//         },
//         function (err) {
//           console.log(err);
//         }
//       );
//     }, function (err) {
//       console.log(err);
//     }
//   );
// }
//example: list of www/audio/ folder in cordova/ionic app.
//listDir(cordova.file.applicationDirectory + "www/audio/");


/* show the content of a directory */
function listDir(directoryEntry){
	myApp.alert(directoryEntry);
	if( !directoryEntry.isDirectory ) console.log('listDir incorrect type');
	//$.mobile.loading('show'); // show loading message
	
	currentDir = directoryEntry; // set current directory
	directoryEntry.getParent(function(par){ // success get parent
		parentDir = par; // set parent directory

		if( (parentDir.name == 'sdcard' && currentDir.name != 'sdcard') || parentDir.name != 'sdcard' ) $('#backBtn').show();
	}, function(error){ // error get parent
		console.log('Get parent error: '+error.code);
	});
	
	var directoryReader = directoryEntry.createReader();
	directoryReader.readEntries(function(entries){
		var dirContent = $('#dirContent');
		dirContent.empty();
		
		var dirArr = new Array();
		var fileArr = new Array();
		for(var i=0; i<entries.length; ++i){ // sort entries
			var entry = entries[i];
			if( entry.isDirectory && entry.name[0] != '.' ) dirArr.push(entry);
			else if( entry.isFile && entry.name[0] != '.' ) fileArr.push(entry);
		}
		
		var sortedArr = dirArr.concat(fileArr); // sorted entries
		var uiBlock = ['a','b','c','d'];
		
		for(var i=0; i<sortedArr.length; ++i){ // show directories
			var entry = sortedArr[i];
			var blockLetter = uiBlock[i%4];
			//console.log(entry.name);
			if( entry.isDirectory )
				dirContent.append('<div class="ui-block-'+blockLetter+'"><div class="folder"><p>'+entry.name+'</p></div></div>');
			else if( entry.isFile )
				dirContent.append('<div class="ui-block-'+blockLetter+'"><div class="file"><p>'+entry.name+'</p></div></div>');
		}
	//	$.mobile.loading('hide'); // hide loading message
	}, function(error){
		console.log('listDir readEntries error: '+error.code);
	});
}







function testfunc(){
	myApp.alert('Test');
}

