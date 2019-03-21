chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        let urls = []

        urls.push({
            name: "model.jpg",
            url: $(".model-box2").find("img").attr('src'),
        });

        addUrlsFromGalleryBox(".photo-gallery-box", "pic", urls);
        addUrlsFromGalleryBox(".video-gallery-box", "movs", urls);

        sendResponse(urls);
    });

function addUrlsFromGalleryBox(selector, name, array) {
    var $photoThumb = $(selector).find('.photo-thumb');
    if ($photoThumb == null)
        return;

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