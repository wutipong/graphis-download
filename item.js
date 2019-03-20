chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        var result = {
            test: "Test",
            urls: []
        }

        let url = $('.dl-button').attr('href');

        result.urls.push({
            name: url.substring(url.lastIndexOf('/')+1),
            url: url
        })

        sendResponse(result);
    });