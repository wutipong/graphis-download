chrome.storage.local.get(['name'], function (data) {
  $("#name").val(data.name);
  console.log(data.name);
});

$('#name').on('change', function (event) {
  let name = $("#name").val().replace('\\', ' ');
  name = name.replace('/', ' ');
  $('#name').val(name);

  chrome.storage.local.set({ name: name }, function () {
    console.log(name);
  })
});

var urlStr;
chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
  urlStr = tabs[0].url;
})

$("#download").on("click", function () {
  var url = new URL(urlStr);
  console.log(url.pathname);

  switch (url.pathname) {
    case "/monthly/model.php":
      console.log("Downloading Model Page");
      chrome.tabs.executeScript(null, {
        file: 'model.js'
      }, function (results) {
        console.log(results.modelImgUrl);
        console.log(results.test);
      });
      break;

    case "/monthly/item.php":
      console.log("Downloading Item Page");
      break;
  }
})