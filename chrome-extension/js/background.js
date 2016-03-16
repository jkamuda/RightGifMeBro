chrome.omnibox.onInputEntered.addListener(
  function(text) {
    findGif(text, function(responseText) {
      navigate(JSON.parse(responseText).url);
    });
  }
);

function navigate(url) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.update(tabs[0].id, {url: url});
  });
};

function findGif(searchText, callback) {
  var url = "https://rightgif.com/search/web";
  var req = new XMLHttpRequest();
  req.open("POST", url, true);
  req.onreadystatechange = function() {
    if (req.readyState == 4) {
      callback(req.responseText);
    }
  }
  req.send('text=' + searchText);
}
