function saveOptions(e) {
    e.preventDefault();
    browser.storage.local.set({
        optionShowUiElement: document.querySelector("#optionShowUiElement").checked,
        optionShowInfoPageOnVersionUpdate: document.querySelector("#optionShowInfoPageOnVersionUpdate").checked
    });
}

function restoreOptions() {

    function setCurrentChoice(result) {
        document.querySelector("#optionShowUiElement").checked = result.optionShowUiElement || false;
        document.querySelector("#optionShowInfoPageOnVersionUpdate").checked = result.optionShowInfoPageOnVersionUpdate || false;
    }

    function onError(error) {
        console.log(`Error: ${error}`);
    }

    var getting = browser.storage.local.get("optionShowUiElement");
    getting.then(setCurrentChoice, onError);

    let getting_optionShowInfoPageOnVersionUpdate = browser.storage.local.get("optionShowInfoPageOnVersionUpdate");
    getting_optionShowInfoPageOnVersionUpdate.then()
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);