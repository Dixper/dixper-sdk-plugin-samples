const addXp = () => {
  dixperPluginSample.addActions(
    JSON.stringify([
      {
        ttl: 10000,
        actions: [
          {
            inputKey: "crafting-game-xp-01",
            scope: "{{scope}}",
            key: "crafting-game-xp",
            metadata: {
              userId: "{{userId}}",
              craftingGameId: "{{craftingGameId}}",
              amount: "{{amount}}",
            },
            tt0: "{{tt0}}",
            ttl: "{{ttl}}",
          },
        ],
      },
    ]),
    {
      "scope||crafting-game-xp-01": "",
      "craftingGameId||crafting-game-xp-01": "j0HbMaT54gjJTJdsOYix",
      "amount||crafting-game-xp-01": 100,
      "tt0||crafting-game-xp-01": 0,
      "ttl||crafting-game-xp-01": [0],
    }
  );
};
