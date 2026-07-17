updateCartBadge = () => {

    const badge = document.querySelector(".cart-badge");
    if (!badge) return;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let total = 0;

    cart.forEach(item => {
        total += item.count;
    });

    badge.textContent = total.toLocaleString("fa-IR");
}
updateCartBadge();