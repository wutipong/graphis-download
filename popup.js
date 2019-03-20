chrome.storage.local.get(['name'], function (data) {
  $("#name").val(data.name);
  console.log(data.name);
});

$('#name').on('change', function (event) {
  let name = $("#name").val().replace('\\', ' ');
  name = name.replace('/', ' ');
  $('#name').val(name);

  chrome.storage.local.set({
    name: name
  }, function () {
    console.log(name);
  })
});

$("#download").on("click", function () {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      greeting: "hello"
    }, function (response) {
      console.log(response);
      let name = $("#name").val();
      response.urls.forEach(function (download) {
        chrome.downloads.download({
          url: download.url,
          filename: name + "\\" + download.name
        });
      })
    });
  });
})