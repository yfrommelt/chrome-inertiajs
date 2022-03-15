import JSONFormatter from 'json-formatter-js'

console.log = (...args) => {
    chrome.devtools.inspectedWindow.eval('console.log(' + args.map(arg => JSON.stringify(arg)) + ');');
}

chrome.storage.sync.get({ defaultOpenDepth: 3 }, (items) => {
    console.log(items)
    const defaultOpenDepth = items.defaultOpenDepth;

    const jsonContainer = document.querySelector('#json');
    const renderJson = (jsonString) => {
        const json = JSON.parse(jsonString)
        const formatter = new JSONFormatter(json, defaultOpenDepth, { theme: 'dark' });
        const node = formatter.render()
        jsonContainer.innerHTML = ''
        jsonContainer.appendChild(node)
    }

    const renderJsonFromHtml = (html) => {
        if (!html.length) {
            return
        }
        const parser = new DOMParser();
        const document = parser.parseFromString(html, "text/html");
        const element = document.querySelector('[data-page]')
        if (element && element.dataset.page) {
            renderJson(element.dataset.page)
        } else {
            jsonContainer.innerHTML = `<p class="init-warning">This page doesn't seem to be using Inertia.js</p>`
        }
    }

    // on panel open get current document
    chrome.devtools.inspectedWindow.getResources(
        (resources) => {
            const document = resources.find((resource) => resource.type === 'document')
            document.getContent(renderJsonFromHtml)
        }
    )

    // listen for changes
    chrome.devtools.network.onRequestFinished.addListener(
        (request) => {
            if (request._resourceType === 'document') {
                request.getContent(renderJsonFromHtml)
            }
            if (request.response.headers.find((header) => header.name === 'X-Inertia')) {
                request.getContent(renderJson)
            }
        }
    );
});