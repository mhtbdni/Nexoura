const tabLogin = document.getElementById("tab-login");
const tabSignup = document.getElementById("tab-signup");
const formLogin = document.getElementById("form-login");
const formSignup = document.getElementById("form-signup");
const loginPhone = document.getElementById("login-phone");
const loginPassword = document.getElementById("login-password");
const signupName = document.getElementById("signup-name");
const signupPhone = document.getElementById("signup-phone");
const signupEmail = document.getElementById("signup-email");
const signupPassword = document.getElementById("signup-password");
const signupConfirm = document.getElementById("signup-confirm");
const tabsWrap = document.querySelector(".auth-tabs");
const toast = document.getElementById("auth-toast");

tabLogin.addEventListener("click", () => {
    tabsWrap.classList.remove("signup-active");
    tabSignup.classList.remove("active");
    tabLogin.classList.add("active");
    formSignup.classList.remove("active");
    formLogin.classList.add("active");

});

tabSignup.addEventListener("click", () => {
    tabsWrap.classList.add("signup-active");
    tabLogin.classList.remove("active");
    tabSignup.classList.add("active");
    formLogin.classList.remove("active");
    formSignup.classList.add("active");
});

showToast = (message) => {
    toast.querySelector("span").textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

const eyeButtons = document.querySelectorAll(".field-toggle");

for (let i = 0; i < eyeButtons.length; i++) {
    eyeButtons[i].addEventListener("click", function () {
        let input = this.parentElement.querySelector("input");
        if (input.type == "password") {
            input.type = "text";
            this.innerHTML = '<i class="bi bi-eye-slash"></i>';
        }
        else {
            input.type = "password";
            this.innerHTML = '<i class="bi bi-eye"></i>';
        }
    });
}

loginPhone.addEventListener("keydown", (e) => {
    if (!(e.key >= "0" && e.key <= "9") && e.key !== "Backspace" && e.key !== "Tab" && e.key !== "ArrowLeft" && e.key !== "ArrowRight" && e.key !== "Delete") {
        e.preventDefault();
    }
});
loginPassword.addEventListener("keydown", (e) => {
    if (!((e.key >= "0" && e.key <= "9") || (e.key >= "a" && e.key <= "z") || (e.key >= "A" && e.key <= "Z")) &&
        e.key !== "Backspace" &&
        e.key !== "Tab" &&
        e.key !== "ArrowLeft" &&
        e.key !== "ArrowRight" &&
        e.key !== "Delete"
    ) {
        e.preventDefault();
    }
});
signupName.addEventListener("keydown", (e) => {
    if (!((e.key >= "آ" && e.key <= "ی") || (e.key >= "a" && e.key <= "z") || (e.key >= "A" && e.key <= "Z") || e.key === " "))
        e.preventDefault();
})
signupPhone.addEventListener("keydown", (e) => {
    if (!(e.key >= "0" && e.key <= "9") && e.key !== "Backspace" && e.key !== "Tab" && e.key !== "ArrowLeft" && e.key !== "ArrowRight" && e.key !== "Delete") {
        e.preventDefault();
    }
});
signupPassword.addEventListener("keydown", (e) => {
    if (!((e.key >= "0" && e.key <= "9") || (e.key >= "a" && e.key <= "z") || (e.key >= "A" && e.key <= "Z")) &&
        e.key !== "Backspace" &&
        e.key !== "Tab" &&
        e.key !== "ArrowLeft" &&
        e.key !== "ArrowRight" &&
        e.key !== "Delete"
    ) {
        e.preventDefault();
    }
});
signupConfirm.addEventListener("keydown", (e) => {
    if (!((e.key >= "0" && e.key <= "9") || (e.key >= "a" && e.key <= "z") || (e.key >= "A" && e.key <= "Z")) &&
        e.key !== "Backspace" &&
        e.key !== "Tab" &&
        e.key !== "ArrowLeft" &&
        e.key !== "ArrowRight" &&
        e.key !== "Delete"
    ) {
        e.preventDefault();
    }
});

formLogin.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    if (loginPhone.value.trim().length < 11) {
        loginPhone.parentElement.parentElement.classList.add("invalid");
        valid = false;
    }
    if (loginPassword.value.trim().length < 6) {
        loginPassword.parentElement.parentElement.classList.add("invalid");
        valid = false;
    }
    if (valid) {
        showToast("ورود با موفقیت انجام شد");
    }

});

formSignup.addEventListener("submit", (e) => {
    e.preventDefault();
    let valid = true;
    if (signupName.value.trim().length < 2) {
        signupName.parentElement.parentElement.classList.add("invalid");
        valid = false;
    }
    if (signupPhone.value.trim().length < 11) {
        signupPhone.parentElement.parentElement.classList.add("invalid");
        valid = false;
    }
    if (signupPassword.value.trim().length < 6) {
        signupPassword.parentElement.parentElement.classList.add("invalid");
        valid = false;
    }
    if (signupConfirm.value != signupPassword.value) {
        signupConfirm.parentElement.parentElement.classList.add("invalid");
        valid = false;
    }
    if (signupEmail.value.trim().length < 11 || signupEmail.value.indexOf("@") == -1 || signupEmail.value.indexOf(".") == -1) {
        signupEmail.parentElement.parentElement.classList.add("invalid");
        valid = false;
    }
    if (valid) {
        showToast("حساب کاربری با موفقیت ایجاد شد");
    }

});

const inputs = document.querySelectorAll(".field-box input");
for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("input", () => {
        this.parentElement.parentElement.classList.remove("invalid");
    });
}