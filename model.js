chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    let response = {
      urls: []
    }

    let modelBoxes = document.querySelectorAll('.model-box2 > img')
    if (modelBoxes.length > 0) {
      response.urls.push({
        name: 'model.jpg',
        url: modelBoxes[0].getAttribute('src')
      })
    }

    addUrlsFromGalleryBox('.photo-gallery-box', 'pic', response.urls)
    addUrlsFromGalleryBox('.video-gallery-box', 'movs', response.urls)

    response.profile = getProfile()
    response.comments = getComments()

    console.log(response)
    sendResponse(response)
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

function getProfile () {
  let profileItems = document.querySelectorAll('.model-prof > div > ul > li')
  let profileMap = []
  profileItems.forEach(function (node) {
    let key = node.firstChild.textContent
    let value = node.lastChild.textContent
    profileMap[key] = value
  })

  let profile = {
    age: profileMap['年齢 /age：'],
    height: profileMap['身長 /height：'],
    bwh: profileMap['スリーサイズ /BWH：'],
    hobby: profileMap['趣味 /hobby：'],
    numberOfShots: profileMap['登場回数 /Number of shots：']
  }

  return profile
}

function getComments () {
  let commentUl = document.body.querySelector('.comment-box > div > ul')
  let comments = {
    jp: commentUl.querySelector('.text-jp').textContent.trim(),
    en: commentUl.querySelector('.text-en').textContent.trim()
  }

  return comments
}
