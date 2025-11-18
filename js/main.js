// --- 1. MA'LUMOTLAR BAZASI ---
const slidesData = [
  {
    title: "PEPERONI",
    pizzaImg: "./img/pitsa1.svg",
    decoImgs: [
      "./img/1.1.svg",
      "./img/1.2.svg",
      "./img/1.3.svg",
      "./img/1.4.svg",
    ],
    bgColor: "var(--pitsa--birinchi-fon)",
    details: {
      subTitle: "Issiq va Achchiq Peperoni",
      description:
        "Klassik peperoni pitsasi, yuqori sifatli kolbasa, mozzarella pishlog'i va bizning maxfiy pomidor sousimiz bilan.",
      price: "$12.99",
    },
  },
  {
    title: "VEGGIE",
    pizzaImg: "./img/pitsa2.svg",
    decoImgs: [
      "./img/2..1.svg",
      "./img/2.2.svg",
      "./img/2.3.svg",
      "./img/2.4.svg",
    ],
    bgColor: "var(--pitsa--ikkinchi-fon)",
    details: {
      subTitle: "Yangi Sabzavotli Veggie",
      description:
        "Faqat yangi uzilgan sabzavotlar: qo'ziqorin, bulg'or qalampiri, zaytun va piyoz.",
      price: "$14.99",
    },
  },
];

// --- 2. ASOSIY O'ZGARUVCHILAR VA DOM ELEMENTLARI ---
let currentSlide = 0;
const totalSlides = slidesData.length;

const body = document.body;
const heroSection = document.getElementById("hero-section");
const detailsSection = document.getElementById("details-section");
const pizzaTitle = document.getElementById("pizza-title");
const pizzaImage = document.getElementById("pizza-image");
const detailsList = document.getElementById("details-list");
const decoImages = document.querySelectorAll(".deco-img");

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const knowMoreBtn = document.getElementById("know-more-btn");

const animatedElements = [pizzaTitle, pizzaImage, ...decoImages];

// --- 3. ASOSIY FUNKSIYALAR ---

function updateSlide(slideIndex) {
  const data = slidesData[slideIndex]; // 1. Asosiy ma'lumotlarni almashtirish

  body.style.backgroundColor = data.bgColor;
  pizzaTitle.textContent = data.title;
  pizzaImage.src = data.pizzaImg; // 2. Bezak rasmlarini almashtirish

  decoImages.forEach((img, index) => {
    if (data.decoImgs[index]) {
      img.src = data.decoImgs[index];
    }
  }); // 3. Pastdagi ma'lumotlar blokini yangilash

  detailsList.innerHTML = `
        <li>
            <h3>${data.details.subTitle}</h3>
            <p>${data.details.description}</p>
        </li>
        <li class="price-tag">
            <span class="price">${data.details.price}</span>
            <button class="buy-on" style="background-color: ${data.bgColor}">Sotib olish</button>
            </li>
    `; // 4. "Know more" tugmasi rangini yangilash
  knowMoreBtn.onmouseover = () => {
    knowMoreBtn.style.backgroundColor = "white";
    knowMoreBtn.style.color = data.bgColor;
  };
  knowMoreBtn.onmouseout = () => {
    knowMoreBtn.style.backgroundColor = "transparent";
    knowMoreBtn.style.color = "white";
  }; // 5. Animatsiyalarni qayta ishga tushirish (Deco, H1, Pizza)

  resetAnimations();

  // Pitsa pozitsiyasini hero joyiga tiklash
  pizzaImage.classList.remove("pizza-in-list");
}

function showNextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides;
  updateSlide(currentSlide);
}

function showPrevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
  updateSlide(currentSlide);
}

function scrollToDetails() {
  // 1. Listni ko'rinadigan qilish
  detailsSection.style.display = "flex"; // 2. Pizzaga o'tish animatsiyasi uchun klassni qo'shish (markazga o'tish)
  pizzaImage.classList.add("pizza-in-list"); // 3. CSS animatsiyalari (deco chiqib ketishi) ishga tushishi uchun bodyga klass qo'shish

  body.classList.add("is-scrolled"); // 4. Listga silliq scroll qilish

  detailsSection.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}

function handleScroll() {
  const heroHeight = heroSection.clientHeight; // Agar foydalanuvchi tepaga (hero qismiga) qaytsa

  if (window.scrollY < heroHeight / 2) {
    body.classList.remove("is-scrolled"); // Pizzani hero joyiga qaytarish
    pizzaImage.classList.remove("pizza-in-list"); // Listni qayta yashirish (animatsiya tugagach)

    setTimeout(() => {
      if (!body.classList.contains("is-scrolled")) {
        detailsSection.style.display = "none";
      }
    }, 600);
  } else {
    // Pastga scroll qilinsa, pitsani fixed holatda ushlab turish
    pizzaImage.classList.add("pizza-in-list");
  }
}

function resetAnimations() {
  // 1. Barcha elementlarga "re-animating" klassini qo'shamiz
  animatedElements.forEach((el) => {
    el.classList.add("re-animating");
  }); // 2. Qisqa vaqtdan keyin klassni olib tashlaymiz.

  setTimeout(() => {
    animatedElements.forEach((el) => {
      el.classList.remove("re-animating");
    });
  }, 10);
}

// --- 4. HODISALARNI BOG'LASH (EVENT LISTENERS) ---
nextBtn.addEventListener("click", showNextSlide);
prevBtn.addEventListener("click", showPrevSlide);
knowMoreBtn.addEventListener("click", scrollToDetails);
window.addEventListener("scroll", handleScroll);

// Boshlang'ich holatni o'rnatish
updateSlide(0);
