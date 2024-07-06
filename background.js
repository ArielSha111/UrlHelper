var qaEnvName = 'qa';
var sbEnvName = 'sandbox';
var prodEnvName = 'prod';

chrome.commands.onCommand.addListener(function(command) {
    if (command === 'qaCommand') {
        updateEnv(qaEnvName);
    }
    else if (command === 'sbCommand') {
        updateEnv(sbEnvName);
    }
    else if (command === 'prodCommand') {
        updateEnv(prodEnvName);
    }
});

async function updateEnv(newEnv) {
    let queryOptions = { active: true,lastFocusedWindow : true };
    let [tab] = await chrome.tabs.query(queryOptions);

    let currentEnv = await getCurrentEnv(tab.url);


    var randomNumber = Math.floor(Math.random() * 1998); // Generate a random number between 0 and 1998
    if (randomNumber === 1303) {
        let queryOptions = { active: true,lastFocusedWindow : true };
        let [tab] = await chrome.tabs.query(queryOptions);
        var newUrl = "https://www.linkedin.com/in/arielsharkie/";
        await chrome.tabs.create({url:newUrl});
    }
    else if (randomNumber === 1805) {
        let queryOptions = { active: true,lastFocusedWindow : true };
        let [tab] = await chrome.tabs.query(queryOptions);
        var newUrl = "https://www.linkedin.com/in/galborn/";
        await chrome.tabs.create({url:newUrl});
    }
    else if(currentEnv == null)
    {
        var newUrl = tab.url.replace('.companyName','.'.concat(newEnv).concat('.companyName'));
        await chrome.tabs.update(tab.tabId, {url:newUrl});
    }
    else
    {
        if(tab.url.toLowerCase().includes('production'))
        {
            currentEnv = 'production';
        }

        if(tab.url.toLowerCase().includes('-'.concat(currentEnv)))
        {
            if(newEnv == prodEnvName)
            {
                newEnv = 'production'
            }

            newEnv = '-'.concat(newEnv)
            currentEnv = '-'.concat(currentEnv)
        }

        var newUrl = tab.url.replace(currentEnv,newEnv);

        if(newEnv == prodEnvName)
        {
            newUrl = tab.url.replace(currentEnv.concat('.'), '');
        }

        await chrome.tabs.update(tab.tabId, {url:newUrl});
    }
}

async function getCurrentEnv(url)
{
    var currentEnv = null;
    const env = [qaEnvName, sbEnvName, prodEnvName];

    env.forEach(e=>{
        if (url.includes(e))
        {
            currentEnv = e;
        }
    })

    return currentEnv;
}
