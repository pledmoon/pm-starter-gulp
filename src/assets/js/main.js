'use strict';

document.addEventListener('DOMContentLoaded', () => {
  /* ========================= Custom Scroll ========================= */
  const customScrolls = document.querySelectorAll('.js-custom-scroll');

  if (customScrolls) {
    customScrolls.forEach(function(el) {
      new SimpleBar(el, {
        autoHide: false,
        scrollbarMinSize: 4,
      });
    });
  }
  /* ========================= Custom Scroll ========================= */

  /* ========================= Tippy JS ========================= */
  tippy('[data-tooltip]', {
    theme: 'white-border',
    placement: 'bottom',
    //trigger: 'click',
    maxWidth: 300,
    aria: {
      content: null,
      expanded: false,
    },
    onShow(instance) {
      instance.popper.hidden = instance.reference.dataset.tooltip ? false : true;
      instance.setContent(instance.reference.dataset.tooltip);
    }
  });

  tippy('[data-tooltip-template]', {
    placement: 'bottom-end',
    theme: 'white-border',
    trigger: 'click',
    maxWidth: 220,
    interactive: true,
    aria: {
      content: null,
      expanded: false,
    },
    content(reference) {
      const tooltipName = reference.getAttribute('data-tooltip-template');
      const template = reference.querySelector('[data-tooltip-content="' + tooltipName + '"]');
      return template ? template.innerHTML : '';
    },
    allowHTML: true,
    //appendTo: document.body,
  });
  /* ========================= Tippy JS ========================= */

  /* ------------ Tabs ------------ */
  const tabs = document.querySelectorAll('.js-tabs');

  tabs.forEach(function (item) {
    item.querySelectorAll('.js-tabs-trigger').forEach(function (item, i) {
      item.addEventListener('click', (e) => {
        e.preventDefault();

        const target = e.target.closest('.js-tabs-trigger');

        if (target.classList.contains('is-active')) return;

        let hash = target.getAttribute('href');

        if (hash && hash !== '#') {
          window.location.hash = hash;
        }

        const root = target.closest('.js-tabs');

        root.querySelector('.js-tabs-trigger.is-active').classList.remove('is-active');
        root.querySelector('.js-tabs-pane.is-active').classList.remove('is-active');

        root.querySelectorAll('.js-tabs-trigger')[i].classList.add('is-active');
        root.querySelectorAll('.js-tabs-pane')[i].classList.add('is-active');
      });
    });
  });

  const currentHash = window.location.hash;
  const hashTab = document.querySelector('.js-tabs-trigger[href="' + currentHash + '"]');

  if (hashTab) {
    // hashTab.click();
    const ev = new Event('click');
    hashTab.dispatchEvent(ev);
  }
  /* ------------ Tabs ------------ */

  /* ========================= JS Dropdown ========================= */
  document.addEventListener('click', (e) => {
    const dropdownToggle = e.target.closest('.js-dropdown-toggle');

    if (!dropdownToggle) return;

    const dropdownContainer = dropdownToggle.closest('.js-dropdown');

    if (!dropdownContainer.classList.contains('is-opened')) {
      document.querySelectorAll('.js-dropdown').forEach(item => item.classList.remove('is-opened'));
      document.body.classList.remove('is-dropdown-opened');
      // document.body.classList.remove('is-navbar-opened');

      if (window.outsideClickListener) {
        document.removeEventListener('click', outsideClickListener);
      }

      dropdownContainer.classList.add('is-opened');

      if (dropdownContainer.classList.contains('has-overlay')) {
        addOverlay();
      }

      if (dropdownContainer.classList.contains('is-lock')) {
        document.body.classList.add('is-dropdown-opened');
      }

      handleClickOutside(dropdownContainer, () => {
        const openedDropdownParents = document.querySelectorAll('.js-dropdown.is-opened');

        openedDropdownParents.forEach((dropdownToggle) => {
          dropdownToggle.classList.remove('is-opened');
        });

        removeOverlay();
        document.body.classList.remove('is-dropdown-opened');
      });
    } else {
      dropdownContainer.classList.remove('is-opened');
      removeOverlay();
      document.body.classList.remove('is-dropdown-opened');
      document.removeEventListener('click', outsideClickListener);
    }
  });
  /* ========================= JS Dropdown ========================= */

  /* ========================= Navbar ========================= */
  const toggleNavbar = document.querySelector('.navbar-trigger');

  /* Toggler Navbar */
  if (toggleNavbar) {
    toggleNavbar.addEventListener('click', function () {
      const body = document.body;

      if (!body.classList.contains('is-navbar-opened')) {
        body.classList.add('is-navbar-opened');
        body.style.paddingRight = scrollWidth() + 'px';
        toggleNavbar.classList.add('is-active');
      } else {
        body.classList.remove('is-navbar-opened');
        body.style.paddingRight = '';
        toggleNavbar.classList.remove('is-active');
      }
    });
    /* Toggler Navbar */

    /* Toggles Deep Levels Inside */
    // create toggles
    let navbarLinks = document.querySelectorAll('.navbar a');
    // let navbarLinks = document.querySelectorAll('.navbar .icon');

    navbarLinks.forEach(function (item) {
      if (item.closest('li').querySelector('ul')) {
        item.classList.add('has-dropdown');
      }
    });

    let dropdownToggles = document.querySelectorAll('.navbar .has-dropdown');

    dropdownToggles.forEach(function (item) {
      item.addEventListener('click', function (e) {
        item.closest('li').classList.toggle('is-opened');

        e.preventDefault();
      });
    });
    /* Toggles Deep Levels Inside */
  }
  /* ========================= Navbar ========================= */

  /* ------------ Carousels ------------ */
  /* section-carousels */
  const sectionCarousels = document.querySelectorAll('.js-section-carousel');

  if (sectionCarousels) {
    sectionCarousels.forEach((instance) => {
      const parentSection = instance.parentNode;
      const slidesLength = instance.querySelectorAll('.swiper-slide').length;

      const pagination = parentSection.querySelector('.js-section-carousel-pagination');

      const prev = parentSection.querySelector('.js-section-carousel-prev');
      const next = parentSection.querySelector('.js-section-carousel-next');

      const isLoop = slidesLength > 5;

      new Swiper(instance, {
        loop: isLoop,
        slidesPerView: 1,
        spaceBetween: 20,
        // autoHeight: true,

        pagination: {
          el: pagination,
          clickable: true
          // type: 'fraction',
        },

        navigation: {
          prevEl: prev,
          nextEl: next,
        },

        breakpoints: {
          320: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          480: {
            slidesPerView: 3,
            spaceBetween: 30
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 40
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 40
          }
        }
      });
    });
  }
  /* /section-carousels */

  /* responsive-carousels */
  const swiperResponsiveBreakpoint = window.matchMedia('(min-width: 768px)');
  let swiperResponsiveInstances = [];

  const swiperBreakpointChecker = () => {
    if (swiperResponsiveBreakpoint.matches === true) {
      swiperResponsiveInstances.forEach((instance) => {
        instance.destroy(true, true);
      });

      return;
    } else if (swiperResponsiveBreakpoint.matches === false) {
      return enableSwiperResponsive();
    }
  };

  function enableSwiperResponsive() {
    if (!document.querySelector('.js-carousel-responsive')) return;

    document
      .querySelectorAll('.js-carousel-responsive')
      .forEach((swiper, ix) => {
        const pagination = swiper.parentNode.querySelector(
          '.js-carousel-responsive-pagination'
        );
        const prev = swiper.querySelector(
          '.js-carousel-responsive-prev'
        );
        const next = swiper.querySelector(
          '.js-carousel-responsive-next'
        );

        swiperResponsiveInstances[ix] = new Swiper(swiper, {
          loop: true,
          slidesPerView: 1,
          spaceBetween: 25,
          watchSlidesVisibility: true,

          pagination: {
            el: pagination,
            clickable: true,
          },

          navigation: {
            prevEl: prev,
            nextEl: next,
          },

          breakpoints: {
            480: {
              slidesPerView: 2,
            },
          },
        });
      });
  }

  swiperResponsiveBreakpoint.addEventListener(
    'change',
    swiperBreakpointChecker,
  );

  swiperBreakpointChecker();
  /* /responsive-carousels */
  /* ------------ Carousels ------------ */

  /* ------------ Modal Wins ------------ */
  let modalInstance = null;

  document.addEventListener('click', (e) => {
    const target = e.target.closest('[data-modal-win-trigger]');

    if (!target) return;

    const winId = target.dataset.modalWinTrigger;

    if (modalInstance) {
      modalInstance.close();
    }

    modalInstance = new Modal({
      content: document.querySelector('[data-modal-win="' + winId + '"]'),
      className: `modal-win__main--${winId}`,
      // closeOutside: false,
      afterOpen: () => {
        document.body.style.paddingRight = scrollWidth() + 'px';
      },
      beforeClose: () => {
        document.body.style.paddingRight = '';
      }
    });

    modalInstance.open();

    e.preventDefault();
  });

  /* close btn */
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.js-modal-close');

    if (!trigger) return;

    const closeBtn = trigger.closest('.modal-win').querySelector('.modal-win__close');

    if (closeBtn) {
      closeBtn.click();
    }
  });
  /* /close btn */
  /* ------------ Modal Wins ------------ */

  /* ------------ LightGallery ------------ */
  document.querySelectorAll('.js-gallery').forEach((gallery) => {
    lightGallery(gallery, {
      selector: 'a',
      download: false
    });
  });
  /* ------------ LightGallery ------------ */

  /* ------------ Is Element Visible ------------ */
  const isElemVisible = elem => !!elem && !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);
  /* ------------ Is Element Visible ------------ */

  /* ------------ Handle Click Outside ------------ */
  function handleClickOutside(elem, callback) {
    // const outsideClickListener = ev => {
    window.outsideClickListener = ev => {
      // if (!ev.target.closest(elem)) {
      if (!elem.contains(event.target) && isElemVisible(elem)) {
        if (typeof callback === 'function') {
          callback();
        }

        removeClickListener();
      }
    }

    const removeClickListener = () => {
      document.removeEventListener('click', outsideClickListener);
    }

    document.addEventListener('click', outsideClickListener)
  }
  /* ------------ Handle Click Outside ------------ */

  /* ------------ is touch helper ------------ */
  if ('ontouchstart' in window || navigator.msMaxTouchPoints) {
    document.documentElement.classList.add('is-touch');
  }
  /* ------------ is touch helper ------------ */

  /* ------------ iOS vh bug ------------ */
  /*
  const appHeight = () => {
    const doc = document.documentElement;
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
  }

  window.addEventListener('resize', appHeight);
  appHeight();
  */

  // https://css-tricks.com/the-trick-to-viewport-units-on-mobile/
  const appHeight = () => {
    const doc = document.documentElement;
    const vh = window.innerHeight * 0.01;

    doc.style.setProperty('--vh', `${vh}px`);
  }

  window.addEventListener('resize', appHeight);
  appHeight();

  /*
    USAGE
    .my-element {
      height: 100vh; fallback
      height: calc(var(--vh, 1vh) * 100);
    }
  */
  /* ------------ iOS vh bug ------------ */

  /* -------- Accordions --------- */
  // init accordions
  if (document.querySelector('.js-accordion')) {
    const accordions = document.querySelectorAll('.js-accordion');

    accordions.forEach((accordion) => {
      if (!accordion.classList.contains('is-active')) {
        const body = accordion.querySelector('.js-accordion-body');
        body.hidden = true;
      }
    });
  }

  document.body.addEventListener('click', (e) => {
    const accordionTrigger = e.target.closest('.js-accordion-trigger');

    if (!accordionTrigger) return;

    const parent = accordionTrigger.closest('.js-accordion');
    const body = parent.querySelector('.js-accordion-body');

    if (parent.classList.contains('is-active')) {
      slideUp(body, 300, () => {
        parent.classList.remove('is-active');
      });
    } else {
      slideDown(body, 300, () => {
        parent.classList.add('is-active');
      });
    }
  });
  /* -------- Accordions --------- */
});

