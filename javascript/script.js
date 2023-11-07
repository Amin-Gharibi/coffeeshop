let $ = document
const themeToggleBtns = $.querySelectorAll(".theme-toggle")
const openNavMenu = $.querySelector("#open-navMenu")
const navMenu = $.querySelector("#navMenu")
const overlay = $.querySelector(".overlay")
const closeNavMenuBtn = $.querySelector("#close-navMenu")
const openSubMenuBtn = $.querySelector("#open-subMenu")
const subMenu = $.querySelector("#subMenu")
const subMenuListItem = $.querySelector("#subMenu-item")
const shoppingCartMobile = $.querySelector("#shoppingCart-mobile")
const openShoppingCartBtn = $.querySelector("#open-shopping-cart")
const closeShoppingCartBtn = $.querySelector("#close-shopping-cart")
const scrollDownBtn = $.querySelector("#scroll-down")
const latestProductsSection = $.querySelector(".latest-products")
const scrollUpBtn = $.querySelector("#scroll-up")
const companyPhoneNumbers = $.querySelectorAll(".company-phone-numbers")
const phoneCopiedAlerts = $.querySelectorAll(".copied-alert")

// handle if overlay has click event or not
let hasOverlayClickEvent = false

// handle things that must be read on page loading
window.addEventListener("load", () => {
    // handle swiper js
    const swiper = new Swiper(".swiper", {
        slidesPerView: 2,
        spaceBetween: 18,
        navigation: {
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
        },
        breakpoints: {
            640: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
            1280: {
                slidesPerView: 4,
                spaceBetween: 20,
            }
        },
    });
})

const changeThemeHandler = () => {
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        $.documentElement.classList.remove('dark')
        localStorage.theme = "light"
    } else {
        $.documentElement.classList.add('dark')
        localStorage.theme = "dark"
    }
}

const navMenuOpeningAndClosingHandler = () => {
    navMenu.classList.toggle("navMenu__visible")
    overlay.classList.toggle("overlay__visible")

    overlayClickEventHandling(navMenuOpeningAndClosingHandler)
}

const shoppingCartOpeningAndClosingHandler = () => {
    shoppingCartMobile.classList.toggle("shopping-cart__visible")
    overlay.classList.toggle("overlay__visible")

    overlayClickEventHandling(shoppingCartOpeningAndClosingHandler)
}

const overlayClickEventHandling = func => {
    // close menu as soon as user clicks on the free space when the navMenu is displayed
    if (hasOverlayClickEvent) {
        overlay.removeEventListener("click", func)
    } else {
        overlay.addEventListener("click", func)
    }
    // set the new situation of click event of overlay
    hasOverlayClickEvent = !hasOverlayClickEvent
}

// handle scrolling
const scrollToHandler = target => {
    window.scrollTo({top: target, behavior: "smooth"})
}

// handle copying texts
const copyTextHandler = (phoneNumber, copiedAlert) => {
    navigator.clipboard.writeText(phoneNumber).then(() => {
            copiedAlert.innerText = 'کپی شد'
            copiedAlert.classList.replace("invisible", "visible")
            copiedAlert.classList.replace("opacity-0", "opacity-100")
            setTimeout(() => {
                copiedAlert.classList.replace("visible", "invisible")
                copiedAlert.classList.replace("opacity-100", "opacity-0")
            }, 1000)
        },
        () => {
            copiedAlert.innerText = 'کپی ناموفق'
            copiedAlert.classList.replace("invisible", "visible")
            copiedAlert.classList.replace("opacity-0", "opacity-100")
            setTimeout(() => {
                copiedAlert.classList.replace("visible", "invisible")
                copiedAlert.classList.replace("opacity-100", "opacity-0")
            }, 1000)
        })
}

// add event to each toggle btn
themeToggleBtns.forEach(btn => {
    btn.addEventListener("click", changeThemeHandler)
})

// handle opening navMenu
openNavMenu.addEventListener("click", navMenuOpeningAndClosingHandler)

// handle closing navManu
closeNavMenuBtn.addEventListener("click", navMenuOpeningAndClosingHandler)

// handle opening shopping cart
openShoppingCartBtn.addEventListener("click", shoppingCartOpeningAndClosingHandler)

// handle closing shopping cart
closeShoppingCartBtn.addEventListener("click", shoppingCartOpeningAndClosingHandler)

// handle scroll down button in the header
scrollDownBtn.addEventListener("click", () => {
    scrollToHandler(latestProductsSection.offsetTop)
})

// handle scroll up button in the footer
scrollUpBtn.addEventListener("click", () => {
    scrollToHandler(0)
})

// copy each phone number
companyPhoneNumbers.forEach((phoneNumber, index) => {
    phoneNumber.addEventListener("click", (e) => {
        copyTextHandler(e.currentTarget.innerText, phoneCopiedAlerts[index])
    })
})

// handle opening and closing subMenu
openSubMenuBtn.addEventListener("click", () => {
    subMenu.classList.toggle("hidden")
    subMenuListItem.classList.toggle("!text-orange-300")
})