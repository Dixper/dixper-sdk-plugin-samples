function createAudioMeter(audioContext, clipLevel, averaging, clipLag) {
  let processor = audioContext.createScriptProcessor(512);
  processor.onaudioprocess = volumeAudioProcess;
  processor.clipping = false;
  processor.lastClip = 0;
  processor.volume = 0;
  processor.clipLevel = clipLevel || 0.98;
  processor.averaging = averaging || 0.95;
  processor.clipLag = clipLag || 750;

  // this will have no effect, since we don't copy the input to the output,
  // but works around a current Chrome bug.
  processor.connect(audioContext.destination);

  processor.checkClipping = function () {
    if (!this.clipping) return false;
    if (this.lastClip + this.clipLag < window.performance.now())
      this.clipping = false;
    return this.clipping;
  };

  processor.shutdown = function () {
    this.disconnect();
    this.onaudioprocess = null;
  };

  return processor;
}

function volumeAudioProcess(event) {
  let buf = event.inputBuffer.getChannelData(0);
  let bufLength = buf.length;
  let sum = 0;
  let x;

  // Do a root-mean-square on the samples: sum up the squares...
  for (let i = 0; i < bufLength; i++) {
    x = buf[i];
    if (Math.abs(x) >= this.clipLevel) {
      this.clipping = true;
      this.lastClip = window.performance.now();
    }
    sum += x * x;
  }

  // ... then take the square root of the sum.
  let rms = Math.sqrt(sum / bufLength);

  // Now smooth this out with the averaging factor applied
  // to the previous sample - take the max here because we
  // want "fast attack, slow release."
  this.volume = Math.max(rms, this.volume * this.averaging);
}

let audioContext = null;
let meter = null;
let canvasContext = null;
let WIDTH = 2000;
let HEIGHT = 500;
let rafID = null;

function starMicrophone() {
  console.log("starMicrophone");

  window.onload = function () {
    // tomar el canvas
    canvas = document.createElement("canvas");
    canvas.width = WIDTH;
    canvas.height = HEIGHT;
    canvasContext = canvas.getContext("2d");
    document.body.insertBefore(canvas, document.body.childNodes[0]);

    // canvasContext = document.getElementById("meter").getContext("2d");

    // monkeypatch Web Audio
    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    // tomar un contexto de audio
    audioContext = new AudioContext();

    // Intenta obtener entrada de audio
    try {
      // monkeypatch getUserMedia
      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

      // pide una entrada de audio
      navigator.getUserMedia(
        {
          audio: {
            mandatory: {
              googEchoCancellation: "false",
              googAutoGainControl: "false",
              googNoiseSuppression: "false",
              googHighpassFilter: "false",
            },
            optional: [],
          },
        },
        onMicrophoneGranted,
        onMicrophoneDenied
      );
    } catch (e) {
      alert("getUserMedia threw exception :" + e);
    }
  };

  function onMicrophoneDenied() {
    alert("Stream generation failed.");
  }

  let mediaStreamSource = null;

  function onMicrophoneGranted(stream) {
    // Cree un AudioNode a partir de la transmisión.
    mediaStreamSource = audioContext.createMediaStreamSource(stream);

    console.log("audio", audioContext);
    // Cree un nuevo medidor de volumen y conéctelo.
    meter = createAudioMeter(audioContext);

    mediaStreamSource.connect(meter);

    // iniciar la actualización visual
    onLevelChange();
  }

  function onLevelChange(time) {
    // limpiar el fondo

    canvasContext.clearRect(0, 0, WIDTH, HEIGHT);

    // compruebe si actualmente estamos recortando
    if (meter.checkClipping()) canvasContext.fillStyle = "red";
    else canvasContext.fillStyle = "green";

    //   medidor de volumen
    console.log(meter.volume);

    // dibuja una barra basada en el volumen actual
    canvasContext.fillRect(0, 0, meter.volume * WIDTH * 1.4, HEIGHT);

    // configurar la siguiente devolución de llamada visual
    rafID = window.requestAnimationFrame(onLevelChange);
  }

  // // TEST DESKTOP
  // class DixperPluginSample extends DixperSDKLib {
  //   constructor() {
  //     super();
  //     console.log("DixperPluginSample ");
  //   }
  // }

  // const dixperPluginSample = new DixperPluginSample();
}
starMicrophone();
