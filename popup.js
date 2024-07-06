var qaEnvName = 'qa';
var sbEnvName = 'sandbox';
var prodEnvName = 'prod';

const links = [
    {id: 'aaaa', url: 'https://www.google.com/'},
    {id: 'bbbb', url: 'https://www.google.com/'}
];

// Attach event listeners for each link
links.forEach(link => {
    openLinkInNewTab(link.id, link.url);
});


document.addEventListener('keydown', function (event) {
    if (event.key.toLowerCase() === 'q') {
        document.getElementById('qaButton').click();
    }
    else if (event.key.toLowerCase() === 's') {
        document.getElementById('sbButton').click();
    }
    else if (event.key.toLowerCase() === 'p') {
        document.getElementById('prodButton').click();
    }
    else if (event.key.toLowerCase() === 'a') {
        document.getElementById('aaaa').click();
    }
    else if (event.key.toLowerCase() === 'b') {
        document.getElementById('bbbb').click();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    var checkPageButton = document.getElementById('qaButton');
    checkPageButton.addEventListener('click', function () {
        updateEnv(qaEnvName);
    }, false);
}, false);

document.addEventListener('DOMContentLoaded', function () {
    var checkPageButton = document.getElementById('sbButton');
    checkPageButton.addEventListener('click', function () {
        updateEnv(sbEnvName);
    }, false);
}, false);

document.addEventListener('DOMContentLoaded', function () {
    var checkPageButton = document.getElementById('prodButton');
    checkPageButton.addEventListener('click', function () {
        updateEnv(prodEnvName);
    }, false);
}, false);


function openLinkInNewTab(linkId, url) {
    document.getElementById(linkId).addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default link behavior
        window.open(url, '_blank'); // Open link in a new tab
    });
}

async function updateEnv(newEnv) {
    let queryOptions = {active: true, lastFocusedWindow: true};
    let [tab] = await chrome.tabs.query(queryOptions);

    let currentEnv = await getCurrentEnv(tab.url);

    var randomNumber = Math.floor(Math.random() * 1998); // Generate a random number between 0 and 1998
    if (randomNumber === 1303) {
        let queryOptions = {active: true, lastFocusedWindow: true};
        let [tab] = await chrome.tabs.query(queryOptions);
        var newUrl = "https://www.linkedin.com/in/arielsharkie/";
        await chrome.tabs.create({url: newUrl});
    }
    else if (randomNumber === 1805) {
        let queryOptions = { active: true,lastFocusedWindow : true };
        let [tab] = await chrome.tabs.query(queryOptions);
        var newUrl = "https://www.linkedin.com/in/galborn/";
        await chrome.tabs.create({url:newUrl});
    }
    else if (currentEnv == null) {
        var newUrl = tab.url.replace('.companyName', '.'.concat(newEnv).concat('.companyName'));
        await chrome.tabs.update(tab.tabId, {url: newUrl});
    }
    else {
        if (tab.url.toLowerCase().includes('production')) {
            currentEnv = 'production';
        }

        if (tab.url.toLowerCase().includes('-'.concat(currentEnv))) {
            if (newEnv == prodEnvName) {
                newEnv = 'production'
            }

            newEnv = '-'.concat(newEnv)
            currentEnv = '-'.concat(currentEnv)
        }

        var newUrl = tab.url.replace(currentEnv, newEnv);

        if (newEnv == prodEnvName) {
            newUrl = tab.url.replace(currentEnv.concat('.'), '');
        }

        await chrome.tabs.update(tab.tabId, {url: newUrl});
    }
}

async function getCurrentEnv(url) {
    var currentEnv = null;
    const env = [qaEnvName, sbEnvName, prodEnvName];

    env.forEach(e => {
        if (url.includes(e)) {
            currentEnv = e;
        }
    })

    return currentEnv;
}
