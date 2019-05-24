chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    let dlbuttons = document.querySelectorAll('.dl-button')
    if (dlbuttons.length <= 0) return

    let dlButton = dlbuttons[0]

    let url = dlButton.getAttribute('href')

    let response = {
      urls: [
        {
          name: url.substring(url.lastIndexOf('/') + 1),
          url: url
        }
      ]
    }
    sendResponse(response)
  })
