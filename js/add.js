const header = document.querySelector("header");

const first__skill = document.querySelector(".skill:first-child");
const sk__counters = document.querySelectorAll(".counter span");
const progress__bars = document.querySelectorAll(".skills svg circle");

const cm__section = document.querySelector(".milestones");
const cm__counters = document.querySelectorAll(".number span");

const portfolio__section = document.querySelector(".portfolio");
const zoom__icons = document.querySelectorAll(".zoom-icon");
const modal__overlay = document.querySelector(".modal-overlay");
const images = document.querySelectorAll(".images img");
const next__btn = document.querySelector(".next-btn");
const prev__btn = document.querySelector(".prev-btn");

const links = document.querySelectorAll(".nav-link");

const toggle__btn = document.querySelector(".toggle-btn");

window.addEventListener("scroll", () => {
   activeLink();
   if (!skillsPlayed) skillsCounter();
   if (!mlPlayed) mlCounter();
});

function updateCount(num, maxNum) {
   let currentNum = +num.innerText;

   if (currentNum < maxNum) {
      num.innerText = currentNum + 1;
      setTimeout(() => {
         updateCount(num, maxNum);
      }, 12)
   }
}

/* ---------- Sticky Navbar ---------- */

function stickyNavbar() {
   header.classList.toggle("scrolled", window.pageYOffset > 0);
}

stickyNavbar();

window.addEventListener("scroll", stickyNavbar);

/* ---------- Reveal Animation ---------- */

let sr = ScrollReveal({
   duration: 2500,
   distance: "60px",
});

sr.reveal(".showcase-info", { delay: 600 });
sr.reveal(".showcase-image", { origin: "top", delay: 700 });

/* ---------- Skills Progress Bar Animation ---------- */

function hasReached(el) {
   let topPosition = el.getBoundingClientRect().top;

   if (window.innerHeight >= topPosition + el.offsetHeight) return true;
   return false;
}

let skillsPlayed = false;

function skillsCounter() {
   if (!hasReached(first__skill)) return;

   skillsPlayed = true;

   sk__counters.forEach((counter, i) => {
      let target = +counter.dataset.target;
      let strokeValue = 427 - 427 * (target / 100);

      progress__bars[i].style.setProperty("--target", strokeValue);

      setTimeout(() => {
         updateCount(counter, target);
      }, 400)
   });

   progress__bars.forEach((p) => (p.style.animation = "progress 2s ease-in-out forwards"));
}

/* ---------- Services Counter Animation ---------- */

let mlPlayed = false;

function mlCounter() {
   if (!hasReached(cm__section)) return;

   mlPlayed = true;

   cm__counters.forEach(ctr => {
      let target = +ctr.dataset.target;

      setTimeout(() => {
         updateCount(ctr, target);
      }, 400)
   })
}

/* ---------- Portfolio Filter Animation ---------- */

let mixer = mixitup(".portfolio-gallery", {
   selectors: {
      target: '.portfolio-card'
   },
   animation: {
      duration: 500,
   }
});

/* ---------- Modal Pop Up Animation ---------- */

let currentIndex = 0;

zoom__icons.forEach((icn, i) =>
   icn.addEventListener("click", () => {
      portfolio__section.classList.add("open");
      document.body.classList.add("stopScrolling");
      currentIndex = i;
      changeImage(currentIndex)
   }));

modal__overlay.addEventListener("click", () => {
   portfolio__section.classList.remove("open");
   document.body.classList.remove("stopScrolling");
});

prev__btn.addEventListener("click", () => {
   if (currentIndex === 0) {
      currentIndex = 5
   } else {
      currentIndex--;
   }
   console.log(currentIndex)
   changeImage(currentIndex)
})

next__btn.addEventListener("click", () => {
   if (currentIndex === 5) {
      currentIndex = 0
   } else {
      currentIndex++;
   }
   console.log(currentIndex)
   changeImage(currentIndex)
})

function changeImage(index) {
   images.forEach(img => img.classList.remove("showImage"));
   images[index].classList.add("showImage");
}

/* ---------- Slider Animation ---------- */

const swiper = new Swiper('.swiper', {
   loop: true,
   speed: 500,
   autoplay: true,
   pagination: {
      el: '.swiper-pagination',
      clickable: true,
   },
});

/* ---------- Change Active Link On Scroll ---------- */

function activeLink() {
   let sections = document.querySelectorAll("section[id]");
   let passedSections = Array.from(sections).map((sct, i) => {
      return {
         y: sct.getBoundingClientRect().top - header.offsetHeight,
         id: i,
      };
   }).filter(sct => sct.y <= 0);

   let currSectionID = passedSections.at(-1).id;

   links.forEach(l => l.classList.remove("active"));
   links[currSectionID].classList.add("active");
}

activeLink();

/* ---------- Change Page Theme ---------- */

let firstTheme = localStorage.getItem("dark");

changeTheme(+firstTheme);

function changeTheme(isDark) {
   if (isDark) {
      document.body.classList.add("dark");
      toggle__btn.classList.replace("bx-moon", "bx-sun");
      localStorage.setItem("dark", 1);
   }
   else {
      document.body.classList.remove("dark");
      toggle__btn.classList.replace("bx-sun", "bx-moon");
      localStorage.setItem("dark", 0);
   }
}

toggle__btn.addEventListener("click", () => {
   changeTheme(!document.body.classList.contains("dark"));
});