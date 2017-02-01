// background.js

// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {
  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});

// This block is new!
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "open_new_tab" ) {
    	// console.log(request.url);
    	var xhr = new XMLHttpRequest();
      // chrome.tabs.create({"url": request.url});
      	xhr.open("GET", request.url, true);
      	xhr.send(null);
      	xhr.onreadystatechange = function() {
    	if (xhr.readyState == 4 && xhr.status == 200) {
      	resp = JSON.parse(xhr.responseText);
      	final_url = resp.resultObj.src;
      	chrome.tabs.create({'url': 'https://www.hlsplayer.net/'}, function(tab1) {
    		chrome.tabs.executeScript(tab1.id, {
          code: " document.getElementById('player-src').value='"+final_url+"';  document.getElementById('player-start').click();"
        });

  		});
      }
    }
    }
  }
);