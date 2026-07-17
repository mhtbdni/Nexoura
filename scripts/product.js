const params = new URLSearchParams(window.location.search);
const productId = parseInt(params.get("id"));
let product = null;
let quantityProduct = 1;

fetch("data/products.json")
    .then(response => response.json())
    .then(products => {
        product = products.find(item => item.id === productId);
        if (!product) {
            document.body.innerHTML = "<h2>محصول پیدا نشد</h2>"
            return
        }
        document.getElementById("image").src = product.images[0];
        document.getElementById("name").textContent = product.name;
        document.getElementById("description").textContent = product.description;
        document.getElementById("price").textContent = product.price.toLocaleString("fa-IR") + " " + "تومان";

        if (product.oldPrice) document.getElementById("old-price").textContent = product.oldPrice.toLocaleString("fa-IR");
        else document.getElementById("old-price").style.display = "none";

        document.getElementById("rate").textContent = product.rate.toLocaleString("fa-IR");
        const percent = (product.rate / 5) * 100;
        document.querySelector(".product-rate").style.setProperty("--rate-fill", percent + "%");

        let gallery = '';
        product.images.forEach((item) => {
            gallery += `
            <img src="${item}" class="img">`
        })
        document.getElementById("gallery").innerHTML = gallery;
        let imgs = document.querySelectorAll(".img");
        imgs.forEach((item) => {
            item.onclick = () => { document.getElementById("image").src = item.src; }
        });


        let table = "";
        product.specs.forEach((item) => {
            table += `
            <tr>
            <th>${item.title}</th>
            <td>${item.value}</td>
            </tr> `;
        });
        document.getElementById("spec-table").innerHTML = table;

        let colors = '';
        product.colors.forEach((item, index) => {
            colors += `
                <input type="radio" id="color${index}" name="color" ${index === 0 ? "checked" : ""} hidden>
                <label for="color${index}" class="color-box">
                    <span>${item.name}</span>
                    <div class="color-circle"
                        style="background:${item.code}">
                    </div>
                </label>`
        })
        document.getElementById("color-list").innerHTML = colors;
        document.querySelectorAll('input[name="color"]').forEach(item => {
            item.addEventListener("change", loadCartState);
        });
        loadCartState();
    })
    .catch(error => {
        console.log(error);
        alert("خطا در دریافت اطلاعات محصولات");
    })
// =====================================================
saveCart = () => {

    const selectedRadio = document.querySelector('input[name="color"]:checked');
    const colorIndex = Number(selectedRadio.id.replace("color", ""));
    const selectedColor = product.colors[colorIndex];

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    let exist = cart.find(item =>
        item.id === product.id &&
        item.color === selectedColor.name
    );

    if (exist) {
        exist.count = quantityProduct;
    } else {
        cart.push({
            id: product.id,
            count: quantityProduct,
            color: selectedColor.name,
            colorCode: selectedColor.code
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();
}
loadCartState = () => {

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const selectedRadio = document.querySelector('input[name="color"]:checked');
    const colorIndex = Number(selectedRadio.id.replace("color", ""));
    const selectedColor = product.colors[colorIndex];

    const exist = cart.find(item =>
        item.id === product.id &&
        item.color === selectedColor.name
    );

    if (exist) {
        quantityProduct = exist.count;
        count.textContent = quantityProduct.toLocaleString("fa-IR");
        addBtn.classList.add("hide");
        productCount.className = "show";
        if (quantityProduct == 1) {
            mines.classList.add("hide");
            trash.classList.remove("hide");
        } else {
            mines.classList.remove("hide");
            trash.classList.add("hide");
        }

    } else {
        quantityProduct = 1;
        count.textContent = "۱";
        addBtn.classList.remove("hide");
        productCount.className = "hide";
        mines.classList.add("hide");
        trash.classList.remove("hide");
    }
}

// --------------
const addBtn = document.querySelector("#add-btn-cart");
const productCount = document.querySelector("#product-count");
const trash = document.querySelector("#trash-btn");
const plus = document.querySelector(".plus");
const count = document.querySelector(".count");
const mines = document.querySelector("#mines-btn");
const toast = document.querySelector(".toast");


addBtn.addEventListener('click', () => {
    addBtn.classList.add('hide');
    productCount.className = 'show';
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
    saveCart();
})

trash.addEventListener("click", () => {
    addBtn.classList.remove("hide");
    productCount.className = "hide";
    quantityProduct = 1;
    count.textContent = "۱";
    const selectedRadio = document.querySelector('input[name="color"]:checked');
    const colorIndex = Number(selectedRadio.id.replace("color", ""));
    const selectedColor = product.colors[colorIndex];
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart = cart.filter(item =>
        !(item.id === product.id && item.color === selectedColor.name)
    );
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartBadge();
    mines.classList.add("hide");
    trash.classList.remove("hide");
});
plus.addEventListener('click', () => {
    trash.classList.add('hide');
    mines.classList.remove('hide');
    if (quantityProduct < 5) {
        quantityProduct++
        count.textContent = quantityProduct.toLocaleString('fa-IR')
        saveCart();
    }

})
mines.addEventListener('click', () => {
    if (quantityProduct > 1) {
        quantityProduct--
        count.textContent = quantityProduct.toLocaleString('fa-IR')
        saveCart();
    }
    if (quantityProduct == 1) {
        mines.classList.add('hide');
        trash.classList.remove('hide');
    }

})