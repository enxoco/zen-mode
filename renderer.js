// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.


var remote = require('electron').remote;
const {ipcRenderer} = require('electron');
arguments = remote.getGlobal('sharedObject').prop1;
let timer = (arguments[arguments.length - 1] * 1000)
document.getElementById("url-list").innerHTML = (timer / 1000) + ' seconds'
var currentTime = timer
var msgDiv = document.getElementById('message')
var zSettings = document.getElementById('zSettings')
Number.prototype.toHHMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours + ':' + minutes + ':' + seconds;
}
if (timer) {
    zSettings.style.display = 'none'
    setInterval(function(){
        currentTime -= 1000
        document.getElementById("url-list").innerHTML = (currentTime / 1000).toHHMMSS()
    
    },1000)
    setTimeout(function(){ipcRenderer.send('quit')}, timer)
} else {
    msgDiv.style.display = 'none'
}

document.getElementById('zActivate').addEventListener('click', function(){
    msgDiv.style.display = 'block'
    timer = Number(document.getElementById('zTimer').value) * 60000
    currentTime = timer
    document.getElementById('zSettings').style.display = 'none'
    setInterval(function(){
        currentTime -= 1000
        document.getElementById("url-list").innerHTML = (currentTime / 1000).toHHMMSS()
    
    },1000)
    setTimeout(function(){ipcRenderer.send('quit')}, timer)
})