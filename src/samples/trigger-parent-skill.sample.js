const images = [];
const sprites = [];
const sounds = [];

// DIXPER SDK INJECTED CLASS

const dixperPluginSample = new DixperSDKLib({
  pixi: {
    enable: false,
  },
});

const addParentSkillToDixperStudio = () => {
  const skillId = 'WXJI4mLFtGgMbjcgtijK';

  dixperPluginSample.addParentSkill(skillId);
};

addParentSkillToDixperStudio();
