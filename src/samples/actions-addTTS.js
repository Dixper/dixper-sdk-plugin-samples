const addTTS = () => {
  dixperPluginSample.addActions(
    JSON.stringify([
      {
        ttl: 10000,
        actions: [
          {
            scope: "{{scope}}",
            key: "tts-message",
            metadata: {
              message: "{{ttsMessage}}",
              voice: {
                languageCode: "{{ttsLanguageCode}}",
                name: "{{ttsLanguageName}}",
                ssmlGender: "{{ttsGender}}",
              },
              audioConfig: {
                audioEncoding: "MP3",
                speakingRate: 1,
                pitch: 1,
                volumeGainDb: 1,
              },
              volume: "{{ttsVolume}}",
            },
            tt0: "{{tt0}}",
            ttl: "{{ttl}}",
          },
        ],
      },
    ]),
    {
      "ttsMessage||tts-01": "HOla",
      "ttsLanguageCode||tts-01": "",
      "ttsLanguageName||tts-01": "",
      "ttsGender||tts-01": "",
      "ttsVolume||tts-01": "",
      "scope||tts-01": "",
      "tt0||tts-01": 0,
      "ttl||tts-01": [0],
    }
  );
};
