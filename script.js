var cse167hw1_imgs = ["Assets/CSE167HW1/HW_1_Bunny.gif", "Assets/CSE167HW1/HW_1_Dragon.gif", "Assets/CSE167HW1/HW_1_Bear.gif", "Assets/CSE167HW1/HW_1_Points.gif"];

/* -------------------------------- */
//index.html
//Go to the linked page
export function nextPage(page) {
    location.href = page;
}

//Initialize the onclick functions
export function initIndex() {
    document.getElementById("167_1_icon").addEventListener("click", function () { nextPage("cse167_hw1.html") });
}

/* -------------------------------- */
//All project pages
var slideIndex = 0;

function showSlides() {
    var slides = document.getElementsByClassName("gallery_img");
    var imgNum = document.getElementsByClassName("slideNum");
    var captionText = document.getElementsByClassName("caption");
    var dots = document.getElementsByClassName("thumbnail_img");
    if (slideIndex > cse167hw1_imgs.length - 1) { slideIndex = 0 }
    if (slideIndex < 0) { slideIndex = cse167hw1_imgs.length - 1 }
    for (var i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[0].src = cse167hw1_imgs[slideIndex];
    slides[0].style.display = "block";
    imgNum[0].innerHTML = (slideIndex + 1) + " / " + cse167hw1_imgs.length;
    dots[slideIndex].className += " active";
    captionText[0].innerHTML = dots[slideIndex].alt;
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

export function initGallery() {
    document.getElementsByClassName("prev")[0].addEventListener("click", function () { plusSlides(-1) });
    document.getElementsByClassName("next")[0].addEventListener("click", function () { plusSlides(1) });

    var thumbnails = document.getElementsByClassName("thumbnail_img");
    for (let i = 0; i < thumbnails.length; i++) {
        thumbnails[i].addEventListener("click", function () { currentSlide(i) });
    }

    showSlides(slideIndex);
}