const cards = document.querySelectorAll(".card");

cards.forEach((card, index) => {
    let isDragging = false;
    let startX, startY, offsetX = 0, offsetY = 0;

    card.addEventListener("mousedown", (e) => {
        isDragging = true;
        card.style.zIndex = 10; // Bring the dragged card to the front
        startX = e.clientX;
        startY = e.clientY;
        offsetX = card.offsetLeft;
        offsetY = card.offsetTop;
        card.style.cursor = "grabbing";

        function moveAt(pageX, pageY) {
            card.style.left = pageX - startX + offsetX + "px";
            card.style.top = pageY - startY + offsetY + "px";
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener("mousemove", onMouseMove);

        document.addEventListener("mouseup", () => {
            isDragging = false;
            card.style.cursor = "grab";
            document.removeEventListener("mousemove", onMouseMove);
            card.style.zIndex = index + 1; // Restore z-index order
        }, { once: true });
    });

    // Prevent default dragging behavior
    card.ondragstart = () => false;
});
