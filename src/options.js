document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.sync.get({ defaultOpenDepth: 2 }, (items) => {
        document.querySelector('[name="depth"]').value = items.defaultOpenDepth;
    });
});

let timeoutId = null
document.querySelector('[name="depth"]').addEventListener('change', (event) => {
    timeoutId && clearTimeout(timeoutId)
    chrome.storage.sync.set({ defaultOpenDepth: event.target.value }, () => {
        const status = document.querySelector('#feedback');
        status.textContent = 'Options saved.';
        timeoutId = setTimeout(() => {
            status.textContent = '';
        }, 1000);
    });
});
