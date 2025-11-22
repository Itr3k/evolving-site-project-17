export const initInViewAnimations = () => {
  if (typeof window === 'undefined') return;

  const once = true;
  
  if (!(window as any).__inViewIO) {
    (window as any).__inViewIO = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
          if (once) (window as any).__inViewIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: "0px 0px -10% 0px" });
  }

  const selector = ".animate-on-scroll";
  document.querySelectorAll(selector).forEach((el) => {
    (window as any).__inViewIO.observe(el);
  });
};
