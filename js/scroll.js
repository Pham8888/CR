
(() => {
  const header = document.getElementById("siteHeader");
  const reveals = document.querySelectorAll(".reveal");
  const sections = [...document.querySelectorAll("main > section")];

  const reduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if("IntersectionObserver" in window && !reduced){
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}}),{threshold:.12});
    reveals.forEach(el=>observer.observe(el));
  }else reveals.forEach(el=>el.classList.add("visible"));
  const update=()=>header.classList.toggle("scrolled",window.scrollY>35);
  update();window.addEventListener("scroll",update,{passive:true});
})();

(() => {
  const header = document.getElementById("siteHeader");
  const reveals = document.querySelectorAll(".reveal");
  const sections = [...document.querySelectorAll("main > section.section")];
  const reduced = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  if (!sections.length) return;

  // Hiệu ứng hiện nội dung khi section đi vào màn hình
  if ("IntersectionObserver" in window && !reduced) {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add("visible"));
  }

  // Cập nhật trạng thái header
  const updateHeader = () => {
    if (header) {
      header.classList.toggle("scrolled", window.scrollY > 35);
    }
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // Cuộn từng section
  let currentIndex = 0;
  let locked = false;
  let animationFrame = null;

  const duration = 950;

  function getSectionTop(index) {
    return sections[index].getBoundingClientRect().top + window.scrollY;
  }

  function findCurrentSection() {
    const scrollY = window.scrollY;
    let closest = 0;
    let minDistance = Infinity;

    sections.forEach((section, index) => {
      const distance = Math.abs(getSectionTop(index) - scrollY);

      if (distance < minDistance) {
        minDistance = distance;
        closest = index;
      }
    });

    return closest;
  }

  function easeInOut(t) {
    return t < 0.5
      ? 4 * t * t * t
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function goToSection(index) {
    index = Math.max(0, Math.min(index, sections.length - 1));

    if (locked || index === currentIndex) return;

    locked = true;
    currentIndex = index;

    const start = window.scrollY;
    const target = getSectionTop(index);
    const distance = target - start;
    const startTime = performance.now();

    if (reduced) {
      window.scrollTo(0, target);
      locked = false;
      return;
    }

    function animate(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = easeInOut(progress);

      window.scrollTo(0, start + distance * eased);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        window.scrollTo(0, target);
        animationFrame = null;
        locked = false;
      }
    }

    animationFrame = requestAnimationFrame(animate);
  }

  // Mỗi lần lăn chuột chuyển một section
  let wheelAccumulator = 0;
  let wheelReset;

  window.addEventListener(
    "wheel",
    event => {
      event.preventDefault();

      if (locked) return;

      wheelAccumulator += event.deltaY;

      clearTimeout(wheelReset);

      wheelReset = setTimeout(() => {
        wheelAccumulator = 0;
      }, 120);

      if (Math.abs(wheelAccumulator) < 35) return;

      const direction = wheelAccumulator > 0 ? 1 : -1;
      wheelAccumulator = 0;

      currentIndex = findCurrentSection();
      goToSection(currentIndex + direction);
    },
    { passive: false }
  );

  // Hỗ trợ bàn phím
  window.addEventListener("keydown", event => {
    if (locked) return;

    if (["ArrowDown", "PageDown"].includes(event.key)) {
      event.preventDefault();
      currentIndex = findCurrentSection();
      goToSection(currentIndex + 1);
    }

    if (["ArrowUp", "PageUp"].includes(event.key)) {
      event.preventDefault();
      currentIndex = findCurrentSection();
      goToSection(currentIndex - 1);
    }
  });

  // Đồng bộ vị trí khi người dùng bấm link điều hướng
  window.addEventListener("hashchange", () => {
    const id = location.hash.slice(1);
    const index = sections.findIndex(section => section.id === id);

    if (index !== -1) currentIndex = index;
  });

  window.addEventListener("resize", () => {
    currentIndex = findCurrentSection();
  });
})();
