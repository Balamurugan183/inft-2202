function redirectTo(page) {
    window.location.href = page;
}

document.addEventListener("DOMContentLoaded", function() {
    const noButton = document.getElementById("movingNo");
    
    if (noButton) {
        noButton.addEventListener("mouseover", function() {
            const x = Math.random() * window.innerWidth - 100;
            const y = Math.random() * window.innerHeight - 100;
            noButton.style.position = "absolute";
            noButton.style.left = `${x}px`;
            noButton.style.top = `${y}px`;
        });
    }
});
