document.addEventListener("deviceready", onDeviceReady, false);
//Fix :active state on device
document.addEventListener("touchstart", function () {}, false);

var mediaPlayer;

function onDeviceReady() {
    navigator.splashscreen.hide();
    mediaPlayer = new MediaPlayer();
    mediaPlayer.run();
}

function MediaPlayer() {}

MediaPlayer.prototype = {
    mediaContent: null,
    isPlaying: false,

    run: function () {
        var that = this,
            src = "https://bs3.cdn.telerik.com/v1/fZLL4SCIzsQwpuFR/f0954f80-4100-11e4-a383-51ae1f9d68d6";


        var recordAudioButton = document.getElementById("buttonRecordAudio"),
            pauseAudioButton = document.getElementById("buttonPauseAudio");

        recordAudioButton.addEventListener("click",
            function () {
                that._play.apply(that, arguments)
            });

        pauseAudioButton.addEventListener("click",
            function () {
                that._pause.apply(that, arguments)
            });

        that.mediaContent = new Media(src,
            function () {
                that._onMediaSuccess.apply(that, arguments);
            },
            function () {
                that._onError.apply(that, arguments);
            },
            function () {
                that._onMediaStatusChanged.apply(that, arguments);
            });
    },

    _onMediaSuccess: function () {
        console.log("mediaSuccess");
    },

    _onError: function (error) {
        var errorMessage;

        if (typeof error === "string") {
            errorMessage = error;
        } else {
            errorMessage = "code: " + error.code + "\n" +
                "message: " + error.message + "\n";
        }

        this._showMessage(errorMessage);
        this.isPlaying = false;
    },

    _onMediaStatusChanged: function (status) {
        console.log("Media status: " + status);
    },

    _play: function () {
        document.getElementById("vid1").currentTime = 0;
        document.getElementById("vid1").muted = true;
        document.getElementById("progressBar").style.display = 'block';
        document.getElementById("progressBar").value = 0;
        myVar = setInterval(function () {
            document.getElementById("progressBar").value += 1;
            if (document.getElementById("progressBar").value == 18) {
                var div = document.createElement("div");
                div.className = "content";
                div.innerHTML = '<img width="50px" src="https://bs2.cdn.telerik.com/v1/fZLL4SCIzsQwpuFR/530a19c0-411f-11e4-a443-79216ef657d9"><progress id ="progressBar" value="0" max="18">0 %</progress><video id="vid1" width="100%" height="200" autoplay loop><source src="https://bs3.cdn.telerik.com/v1/fZLL4SCIzsQwpuFR/2753c630-40fe-11e4-ac5e-95ea1e7f9165" type="video/mp4"></video> <div class="buttons"><button class="button dh" id="buttonRecordAudio">Record</button><button class="button dh" id="buttonPauseAudio">Pause</button><button class="button dh" id="addFriends">Add Friends</button></div>';     
                document.body.insertBefore(div, document.body.firstChild);
                document.getElementById("progressBar").value = 0;
                document.getElementById("vid1").mute = false;
                window.clearInterval(myVar);
                document.getElementById("progressBar").display = 'none';
            }
        }, 1000);
        if (this.isPlaying === false) {
            this.mediaContent.play();
            this._showMessage('Playing...');
            this.isPlaying = true;
        }
    },

    _pause: function () {
        var player = document.getElementById("vid1");
        if (player.paused) {
            player.play();
            myVar = setInterval(function () {
                document.getElementById("progressBar").value += 1;
            }, 1000);
        } else {
            player.pause();
            window.clearInterval(myVar);
        }
        if (this.isPlaying === true) {
            this.mediaContent.pause();
            this._showMessage('Paused');
            this.isPlaying = false;
        }
    },

    _stop: function () {
        this.mediaContent.stop();
        this._showMessage('');
        this.isPlaying = false;
    },

    _showMessage: function (text) {
        var statusBox = document.getElementById('result');
        statusBox.innerText = text;
    }
}