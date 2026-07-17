const cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalPrice = 0;
let totalOldPrice = 0;
let totalDiscount = 0;

if (cart.length === 0) {
    document.getElementById("cart-items").innerHTML = `
        <div class="cart-empty">
            <i class="bi bi-cart-x"></i>
            <h2>سبد خرید شما خالی است</h2>
            <p>هنوز محصولی به سبد خرید اضافه نکرده‌اید.</p>
        </div>
    `;
}
else {
    fetch("data/products.json")
        .then(res => res.json())
        .then(products => {
            cart.forEach(item => {
                const product = products.find(p => p.id === item.id);
                totalPrice += product.price * item.count;
                if (product.oldPrice) {
                    totalOldPrice += product.oldPrice * item.count;
                    totalDiscount += (product.oldPrice - product.price) * item.count;
                } else {
                    totalOldPrice += product.price * item.count;
                }
            });
            let html = "";
            cart.forEach(item => {
                const product = products.find(p => p.id === item.id);
                html += `
                <div class="cart-item">
                    <img src="${product.images[0]}" alt="${product.name}">
                    <div class="cart-info">
                        <h3>${product.name}</h3>
                        <p>
                            <span>رنگ:</span>
                            ${item.color}
                        </p>
                        <p>
                            <span>تعداد:</span>
                            ${item.count.toLocaleString("fa-IR")}
                        </p>
                        <p class="cart-price">
                            ${(product.price * item.count).toLocaleString("fa-IR")} تومان
                        </p>
                    </div>
                </div>`;
            });
            document.getElementById("cart-items").innerHTML = html;
            document.getElementById("total-price").textContent = totalOldPrice.toLocaleString("fa-IR") + " تومان";
            document.getElementById("discount").textContent = totalDiscount.toLocaleString("fa-IR") + " تومان";
            document.getElementById("final-price").textContent = totalPrice.toLocaleString("fa-IR") + " تومان";
        });
}
