chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    let urls = []

    let modelBoxes = document.querySelectorAll('.model-box2 > img')
    if (modelBoxes.length > 0) {
      urls.push({
        name: 'model.jpg',
        url: modelBoxes[0].getAttribute('src')
      })
    }

    addUrlsFromGalleryBox('.photo-gallery-box', 'pic', urls)
    addUrlsFromGalleryBox('.video-gallery-box', 'movs', urls)

    sendResponse(urls)
  })

function addUrlsFromGalleryBox (selector, name, array) {
  let selectorElem = document.querySelectorAll(selector)
  if (selectorElem.length <= 0) {
    return
  }

  var photoThumb = selectorElem[0].querySelectorAll('.photo-thumb')
  if (photoThumb.length <= 0) {
    return
  }

  var children = photoThumb[0].children
  for (let i = 0; i < children.length; i++) {
    let div = children[i]
    let img = div.querySelectorAll('ul > li > a > img')
    if (img.length > 0) {
      array.push({
        name: name + (i + 1) + '.jpg',
        url: img[0].getAttribute('src')
      })
    }
  }
}
