const sendTwitchMessage = () => {
  dixperPluginSample.addActions(
    JSON.stringify([
      {
        ttl: 10000,
        actions: [
          {
            inputKey: "twitch-bot-xp-01",
            scope: "{{scope}}",
            key: "twitch-bot",
            metadata: {
              color: "{{color}}",
              message: "{{message}}",
            },
            tt0: 0,
            ttl: 1000,
          },
        ],
      },
    ]),
    {
      "color||twitch-bot-xp-01": "green",
      "message||twitch-bot-xp-01": "MESSAGE",
      "scope||twitch-bot-xp-01": [0],
    }
  );
};
