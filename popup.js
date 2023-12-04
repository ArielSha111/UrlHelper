const envNames = {
  qa: 'qa',
  sandbox: 'sandbox',
  prod: 'prod'
};

const domain = '.ariel111';

function addButtonEventListener(envName) {
  document.addEventListener('DOMContentLoaded', function() {
    const checkPageButton = document.getElementById(envName);
    checkPageButton.addEventListener('click', function() {
      updateEnv(envName);
    }, false);
  }, false);
}

Object.values(envNames).forEach(envName => {
  addButtonEventListener(envName);
});

chrome.commands.onCommand.addListener(async function(command) {
  const newEnv = envNames[command];
  if (newEnv) {
    await updateEnv(newEnv);
  }
});

async function updateEnv(newEnv) {
  const queryOptions = { active: true, lastFocusedWindow: true };
  const [tab] = await chrome.tabs.query(queryOptions);
  let currentEnv = await getCurrentEnv(tab.url);

  const randomNumber = Math.floor(Math.random() * 1998);
  if (randomNumber === 1303) {
    const newUrl = "https://www.linkedin.com/in/arielsharkie/";
    await chrome.tabs.create({ url: newUrl });
    return;
  }

  if (currentEnv === null) {
    const newUrl = tab.url.replace(domain, `.${newEnv}${domain}`);
    await chrome.tabs.update(tab.tabId, { url: newUrl });
    return;
  }

  if (tab.url.toLowerCase().includes('production')) {
    currentEnv = 'production';
  }

  if (tab.url.toLowerCase().includes(`-${currentEnv}`)) {
    if (newEnv === 'prod') {
      newEnv = 'production';
    }
    newEnv = `-${newEnv}`;
    currentEnv = `-${currentEnv}`;
  }

  let newUrl = tab.url.replace(currentEnv, newEnv);

  if (newEnv === 'prod') {
    newUrl = tab.url.replace(`${currentEnv}.`, '');
  }

  await chrome.tabs.update(tab.tabId, { url: newUrl });
}

async function getCurrentEnv(url) {
  let currentEnv = null;
  Object.values(envNames).forEach(e => {if (url.includes(e)){currentEnv = e;}});
  return currentEnv;
}
