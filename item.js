chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    let $dlButton = $('.dl-button')
    if ($dlButton == null) {
      sendResponse([])
      return
    }

    let url = $('.dl-button').attr('href')

    sendResponse([
      {
        name: url.substring(url.lastIndexOf('/') + 1),
        url: url
      }
    ])
  })
