const images = [];
const sprites = [];
const sounds = [];

let challenge = {
  title: 'Challenge name',
  completed:false,
  timetoAccept:1000
}

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib();

const addActionToDixperStudio = () => {
  // JUMPSCARE

  const actionScript =JSON.stringify([
    {
      ttl: 10000,
      actions: [
        {
          inputKey: 'render-texture-0-0',
          scope: '{{scope}}',
          key: 'render-texture',
          component: 'graphics',
          type: 'render-texture',
          version: 1,
          action: 'start',
          metadata: {
            file: '{{file}}',
            textureProperties: {
              width: '{{width}}',
              height: '{{height}}',
              position: '{{position}}',
              fadeIn: '{{fade}}',
            },
          },
          tt0: '{{tt0}}',
          ttl: '{{ttl}}',
        },
        {
          inputKey: 'sound-0-1',
          scope: '{{scope}}',
          key: 'sound',
          metadata: { file: '{{file}}', volume: '{{volume}}' },
          tt0: '{{tt0}}',
          ttl: '{{ttl}}',
        },
      ],
    },
  ]) 

  const actionInputs ={
    'file||sound-0-1':
      'https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/skills%2FIUvnTvzg4RsRUwoll9pZ%2FAudio%20bicho%20cara%20fea.mp3?alt=media&token=a08c25ff-c138-4d2d-93f1-106106766ec0',
    'ttl||sound-0-1': 10000,
    'scope||sound-0-1': 100,
    'file||render-texture-0-0':
      'https://firebasestorage.googleapis.com/v0/b/dixper-abae2.appspot.com/o/skills%2FX46ap915je4GhT9iGHLT%2Fassets%2Fsusto-ligth-1.png?alt=media&token=c8db59a9-6bd5-463f-99b7-0dead27aec3f',
    'ttl||render-texture-0-0': 10000,
    'scope||render-texture-0-0': 100,
  }

  dixperPluginSample.addActions(actionScript, actionInputs);
  
};


const init = () => {
  addActionToDixperStudio()
};
