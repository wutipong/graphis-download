var historyValues = []

chrome.storage.local.get(['name', 'history'], function (data) {
  $('#name').val(data.name)
  historyValues = data.history
  if (historyValues == null) historyValues = []
  updateHistory()
})

function updateHistory () {
  let $historyList = $('#history-list')
  $historyList.empty()
  historyValues.forEach(function (history) {
    $historyList.append('<option>' + history + '</option>')
  })
}

$('#name').on('change', function (event) {
  let name = $('#name').val().replace('\\', ' ')
  name = name.replace('/', ' ')
  name = name.trim()
  $('#name').val(name)

  chrome.storage.local.set({
    name: name
  })
})

$('#clear').on('click', function () {
  $('#name').val('')
  $('#name').trigger('change')
})

$('#history-list').change(function () {
  let $selectItem = $('#history-list option:selected')
  $('#name').val($selectItem.text())
  $('#name').trigger('change')
})

$('#download').on('click', function () {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      greeting: 'hello'
    }, function (response) {
      let name = $('#name').val()

      if (historyValues.length === 0 ||
        (historyValues.length > 0 && historyValues[0] !== name)) {
        historyValues.unshift(name)

        if (historyValues.length > 10) {
          historyValues.length = 10
        }

        chrome.storage.local.set({
          history: historyValues
        })

        updateHistory()
      }

      response.forEach(function (download) {
        chrome.downloads.download({
          url: download.url,
          filename: name + '\\' + download.name,
          conflictAction: 'prompt'
        })
      })
      window.close()
    })
  })
})
