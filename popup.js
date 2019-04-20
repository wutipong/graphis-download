var historyValues = []
var nameElement = document.getElementById('name')
var categorySelect = document.getElementById('category')
var directoryText = document.getElementById('directory')

chrome.storage.local.get(['name', 'history', 'category', 'directory'], function (data) {
  if (data.name != null) {
    nameElement.value = data.name
  }

  historyValues = data.history

  if (historyValues == null) {
    historyValues = []
  }

  if (data.category != null) {
    categorySelect.selectedIndex = data.category
  }

  if (data.directory != null) {
    directoryText.value = data.directory
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

directoryText.addEventListener('change', function (event) {
  let directory = directoryText.value

  directory = directory.trim()

  directoryText.value = directory
  chrome.storage.local.set({
    directory: directory
  })
})

categorySelect.addEventListener('change', function (event) {
  let category = categorySelect.selectedIndex

  chrome.storage.local.set({
    category: category
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
  let selectText = selectItem.text.split('\\')

  if (selectText.length === 2) {
    nameElement.value = selectText[1]
    for (let i = 0; i < categorySelect.options.length; i++) {
      if (categorySelect.options[i].text === selectText[0]) {
        categorySelect.selectedIndex = i
      }
    }
  } else {
    nameElement.value = selectText[0]
  }

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
      let category = categorySelect[categorySelect.selectedIndex].text

      if (historyValues.length === 0 ||
        (historyValues.length > 0 && historyValues[0] !== name)) {
        historyValues.unshift(category + '\\' + name)

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
          filename: (directoryText.value.length === 0 ? '' : (directoryText.value + '\\')) + category + '\\' + name + '\\' + download.name,
          conflictAction: 'prompt'
        })
      })
      window.close()
    })
  })
})
