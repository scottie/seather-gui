const electron = require('electron')
const {app, BrowserWindow} = electron
var ipc = require('electron').ipcMain;
var crypt = require("crypto");
var fs = require("fs");

var win = null;

//console.log("got window");

app.on("ready", function() {
  win = new BrowserWindow({width:500,height:400,x:100,y:100, frame:true, resizable:false, 'auto-hide-menu-bar':true});
  win.on("closed", function() {
    win = null;
  });
  win.loadURL("file:///"+__dirname+"/index.html");
  win.show();

  ipc.on('encrypt', function(event, arg) {
    //console.log(arg.filename);
    getenc(arg.filename, arg.password, function(err,res){
      if(err) {event.returnValue = "Error during encryption:"+res}
      event.returnValue = res;
    });

  });

  ipc.on('decrypt', function(event, arg) {
    //console.log(arg);
    getdec(arg.filename, arg.password, function(err,res){
      if(err) {event.returnValue = "Error during encryption:"+res}
      event.returnValue = res;
    });

  });

});

var getenc = function(file, pwd, cb) {
  // null checking.
  fs.readFile(file,{encoding:'utf8'}, function(err, data){
    if(err) { console.log("error reported in reading file "); cb(new Error(), "ERROR:Reading file"); }

    if(data != null || data != undefined ) {
      var cipher = crypt.createCipher("aes-256-ctr", pwd);
      var crypted = cipher.update(data,'utf8','base64');
      crypted += cipher.final('base64');

      fs.writeFile(file+".enc", crypted,{encoding:'utf8'}, function(err) {
        if(err) { console.log("error reported in writing to file "+file+".enc"); cb(new Error(), "ERROR:Writing file"); }
        else { console.log(" Encrypted file created and written to file "+file+".enc");
          cb(null, " Encrypted file created and written to file "+file+".enc")
        }
      });
    }
  });
}

var getdec = function(file, pwd, cb) {
  fs.readFile(file,{encoding:'utf8'}, function(err, data){
    if(err) { console.log("error reported in reading file "); cb(new Error(), "ERROR:Reading file"); }
    //console.log(data);
    if(data != null || data != undefined ) {
      var dcipher = crypt.createDecipher("aes-256-ctr", pwd);
      var crypted = dcipher.update(data, 'base64', 'utf8');
      crypted += dcipher.final('utf8');

      fs.writeFile(file+".dec", crypted,{encoding:'utf8'}, function(err) {
        if(err) { console.log("error reported in writing to file "+file+".dec"); cb(new Error(), "ERROR:Writing file"); }
        else { console.log(" Encrypted file created and written to file "+file+".dec");
          cb(null, " Decrypted file created and written to file "+file+".dec")
        }
      });
    }
  });


}
