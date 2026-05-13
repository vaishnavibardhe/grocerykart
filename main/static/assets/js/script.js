//------- Top ----
const promo = document.getElementById("promobar");
const closeBtn = document.getElementById("closebtn");

/* Hide */
closeBtn.addEventListener("click", () => {
    promo.classList.add("hide");
});

/* Show on any app-download icon click */
document.querySelectorAll(".app-download i").forEach(icon => {
    icon.addEventListener("click", () => {
        promo.classList.remove("hide");
    });
});

//===== Hamburger =====
const toggle = document.querySelector(".menu-toggle");
const menu = document.querySelector(".nav-menu");
const back = document.querySelector(".back");
const overlay = document.querySelector(".menu-overlay");

// open
toggle.addEventListener("click", () => {
    menu.classList.add("active");
    overlay.classList.add("active");
});

// close button
back.addEventListener("click", () => {
    menu.classList.remove("active");
    overlay.classList.remove("active");
});

// click outside (overlay)
overlay.addEventListener("click", () => {
    menu.classList.remove("active");
    overlay.classList.remove("active");
});


//------ Promo Left Right ------
function showTeam(index) {

    let boxes = document.querySelectorAll(".team-box");
    let dots = document.querySelectorAll(".dot");

    boxes.forEach(box => box.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    boxes[index].classList.add("active");
    dots[index].classList.add("active");
}


//-------- Product Slider ---------
const slider = document.getElementById("productSlider");
const leftBtn = document.querySelector(".slider-btn.left");
const rightBtn = document.querySelector(".slider-btn.right");

// Scroll amount (kitna move hoga)
const scrollAmount = 300;

// Right button
rightBtn.addEventListener("click", () => {
    slider.scrollBy({
        left: scrollAmount,
        behavior: "smooth"
    });
});

// Left button
leftBtn.addEventListener("click", () => {
    slider.scrollBy({
        left: -scrollAmount,
        behavior: "smooth"
    });
});


//===== ADMIN LOGIN MODAL =====
function openLogin(event) {
    event.preventDefault();
    const modal = document.getElementById("loginModal");
    modal.style.display = "block";
    document.body.classList.add("popup-open");
}

function closeLogin() {
    const modal = document.getElementById("loginModal");
    modal.style.display = "none";
    document.body.classList.remove("popup-open");
}

// Close modal when clicking outside the content
window.addEventListener("click", function (event) {
    const modal = document.getElementById("loginModal");
    if (event.target === modal) {
        closeLogin();
    }
});



//-------- Blog Slider ---------
const blogSlider = document.getElementById("blogSlider");

const blogLeftBtn = document.querySelector(".blog-slider .left");
const blogRightBtn = document.querySelector(".blog-slider .right");

blogRightBtn.addEventListener("click", () => {
    blogSlider.scrollBy({
        left: 300,
        behavior: "smooth"
    });
});

blogLeftBtn.addEventListener("click", () => {
    blogSlider.scrollBy({
        left: -300,
        behavior: "smooth"
    });
});


//-------- Scroll to Top --------
let tapTop = document.querySelector(".tap-top");

window.addEventListener("scroll", function () {

    if (window.scrollY > 200) {
        tapTop.classList.add("show");
    } else {
        tapTop.classList.remove("show");
    }

});

tapTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

//------- Header & Footer-------
document.addEventListener("DOMContentLoaded", function () {

    fetch("../header.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById("header").innerHTML = data;

            function initSearch() {

                const input = document.getElementById("searchInput");

                if (!input) {
                    console.log("Search input not found ❌");
                    return;
                }


            }
            initSearch();
            function initSearchToggle() {
                const searchToggle = document.getElementById("searchToggle");
                const searchRow = document.querySelector(".search-row");

                if (searchToggle && searchRow) {
                    searchToggle.addEventListener("click", () => {
                        searchRow.classList.toggle("active");
                    });
                }
            }
            initSearchToggle();
        });

    fetch("../footer.html")
        .then(res => res.text())
        .then(data => {
            document.getElementById("footer").innerHTML = data;
        });

});

