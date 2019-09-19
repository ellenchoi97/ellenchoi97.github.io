/* -------------------------------- */
//All pages
export function initPage() {
    document.getElementById("main_title").addEventListener("click", function () { nextPage("index.html"); });
    document.getElementById("all_proj").addEventListener("click", function () { sessionStorage.setItem("jumpTo", 1); });
    document.getElementById("about").addEventListener("click", function () { sessionStorage.setItem("jumpTo", 2); });
}

/* -------------------------------- */
//index.html
//Sort the project icons
function re_sort(view_by) {
    var ordered = [];   //The list of lists for where icons belong
    var cat_names;      //The names of the categories

    //Get the icons and the names of the categories
    if (view_by == "class") {
        ordered.push(document.getElementsByClassName("cse_134b"));
        ordered.push(document.getElementsByClassName("cse_167"));
        ordered.push(document.getElementsByClassName("cse_165"));
        ordered.push(document.getElementsByClassName("cse_169"));
        cat_names = ["Web Client Languages", "Introduction to Computer Graphics", "3D User Interaction", "Computer Animation"];
    }
    else if (view_by == "prog_lang") {
        ordered.push(document.getElementsByClassName("html"));
        ordered.push(document.getElementsByClassName("opengl"));
        ordered.push(document.getElementsByClassName("unity"));
        cat_names = ["HTML/CSS/JavaScript", "C++/OpenGL", "C#/Unity"];
    }

    //The number of categories
    var catNum = cat_names.length;        

    //Create basic layout for all view by options
    //Create div tags for grid layout
    var icon_grid_div = new Array(catNum);
    for (var i = 0; i < catNum; i++) {
        icon_grid_div[i] = document.createElement("div");
        icon_grid_div[i].className = "icon_grid";
    }

    //Create summaries for details title
    var newSummaries = new Array(catNum);
    for (var i = 0; i < catNum; i++) {
        newSummaries[i] = document.createElement("summary");
    }

    //Create details
    var newCategories = new Array(catNum);
    for (var i = 0; i < catNum; i++) {
        newCategories[i] = document.createElement("details");
        newCategories[i].appendChild(newSummaries[i]);
        newCategories[i].appendChild(icon_grid_div[i]);
    }

    //Set the category's name and insert icons
    for (var i = 0; i < catNum; i++) {
        newSummaries[i].innerHTML = cat_names[i];

        for (var j = ordered[i].length - 1; j >= 0; j--) {
            icon_grid_div[i].insertBefore(ordered[i][j], icon_grid_div[i].childNodes[0]);
        }
    }

    //Delete existing categories
    var categories = document.getElementsByClassName("category");
    for (var i = categories.length - 1; i >= 0; i--) {
        categories[i].parentElement.removeChild(categories[i]);
    }

    //Add new categories
    var theBody = document.getElementById("all_projects");
    for (var i = 0; i < newCategories.length; i++) {
        newCategories[i].className = "category";
        theBody.appendChild(newCategories[i]);
    }
}

//Go to the linked page
function nextPage(page) {
    location.href = page;
}

//Add onclick functions to elements
export function initIndex() {
    initPage();

    var goToProj = sessionStorage.getItem("jumpTo");
    if (goToProj == 1) {
        var coord = document.getElementById("body_divider").getBoundingClientRect().y - document.getElementsByTagName("header")[0].offsetHeight;
        window.scrollTo(0, coord);
    }
    else if (goToProj == 2) {
        var coord = document.getElementsByTagName("footer")[0].getBoundingClientRect().y - document.getElementsByTagName("header")[0].offsetHeight;
        window.scrollTo(0, coord);
    }
    sessionStorage.removeItem("jumpTo");

    document.getElementById("view_by_menu").addEventListener("change", function () { re_sort(document.getElementById("view_by_menu").value) });

    document.getElementById("134b_final_icon").addEventListener("click", function () { nextPage("meme_master.html") });

    document.getElementById("167_1_icon").addEventListener("click", function () { nextPage("rendering_point_clouds.html") });
    document.getElementById("167_2_icon").addEventListener("click", function () { nextPage("3d_models_and_lighting.html") });
    document.getElementById("167_3_icon").addEventListener("click", function () { nextPage("textures_scene_graph_and_culling.html") });
    document.getElementById("167_4_icon").addEventListener("click", function () { nextPage("roller_coaster.html") });
    document.getElementById("167_final_icon").addEventListener("click", function () { nextPage("finding_mochi.html") });

    document.getElementById("165_1_icon").addEventListener("click", function () { nextPage("trapped_by_a_big_wall.html") });
    document.getElementById("165_2_icon").addEventListener("click", function () { nextPage("vr_classroom_design_tool_A.html") });
    document.getElementById("165_3_icon").addEventListener("click", function () { nextPage("vr_classroom_design_tool_B.html") });
    document.getElementById("165_4_icon").addEventListener("click", function () { nextPage("air_race_over_ucsd.html") });
    document.getElementById("165_final_icon").addEventListener("click", function () { nextPage("adventure_machine_vr.html") });

    document.getElementById("169_3_icon").addEventListener("click", function () { nextPage("skeleton_skinning_keyframe_animation.html") });
    document.getElementById("169_4_icon").addEventListener("click", function () { nextPage("cloth_simulation.html") });
    document.getElementById("169_5_icon").addEventListener("click", function () { nextPage("inverse_kinematics.html") });

    document.getElementById("resume").addEventListener("click", function () { nextPage("Assets/Ellen_Choi_Resume.pdf") });
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
    if (slideIndex > 0 && slideIndex < images.length - 5) {
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
    initPage();

    document.getElementsByClassName("prev")[0].addEventListener("click", function () { plusSlides(-1) });
    document.getElementsByClassName("next")[0].addEventListener("click", function () { plusSlides(1) });

    var thumbnails = document.getElementsByClassName("thumbnail_img");
    for (let i = 0; i < thumbnails.length; i++) {
        thumbnails[i].addEventListener("click", function () { currentSlide(i) });
    }

    showSlides(slideIndex);
}