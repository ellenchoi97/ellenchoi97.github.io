/* -------------------------------- */
//index.html
//Go to the linked page
export function nextPage(page) {
    location.href = page;
}

//Add onclick functions to elements
export function initIndex() {
    document.getElementById("main_title").addEventListener("click", function () { nextPage("index.html") });
    document.getElementById("167_1_icon").addEventListener("click", function () { nextPage("cse167_hw1.html") });
    document.getElementById("167_2_icon").addEventListener("click", function () { nextPage("cse167_hw2.html") });
    document.getElementById("167_3_icon").addEventListener("click", function () { nextPage("cse167_hw3.html") });
    document.getElementById("167_4_icon").addEventListener("click", function () { nextPage("cse167_hw4.html") });
}

/* -------------------------------- */
//All project pages
var slideIndex = 0;     //The index of the main image

function showSlides() {
    var images = document.getElementsByClassName("img_string");         //The strings of the images' file locations
    var slides = document.getElementsByClassName("gallery_img");        //The img element that holds the main image
    var imgNum = document.getElementsByClassName("slideNum");           //The span element that shows image number
    var captionText = document.getElementsByClassName("caption");       //The caption for the main image
    var thumbnails = document.getElementsByClassName("thumbnail_img");  //The img elements for the thumbnail photos

    //If the slide index past the last index, go to index 0
    if (slideIndex > images.length - 1) { slideIndex = 0 }

    //If the slide index is before the first index, go to the last index
    if (slideIndex < 0) { slideIndex = images.length - 1 }

    //Get the index of the first image shown in the thumbnails
    var start;
    if (slideIndex > 0 && slideIndex < images.length - 6) {
        start = slideIndex - 1;
    }
    else if (slideIndex == 0) {
        start = 0;
    }
    else {
        start = images.length - 6;
    }

    //For all thumbnail photos
    for (var i = 0; i < thumbnails.length; i++) {
        thumbnails[i].className = thumbnails[i].className.replace(" active", "");

        //If the thumbnail is shown
        if (i >= start && i <= start + 5) {
            thumbnails[i].className = thumbnails[i].className.replace(" hide", " show");
        }

        //If the thumbnail is not shown
        else {
            thumbnails[i].className = thumbnails[i].className.replace(" show", " hide");
        }
    }

    slides[0].src = images[slideIndex].innerHTML;                       //Change the main photo
    imgNum[0].innerHTML = (slideIndex + 1) + " / " + images.length;     //Change the photo number text
    thumbnails[slideIndex].className += " active";                      //Make stylistic changes to selected photo
    captionText[0].innerHTML = thumbnails[slideIndex].alt;              //Change the caption
}

// Next/previous controls
export function plusSlides(n) {
    slideIndex += n;
    showSlides();
}

// Thumbnail image controls
export function currentSlide(n) {
    slideIndex = n;
    showSlides();
}

export function initProjPage() {
    document.getElementById("main_title").addEventListener("click", function () { nextPage("index.html") });

    document.getElementsByClassName("prev")[0].addEventListener("click", function () { plusSlides(-1) });
    document.getElementsByClassName("next")[0].addEventListener("click", function () { plusSlides(1) });

    var thumbnails = document.getElementsByClassName("thumbnail_img");
    for (let i = 0; i < thumbnails.length; i++) {
        thumbnails[i].addEventListener("click", function () { currentSlide(i) });
    }

    showSlides(slideIndex);
}