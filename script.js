let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = () => {
    menu.classList.toggle('bx-x');
    navbar.classList.toggle('open');
};

// Event listener for navbar links
const navbarLinks = document.querySelectorAll('.navbar a');

navbarLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Close the navbar in mobile view
        if (window.innerWidth <= 850) {
            menu.classList.remove('bx-x');
            navbar.classList.remove('open');
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const changingText = document.getElementById("changingText");
    const texts = ["Android App Developer", "Java App Developer", "Fullstack Developer"];

    let index = 0;

    function changeText() {
        changingText.style.opacity = 0;
        setTimeout(() => {
            changingText.textContent = texts[index];
            changingText.style.opacity = 1;
        }, 1000);
        index = (index + 1) % texts.length;
    }

    changeText();

    setInterval(changeText, 5000);
});
