let inspectButton = document.getElementById("inspect-button");

inspectButton.addEventListener("click", async () => {
    try {
        let tabs = await chrome.tabs.query({ active: true, currentWindow: true });
        let tab = tabs[0];
        
        // Sending a message to the content script to perform an action
        chrome.tabs.sendMessage(tab.id, { action: "toggleInspection" }, (response) => {
            if (response.isInspectionActive) {
                inspectButton.innerText = "Close";
            } else {
                inspectButton.innerText = "Inspect";
            }
        });

    } catch (error) {
        console.error("Error fetching current tab", error);
    }
});
