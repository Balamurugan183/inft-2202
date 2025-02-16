const cards = document.querySelectorAll(".card");

let activeCard = null;
let startX, startY, offsetX, offsetY;

cards.forEach((card) => {
    card.addEventListener("mousedown", (e) => {
        activeCard = card;
        startX = e.clientX;
        startY = e.clientY;
        offsetX = card.offsetLeft;
        offsetY = card.offsetTop;
        card.style.cursor = "grabbing";
    });

    document.addEventListener("mousemove", (e) => {
        if (!activeCard) return;
        let x = offsetX + (e.clientX - startX);
        let y = offsetY + (e.clientY - startY);
        activeCard.style.transform = `translate(${x}px, ${y}px) rotate(5deg)`;
    });

    document.addEventListener("mouseup", () => {
        if (activeCard) {
            activeCard.style.cursor = "grab";
            activeCard = null;
        }
    });
});
