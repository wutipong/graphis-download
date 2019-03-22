
chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
  chrome.declarativeContent.onPageChanged.addRules([{
    conditions: [new chrome.declarativeContent.PageStateMatcher({
      pageUrl: {
        hostEquals: 'graphis.ne.jp',
        pathEquals: '/monthly/model.php'
      }
    })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
  }, {
    conditions: [new chrome.declarativeContent.PageStateMatcher({
      pageUrl: {
        hostEquals: 'graphis.ne.jp',
        pathEquals: '/monthly/item.php'
      }
    })
    ],
    actions: [new chrome.declarativeContent.ShowPageAction()]
  }])
})
