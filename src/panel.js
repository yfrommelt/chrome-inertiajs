import ace from 'ace-builds'
import jsonWorkerUrl from "ace-builds/src-noconflict/worker-json";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-dracula";

console.log = (...args) => {
    chrome.devtools.inspectedWindow.eval('console.log(' + args.map(arg => JSON.stringify(arg)) + ');');
}

const tabSize = 2

chrome.storage.sync.get({ defaultOpenDepth: 2 }, (items) => {
    const defaultOpenDepth = items.defaultOpenDepth;

    const jsonContainer = document.querySelector('#json');
    ace.config.setModuleUrl("ace/mode/json_worker", jsonWorkerUrl);
    const editor = ace.edit(jsonContainer);
    editor.getSession().setMode("ace/mode/json");
    editor.setTheme("ace/theme/dracula");
    editor.getSession().setTabSize(tabSize);

    const renderJson = (jsonString) => {
        const value = JSON.stringify(JSON.parse(jsonString), null, '\t')
        editor.setValue(value)
        editor.getSession().foldToLevel(defaultOpenDepth);
    }

    const renderJsonFromHtml = (html) => {
        if (!html?.length) {
            return
        }
        const parser = new DOMParser();
        const document = parser.parseFromString(html, "text/html");
        const element = document.querySelector('[data-page]')
        if (element && element.dataset.page) {
            renderJson(element.dataset.page)
        } else {
            editor.setValue(`/* This page doesn’t seem to be using Inertia.js */`)
        }
    }

    document.querySelector('#send').addEventListener('click', () => {
        chrome.devtools.inspectedWindow.eval(`dispatchEvent(new PopStateEvent("popstate", {state: ${editor.getValue()}}))`)
    })

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
            if (request.request.headers.find((header) => header.name === 'x-inertia') ||
                request.response.headers.find((header) => header.name === 'X-Inertia')) {
                request.getContent(renderJson)
            }
        }
    );
});


