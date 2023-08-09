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

    let inertiaPage = {};
    const mergePage = (nextPage, isPartial = false) => {
        if (isPartial && inertiaPage.component === nextPage.component) {
            return inertiaPage = {
                ...nextPage,
                props: { ...inertiaPage.props, ...nextPage.props },
            }
        }
        return inertiaPage = nextPage;
    }

    const renderJson = (jsonString, isPartial) => {
        const page = mergePage(JSON.parse(jsonString), isPartial);
        const value = JSON.stringify(page, null, '\t')
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

    const sendJson = () => {
        chrome.devtools.inspectedWindow.eval(`dispatchEvent(new PopStateEvent("popstate", {state: ${editor.getValue()}}))`)
    }

    editor.commands.addCommand({
        name: "Send",
        exec: sendJson,
        bindKey: { mac: "cmd-return", win: "ctrl-return" }
    })

    document.querySelector('#send').addEventListener('click', sendJson)

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
                if (request.response.content.mimeType.includes('text/html')) {
                    request.getContent(renderJsonFromHtml)
                }
                return
            }
            if (request.request.headers.find((header) => header.name === 'x-inertia') ||
                request.response.headers.find((header) => header.name === 'X-Inertia')) {
                if (request.request.headers.some((header) => header.name === 'x-inertia-partial-data')) {
                    request.getContent((content) => renderJson(content, true))
                } else {
                    request.getContent(renderJson)
                }
                return
            }
        }
    );
});


