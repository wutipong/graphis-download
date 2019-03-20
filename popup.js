chrome.storage.local.get(['name'], function (data) {
  $("#name").val(data.name);
    console.log(data.name);
});

$('#name').on('change', function(event){
  let name = $("#name").val().replace('\\', ' ');
  name = name.replace('/', ' ');
  $('#name').val(name);

  chrome.storage.local.set({name: name}, function(){
    console.log(name);
  })
});

var url;
chrome.tabs.query({ currentWindow: true, active: true }, function (tabs){
  url = tabs[0].url;
  console.log(url);
})

$("#download").on("click", function(){
  console.log(url);
})