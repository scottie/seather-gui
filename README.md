
#fcrypt
===========
Simple UI based on electron using Javascript - to encrypt, decrypt a file.(aes256)

#Introduction

This simple/basic desktop application developed using Javascript (electron, Node.js), Bootstrap,JQuery and html provides simple user interface & functionality as a sample ** for non-production use,  learning purpose only **.
Intention of this sample is to demonstrate desktop application development using web based technologies for both User Interface & functionality:

##Technologies:
- Html, CSS (Bootstrap),
- Javascript: Node.js, Electron


## functionality/Feature
1. Encrypt or Decrypt selected file, one at a time.
2. File resulting from encryption or decryption shall be saved in the same folder with extn .enc - for  encryption and .dec for decryption.
3. Both encryption and decryption uses hardcoded cipher as "aes-256-ctr" of node.js module.

#### Electron - a development framework enables users to develop cross platform desktop application using  Javascript - see URL: http://electron.atom.io for detailed information ).


##To try this sample:
1. Install electron (electron executable to be available in the path)
2. Checkout fcrypt.git and change to the folder and run command: electron .
- This assumes electron in the path and inside fcrypt project folder.
- Alternately, checkout the application and execute: electron <path to app>

Note: This requires internet connection for bootstrap css to be downloaded.
Alternately edit the html file to point to a local bootstrap file for this app to work offline.

###Additional reading:
======================
- Electron: Documenation from http://electron.atom.io/docs/latest/tutorial/quick-start/
- Node.js: https://nodejs.org/
