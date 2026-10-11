document.addEventListener("DOMContentLoaded", () => {



    const navLinks = document.querySelectorAll(".nav-link");
    const sections = document.querySelectorAll("section");

    function showSection(targetId) {

        sections.forEach(section => {
            section.classList.toggle(
                "active",
                section.id === targetId
            );
        });

        navLinks.forEach(link => {
            link.classList.toggle(
                "active",
                link.getAttribute("href") === `#${targetId}`
            );
        });

        document
            .getElementById("mobileMenu")
            .classList.remove("active");
    }


    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const targetId =
                link.getAttribute("href").substring(1);

            showSection(targetId);
        });

    });


    showSection("home");




    const fadeElements =
        document.querySelectorAll(".fade-in");

    fadeElements.forEach((element, index) => {

        setTimeout(() => {
            element.classList.add("show");
        }, index * 200);

    });



    window.toggleMobileMenu = function () {

        const menu =
            document.getElementById("mobileMenu");

        menu.classList.toggle("active");

    };

});