/* ------------ Lazy Load Video From YouTube ------------ */
function init() {
  const vidDefer = document.getElementsByTagName('iframe');

  for (let i = 0; i < vidDefer.length; i++) {
    if (vidDefer[i].getAttribute('data-src')) {
      vidDefer[i].setAttribute('src', vidDefer[i].getAttribute('data-src'));
    }
  }
}

window.onload = init;
/* ------------ Lazy Load Video From YouTube ------------ */

/* ------------ Helpers ------------ */
function scrollWidth() {
  let div = document.createElement('div');

  div.style.overflowY = 'scroll';
  div.style.width = '50px';
  div.style.height = '50px';
  div.style.visibility = 'hidden';

  document.body.appendChild(div);
  let scrollWidth = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div);
  
  return scrollWidth;
}

function addOverlay() {
  let overlay = document.createElement('div');
  overlay.className = 'overlay';
  document.body.appendChild(overlay);
}

function removeOverlay() {
  let overlay = document.querySelector('.overlay')

  if (overlay) overlay.remove();
}

function debounce(func, wait, immediate) {
  var timeout;

  return function() {
    var context = this, args = arguments;

    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};

function throttle(callback, limit) {
  var waiting = false;                 // Initially, we're not waiting

  return function() {                  // We return a throttled function
    if (!waiting) {                    // If we're not waiting
      callback.apply(this, arguments); // Execute users function
      waiting = true;                  // Prevent future invocations
      setTimeout(function () {         // After a period of time
        waiting = false;               // And allow future invocations
      }, limit);
    }
  }
}

function slideUp(target, duration = 500, callback) {
  if (!target.classList.contains('in-progress')) {
    target.classList.add('in-progress');
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = `${target.offsetHeight}px`;
    target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;

    window.setTimeout(() => {
      target.hidden = true;
      target.style.removeProperty('height');
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('in-progress');

      callback();
    }, duration);
  }
}

function slideDown(target, duration = 500, callback) {
  if (!target.classList.contains('in-progress')) {
    target.classList.add('in-progress');
    target.hidden = target.hidden ? false : null;
    let height = target.offsetHeight;
    target.style.overflow = 'hidden';
    target.style.height = 0;
    target.style.paddingTop = 0;
    target.style.paddingBottom = 0;
    target.style.marginTop = 0;
    target.style.marginBottom = 0;
    target.offsetHeight;
    target.style.transitionProperty = 'height, margin, padding';
    target.style.transitionDuration = duration + 'ms';
    target.style.height = height + 'px';
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');

    window.setTimeout(() => {
      target.style.removeProperty('height');
      target.style.removeProperty('overflow');
      target.style.removeProperty('transition-duration');
      target.style.removeProperty('transition-property');
      target.classList.remove('in-progress');

      callback();
    }, duration);
  }
}

function slideToggle(target, duration = 500) {
  if (target.hidden) {
    return slideDown(target, duration);
  } else {
    return slideUp(target, duration);
  }
}