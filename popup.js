var historyValues = []
var nameElement = document.getElementById('name')

chrome.storage.local.get(['name', 'history'], function (data) {
  if (data.name != null) {
    nameElement.value = data.name
  }

  historyValues = data.history

  if (historyValues == null) {
    historyValues = []
  }

  updateHistory()
})

function updateHistory () {
  let historyListElement = document.getElementById('history-list')
  historyListElement.innerHTML = ''

  historyValues.forEach(function (history) {
    let option = document.createElement('OPTION')
    option.innerHTML = history

    historyListElement.appendChild(option)
  })
}

nameElement.addEventListener('change', function (event) {
  let name = nameElement.value.replace('\\', ' ')

  name = name.replace('/', ' ')
  name = name.trim()

  nameElement.value = name
  chrome.storage.local.set({
    name: name
  })
})

let clearButton = document.getElementById('clear')
clearButton.addEventListener('click', function () {
  nameElement.value = ''

  var event = document.createEvent('HTMLEvents')
  event.initEvent('change', true, false)
  nameElement.dispatchEvent(event)
})

let historyListSelect = document.getElementById('history-list')
historyListSelect.addEventListener('change', function () {
  let selectItem = historyListSelect.options[historyListSelect.selectedIndex]
  nameElement.value = selectItem.text

  var event = document.createEvent('HTMLEvents')
  event.initEvent('change', true, false)
  nameElement.dispatchEvent(event)
})

let downloadButton = document.getElementById('download')
downloadButton.addEventListener('click', function () {
  chrome.tabs.query({
    active: true,
    currentWindow: true
  }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      greeting: 'hello'
    }, function (response) {
      let name = nameElement.value

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