window.addEventListener("scroll", function () {

    if (document.body.classList.contains("popup-open")) return; // 🔥 STOP SCROLL LOGIC

    let header = document.querySelector(".search-row");

    if (window.scrollY > 120) {
        header.style.position = "fixed";
        header.style.top = "0";
        header.style.width = "100%";
    } else {
        header.style.position = "relative";
    }
});


// ===== LOADER + POPUP (FINAL) =====
document.addEventListener("DOMContentLoaded", function () {

    const loader = document.getElementById("loader");
    const popup = document.getElementById("newsletterPopup");

    // ✅ PAGE LOAD hote hi scroll lock
    document.body.classList.add("popup-open");

    // Step 1: loader dikhega minimum 2 sec
    setTimeout(() => {

        // Step 2: loader hide
        loader.classList.add("hide");

        setTimeout(() => {
            popup.style.display = "flex";

            // ✅ ADD THIS LINE
            document.body.classList.add("popup-open");

            // 👇 yahi pe add karna hai (animation trigger)
            setTimeout(() => {
                popup.classList.add("show");
            }, 50);

        }, 500);
    }, 2000); // loader timing (increase/decrease kar sakte ho)
});


document.addEventListener("DOMContentLoaded", function () {

    const popup = document.getElementById("newsletterPopup");
    const closeBtn = document.querySelector(".close-btn");

    // ❌ Close button
    if (closeBtn) {
        closeBtn.addEventListener("click", function () {
            popup.style.display = "none";
            document.body.classList.remove("popup-open"); // ✅ unlock
        });
    }

    // 🖱️ Click outside popup (background click)
    window.addEventListener("click", function (e) {
        if (e.target === popup) {
            popup.style.display = "none";
            document.body.classList.remove("popup-open"); // ✅ unlock
        }
    });

});

//---------- SearchProducts ----------
// let allProducts = [];

// // JSON load
// fetch("../product.json")
//     .then(res => res.json())
//     .then(data => {
//         allProducts = data;
//         console.log("Products Loaded ✅", allProducts);
//     });

// // SEARCH FUNCTION
// function searchProduct() {

//     let input = document.getElementById("searchInput").value.toLowerCase();
//     let resultBox = document.getElementById("searchResults");

//     resultBox.innerHTML = "";

//     if (input === "") {
//         resultBox.style.display = "none";
//         return;
//     }

//     let filtered = allProducts.filter(product =>
//         product.name.toLowerCase().includes(input)
//     );

//     if (filtered.length === 0) {
//         resultBox.innerHTML = "<div>No product found</div>";
//     }

//     filtered.forEach(product => {

//         let div = document.createElement("div");

//         div.innerHTML = `${product.name} - ₹${product.price}`;

//         div.onclick = () => {
//             window.location.href = `pages/product.html?id=${product.id}`;
//         };

//         resultBox.appendChild(div);
//     });a

//     resultBox.style.display = "block";
// }

// ===== USER DROPDOWN =====
document.addEventListener("DOMContentLoaded", function () {
    let userIcon = document.getElementById("userIcon");
    let dropdown = document.getElementById("dropdownMenu");

    if (userIcon && dropdown) {
        // Hover to show dropdown (for desktop)
        userIcon.addEventListener("mouseenter", function () {
            dropdown.classList.add("active");
        });

        userIcon.addEventListener("mouseleave", function () {
            dropdown.classList.remove("active");
        });

        // Click to toggle dropdown (for mobile) - but prevent icon shift
        userIcon.addEventListener("click", function (e) {
            e.preventDefault();
            e.stopPropagation();
            dropdown.classList.toggle("active");
        });

        // Close dropdown when clicking outside
        document.addEventListener("click", function (e) {
            if (!userIcon.contains(e.target)) {
                dropdown.classList.remove("active");
            }
        });

        // Close on Escape key
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape") {
                dropdown.classList.remove("active");
            }
        });
    }
});