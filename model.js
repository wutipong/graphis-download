chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        //let $photoThumb = $(".photo-thumb")
        var result = {
            test: "Test",
            urls: []
        }

        result.urls.push({
            name: "model.jpg",
            url: $(".model-box2").find("img").attr('src'),
        })

        addUrlsFromGalleryBox(".photo-gallery-box", "pic", result.urls)
        addUrlsFromGalleryBox(".video-gallery-box", "movs", result.urls)

        sendResponse(result);
    });

function addUrlsFromGalleryBox(selector, name, array) {
    var $photoThumb = $(selector).find('.photo-thumb');
    var count = 1;
    $photoThumb.children().each(function (i, div) {
        let $img = $(div).find("ul > li > a > img");
        array.push({
            name: name + count + ".jpg",
            url: $img.attr('src'),
        });
        count++;
    });
}