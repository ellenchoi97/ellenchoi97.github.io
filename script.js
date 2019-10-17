/* -------------------------------- */
//All pages
export function initPage() {
    document.getElementById('project_options').style.right = document.getElementById("about").getBoundingClientRect().width + "px";

    document.getElementById("my_name").addEventListener("click", function () { nextPage("index.html"); });
    document.getElementById("all_proj").addEventListener("click", function () { sessionStorage.setItem("jumpTo", 1); });
    document.getElementById("about").addEventListener("click", function () { sessionStorage.setItem("jumpTo", 2); });
}

/* -------------------------------- */
//index.html

function initScrollEvents() {
    var header = document.getElementsByTagName("header")[0];
    var headerHeight = header.offsetHeight;

    if (window.scrollY < headerHeight) {
        header.style.height = "75px";
        header.style.boxShadow = "none";
        header.style.paddingTop = "20px";
    }
    else {
        header.style.height = "65px";
        header.style.boxShadow = "5px 1px 7px black";
        header.style.paddingTop = "0px";
    }

    var projects = document.getElementById("projects_section");
    var projMargin = parseInt(window.getComputedStyle(projects).marginTop, 10)
    var offset = headerHeight + projMargin;
    var proj_grid = document.getElementById("icon_grid");
    if (proj_grid.style.opacity == 0 && Math.abs(projects.getBoundingClientRect().y - offset) < 50) {
        proj_grid.style.opacity = 1;
        proj_grid.style.transform = "translateX(0px)";
    }
}

//Sort the project icons
function re_sort(view_by) {
    var proj_grid = document.getElementById("icon_grid");
    proj_grid.style.opacity = 0;
    proj_grid.style.transform = "translateX(50px)";


    window.setTimeout(function () {
        var projects = document.getElementsByClassName("project");
        var numProjects = 0;

        document.getElementById("index_prev").style.opacity = 0;
        document.getElementById("index_next").style.opacity = 0;

        for (var j = 3; j < projects.length; j++) {
            projects[j].className = projects[j].className.replace(" hide", "");
            projects[j].className = projects[j].className.replace(" hidden", "");
            if (view_by != "all" && !projects[j].className.includes(view_by)) {
                projects[j].className += " hide";
            }
            else {
                if (numProjects >= 6) {
                    if (numProjects == 6) {
                        document.getElementById("index_next").style.opacity = 1;
                    }
                    projects[j].className += " hidden";
                }
                numProjects++;
            }
        }

        proj_grid.style.opacity = 1;
        proj_grid.style.transform = "translateX(0px)";
    }, 1000);
}

function traverseProj(direction) {
    var prev_button = document.getElementById("index_prev");
    var next_button = document.getElementById("index_next");
    prev_button.style.opacity = 0;
    prev_button.className = "";
    next_button.style.opacity = 0;
    next_button.className = "";

    var projects = document.getElementsByClassName("project");

    if (direction == -1) {
        next_button.style.opacity = 1;
        next_button.className = "cursor";

        for (var i = 3; i < projects.length; i++) {
            if (!projects[i].className.includes("hide") && !projects[i].className.includes("hidden")) {
                break;
            }
        }

        var numProjects = 0;
        for (var j = i - 1; j > 2; j--) {
            if (numProjects < 6 && projects[j].className.includes("hidden")) {
                projects[j].className = projects[j].className.replace(" hidden", "");
                numProjects++;
            }
            else if (numProjects == 6 && projects[j].className.includes("hidden")) {
                prev_button.style.opacity = 1;
                prev_button.className = "cursor";
                break;
            }
        }

        for (var k = i; k < projects.length; k++) {
            if (!projects[k].className.includes("hide") && !projects[k].className.includes("hidden")) {
                projects[k].className += " hidden";
            }
        }
    }

    else {
        prev_button.style.opacity = 1;
        prev_button.className = "cursor";

        var toEnd = 0;
        for (var i = 3; i < projects.length; i++) {
            if (!projects[i].className.includes("hide") && !projects[i].className.includes("hidden")) {
                projects[i].className += " hidden";
                toEnd++;

                if (toEnd == 6) {
                    i++;
                    break;
                }
            }
        }

        var numProjects = 0;
        for (var j = i; j < projects.length; j++) {
            if (numProjects < 6 && projects[j].className.includes("hidden")) {
                projects[j].className = projects[j].className.replace(" hidden", "");
                numProjects++;
            }
            else if (numProjects == 6 && projects[j].className.includes("hidden")) {
                next_button.style.opacity = 1;
                next_button.className = "cursor";
                break;
            }
        }
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
    if (goToProj != null) {
        if (goToProj == 1) {
            var goto = document.getElementById("projects_section");
        }
        else if (goToProj == 2) {
            var goto = document.getElementId("about_me");
        }
        var goto_margin = parseInt(window.getComputedStyle(goto).marginTop, 10)
        var coord = goto.getBoundingClientRect().y - document.getElementsByTagName("header")[0].offsetHeight - goto_margin;
        window.scrollTo(0, coord);

        sessionStorage.removeItem("jumpTo");
    }

    document.getElementById('top_projects').className += 'loaded';

    var options = document.getElementsByClassName("view_option");
    for (let i = 0; i < options.length; i++) {
        options[i].addEventListener("click", function () { re_sort(options[i].id); });
    }

    var prev_button = document.getElementById("index_prev");
    var next_button = document.getElementById("index_next");
    prev_button.addEventListener("click", function () { if (prev_button.style.opacity == 1) { traverseProj(-1); } });
    next_button.addEventListener("click", function () { if (next_button.style.opacity == 1) { traverseProj(1); } });

    window.addEventListener("scroll", initScrollEvents);

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

    var header = document.getElementsByTagName("header")[0];
    header.style.height = "65px";
    header.style.boxShadow = "5px 1px 7px black";
    header.style.paddingTop = "0px";

    document.getElementsByClassName("prev")[0].addEventListener("click", function () { plusSlides(-1) });
    document.getElementsByClassName("next")[0].addEventListener("click", function () { plusSlides(1) });

    var thumbnails = document.getElementsByClassName("thumbnail_img");
    for (let i = 0; i < thumbnails.length; i++) {
        thumbnails[i].addEventListener("click", function () { currentSlide(i) });
    }

    showSlides(slideIndex);
}