"use strict";

window.onload = function() {

  // ==================== toc visibility ========================
  var toggleSidebarElem = document.getElementById("toggle-sidebar");
  var tocBodyElem = document.querySelector('.toc__body');
  var tocLabelElem = document.querySelector('.toc__label');
  var listMainElem = document.getElementById('list-main');
  var listSideElem = document.getElementById('list-side');
  var sliderIcons = document.querySelectorAll('.slider__icon');

  toggleSidebarElem ?
    toggleSidebarElem.addEventListener('change', function (e) {
      if (e.target.checked) {
        if (tocBodyElem) {
          fadeIn(tocBodyElem, 200);
        }
        if (tocLabelElem) {
          fadeIn(tocLabelElem, 200);
        }
        if (listMainElem && listSideElem) {
          listMainElem.className = 'm';
          listSideElem.className = 'r';
        }

        sliderIcons && sliderIcons.forEach(function (elem) {
          if (elem.classList.contains('hide')) {
            elem.classList.remove('hide');
          } else {
            elem.classList.add('hide');
          }
        });

      } else {
        if (tocBodyElem) {
          fadeOut(tocBodyElem, 200);
        }
        if (tocLabelElem) {
          fadeOut(tocLabelElem, 200);
        }
        if (listMainElem && listSideElem) {
          listMainElem.className = 'mr';
          listSideElem.className = 'hide';
        }

        sliderIcons && sliderIcons.forEach(function (elem) {
          if (elem.classList.contains('hide')) {
            elem.classList.remove('hide');
          } else {
            elem.classList.add('hide');
          }
        });
      }
    }) : null;
  // ============================================================

  // ===================== navbar collapse ======================
  var navCollapseBtn = document.getElementById('navCollapseBtn');
  navCollapseBtn ? navCollapseBtn.addEventListener('click', function(e) {
    var navCollapse = document.querySelector('.navbar__collapse');
    
    if (navCollapse) {
      var dataOpen = navCollapse.getAttribute('data-open');

      if (dataOpen === 'true') {
        navCollapse.setAttribute('data-open', 'false');
        navCollapse.style.maxHeight = 0;
      } else {
        navCollapse.setAttribute('data-open', 'true');
        navCollapse.style.maxHeight = navCollapse.scrollHeight + "px";
      }
    }
  }) : null;
  // ============================================================


  // ========================== expand ==========================
  var expandBtn = document.querySelectorAll('.expand__button');

  for (let i = 0; i < expandBtn.length; i++) {
    expandBtn[i].addEventListener("click", function () {
      var content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.maxHeight = null;
        this.querySelector('svg').classList.add('expand-icon__right');
        this.querySelector('svg').classList.remove('expand-icon__down');
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        this.querySelector('svg').classList.remove('expand-icon__right');
        this.querySelector('svg').classList.add('expand-icon__down');
      }
    });
  }
  // ============================================================


// =========================== scroll ===========================
  var lastScrollTop = window.pageYOffset || document.documentElement.scrollTop;
  var tocElem = document.querySelector('.toc');
  var tableOfContentsElem = tocElem ? tocElem.querySelector('#TableOfContents') : null;
  var singleContentsElem = document.querySelector('.single__contents');
  var dataBGImgs = document.querySelectorAll('div[data-bgimg]');

  
  var tocLevels = "h1, h2, h3";

  if (tocLevels) {
    tocLevels = tocLevels.toString();
  } else {
    tocLevels = "h1, h2, h3, h4, h5, h6";
  }

  var isLandingBgImg = false;
  var isHome = false;

  function setNavbarBG(scrollTop) {
    if (isHome && isLandingBgImg && Object.keys(isLandingBgImg).length) {
      if (isLandingBgImg.height <= scrollTop) {
        dataBGImgs.forEach(function(elem) {
          elem.setAttribute('data-bgimg', 'false');
        });
      } else {
        dataBGImgs.forEach(function (elem) {
          elem.setAttribute('data-bgimg', 'true');
        });
      }
    }
  }
  setNavbarBG(lastScrollTop);

  window.onscroll = function () {
    var st = window.pageYOffset || document.documentElement.scrollTop;
    if (st > lastScrollTop) { // scroll down
      singleContentsElem ? 
      singleContentsElem.querySelectorAll(tocLevels.toString()).forEach(function(elem) {
        if (document.documentElement.scrollTop >= elem.offsetTop) {
          if (tableOfContentsElem) {
            var id = elem.getAttribute('id');
            tocElem.querySelectorAll('a').forEach(function (elem) {
              elem.classList.remove('active');
            });
            tocElem.querySelector('a[href="#' + id + '"]') ? 
            tocElem.querySelector('a[href="#' + id + '"]').classList.add('active') : null;
          }
        }
      }) : null;
      setNavbarBG(st);
    } else { // scroll up
      singleContentsElem ? 
      singleContentsElem.querySelectorAll(tocLevels.toString()).forEach(function(elem) {
        if (document.documentElement.scrollTop >= elem.offsetTop) {
          if (tableOfContentsElem) {
            var id = elem.getAttribute('id');
            tocElem.querySelectorAll('a').forEach(function (elem) {
              elem.classList.remove('active');
            });
            tocElem.querySelector('a[href="#' + id + '"]') ? 
            tocElem.querySelector('a[href="#' + id + '"]').classList.add('active') : null;
          }
        }
      }) : null;
      setNavbarBG(st);
    }
    lastScrollTop = st <= 0 ? 0 : st;
  };
  // ============================================================



  


// ======================= theme change =======================
  var localTheme = localStorage.getItem('theme');
  var rootEleme = document.getElementById('root');
  var selectThemeElem = document.querySelectorAll('.select-theme');
  var selectThemeItemElem = document.querySelectorAll('.select-theme__item');
  
  if (localTheme) {
    selectThemeItemElem ? 
    selectThemeItemElem.forEach(function (elem) {
      if (elem.text.trim() === localTheme) {
        elem.classList.add('is-active');
      } else {
        elem.classList.remove('is-active');
      }
    }) : null;
  }

  selectThemeItemElem ? 
  selectThemeItemElem.forEach(function (v, i) {
    v.addEventListener('click', function (e) {
      var selectedThemeVariant = e.target.text.trim();
      localStorage.setItem('theme', selectedThemeVariant);

      rootEleme.removeAttribute('class');
      rootEleme.classList.add(`theme__${selectedThemeVariant}`);
      selectThemeElem.forEach(function(rootElem) {
        rootElem.querySelectorAll('a').forEach(function (elem) {
          if (elem.classList) {
            if (elem.text.trim() === selectedThemeVariant) {
              if (!elem.classList.contains('is-active')) {
                elem.classList.add('is-active');
              }
            } else {
              if (elem.classList.contains('is-active')) {
                elem.classList.remove('is-active');
              }
            }
          }
        });
      });

      if (window.mermaid) {
        if (selectedThemeVariant === "dark" || selectedThemeVariant === "hacker") {
          mermaid.initialize({ theme: 'dark' });
          location.reload();
        } else {
          mermaid.initialize({ theme: 'default' });
          location.reload();
        }
      }

      var utterances = document.querySelector('iframe');
      if (utterances) {
        utterances.contentWindow.postMessage({
          type: 'set-theme',
          theme: selectedThemeVariant === "dark" || selectedThemeVariant === "hacker" ? 'photon-dark' : selectedThemeVariant === 'kimbie' ? 'github-dark-orange' : 'github-light',
        }, 'https://utteranc.es');
      }
    });
  }) : null;
// ============================================================



}