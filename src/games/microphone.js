function createAudioMeter(audioContext, clipLevel, averaging, clipLag) {
  var processor = audioContext.createScriptProcessor(512);
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
  var buf = event.inputBuffer.getChannelData(0);
  var bufLength = buf.length;
  var sum = 0;
  var x;

  // Do a root-mean-square on the samples: sum up the squares...
  for (var i = 0; i < bufLength; i++) {
    x = buf[i];
    if (Math.abs(x) >= this.clipLevel) {
      this.clipping = true;
      this.lastClip = window.performance.now();
    }
    sum += x * x;
  }

  // ... then take the square root of the sum.
  var rms = Math.sqrt(sum / bufLength);

  // Now smooth this out with the averaging factor applied
  // to the previous sample - take the max here because we
  // want "fast attack, slow release."
  this.volume = Math.max(rms, this.volume * this.averaging);
}

var audioContext = null;
var meter = null;
var canvasContext = null;
var WIDTH = 2000;
var HEIGHT = 500;
var rafID = null;
let actionDisponible = true;

function starMicrophone() {
  console.log("starMicrophone");

  // window.onload = function () {
  // tomar el canvas
  canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  canvasContext = canvas.getContext("2d");
  document.body.insertBefore(canvas, document.body.childNodes[0]);

  //   canvasContext = document.getElementById("meter").getContext("2d");

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
}

function onMicrophoneDenied() {
  alert("Stream generation failed.");
}

var mediaStreamSource = null;

function onMicrophoneGranted(stream) {
  // Cree un AudioNode a partir de la transmisiÃ³n.
  mediaStreamSource = audioContext.createMediaStreamSource(stream);

  console.log("audio", audioContext);
  // Cree un nuevo medidor de volumen y conÃ©ctelo.
  meter = createAudioMeter(audioContext);

  mediaStreamSource.connect(meter);

  // iniciar la actualizaciÃ³n visual
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
  if (meter.volume > 0.2 && actionDisponible) {
    actionDisponible = false;
    sendJumpscare();
    setTimeout(() => {
      actionDisponible = true;
    }, 10000);
    console.log("action");
  }

  // dibuja una barra basada en el volumen actual
  canvasContext.fillRect(0, 0, meter.volume * WIDTH * 1.4, HEIGHT);

  // configurar la siguiente devoluciÃ³n de llamada visual
  rafID = window.requestAnimationFrame(onLevelChange);
}

// TEST DESKTOP
class DixperPluginSample extends DixperSDKLib {
  constructor() {
    super();
    console.log("DixperPluginSample ");
  }
}

const dixperPluginSample = new DixperPluginSample();

starMicrophone();

const sendJumpscare = () => {
  dixperPluginSample.addActions(
    JSON.stringify([
      {
        ttl: 10000,
        actions: [
          {
            inputKey: "render-texture-0-0",
            scope: "{{scope}}",
            key: "render-texture",
            component: "graphics",
            type: "render-texture",
            version: 1,
            action: "start",
            metadata: {
              file: "{{file}}",
              textureProperties: {
                width: "{{width}}",
                height: "{{height}}",
                position: "{{position}}",
                fadeIn: "{{fade}}",
              },
            },
            tt0: "{{tt0}}",
            ttl: "{{ttl}}",
          },
          {
            inputKey: "sound-0-1",
            scope: "{{scope}}",
            key: "sound",
            metadata: { file: "{{file}}", volume: "{{volume}}" },
            tt0: "{{tt0}}",
            ttl: "{{ttl}}",
          },
        ],
      },
    ]),
    {
      "file||sound-0-1":
        "https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/skills%2FIUvnTvzg4RsRUwoll9pZ%2FAudio%20bicho%20cara%20fea.mp3?alt=media&token=a08c25ff-c138-4d2d-93f1-106106766ec0",
      "ttl||sound-0-1": 10000,
      "scope||sound-0-1": 100,
      "file||render-texture-0-0":
        "https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/skills%2FX46ap915je4GhT9iGHLT%2Fassets%2Fsusto-ligth-1.png?alt=media&token=c8db59a9-6bd5-463f-99b7-0dead27aec3f",
      "ttl||render-texture-0-0": 10000,
      "scope||render-texture-0-0": 100,
    }
  );
};
