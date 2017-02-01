

// content.js
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "clicked_browser_action" ) {
        var res = window.location.pathname.split( '/' );
        var id = res[res.length-1];
		var newUrl = "http://getcdn.hotstar.com/AVS/besc?action=GetCDN&appVersion=5.0.39&asJson=Y&channel=TABLET&id="+id+"&type=VOD";
		chrome.runtime.sendMessage({"message": "open_new_tab", "url": newUrl});
		// console.log('current url ' + newUrl);
    }
  }
);