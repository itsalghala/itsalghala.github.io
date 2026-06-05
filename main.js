/**
 * 0xRoot Matrix Hub // Core Architecture Control Engine
 */
/**
 * 0xRoot Matrix Hub // Core Target Router Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Check if we are on a multi-view layout page
  const urlParams = new URLSearchParams(window.location.search);
  const targetMachine = urlParams.get('machine');

  if (targetMachine) {
    // Force activate the single chosen machine node, hide all others
    const blocks = document.querySelectorAll('.machine-profile-node');
    if (blocks.length > 0) {
      blocks.forEach(block => block.style.display = 'none');
      
      const activeBlock = document.getElementById('target-' + targetMachine);
      if (activeBlock) {
        activeBlock.style.display = 'block';
        // Dynamically shift title based on selected asset context
        document.title = `0xRoot // Log [${targetMachine.toUpperCase()}]`;
      } else {
        // Fallback fallback if machine parameter is unmapped
        document.getElementById('fallback-deck').style.display = 'block';
      }
    }
  }
});

// Interactive task answer reveal logic 
function toggleTaskAnswer(btn, answerText) {
  const parent = btn.parentElement;
  let answerNode = parent.querySelector('.revealed-answer');
  
  if (!answerNode) {
    answerNode = document.createElement('div');
    answerNode.className = 'revealed-answer';
    answerNode.style.marginTop = '10px';
    answerNode.style.padding = '10px';
    answerNode.style.background = 'rgba(34, 211, 238, 0.05)';
    answerNode.style.border = '1px dashed rgba(34, 211, 238, 0.3)';
    answerNode.style.borderRadius = '6px';
    answerNode.style.fontFamily = 'var(--font-mono)';
    answerNode.style.fontSize = '0.85rem';
    answerNode.style.color = 'var(--neon-cyan)';
    answerNode.innerText = `[>] ANSWER: ${answerText}`;
    parent.appendChild(answerNode);
    btn.innerText = "Hide Answer";
  } else {
    answerNode.remove();
    btn.innerText = "Show Answer";
  }
}

// Global flag un-blur utility script
function revealTargetFlag(btn, explicitFlag) {
  const wrapper = btn.previousElementSibling;
  if (wrapper) {
    wrapper.innerHTML = `<span style="color: var(--neon-green); font-weight: bold; letter-spacing: 1px;">${explicitFlag}</span>`;
    btn.style.display = 'none';
  }
}
// Global Route Navigation Handler
function switchRoute(targetViewId) {
  // 1. Locate all view sections on the page
  const views = document.querySelectorAll('.app-view');
  if (views.length > 0) {
    views.forEach(view => {
      view.classList.remove('active-view');
    });
    
    const targetedView = document.getElementById('view-' + targetViewId);
    if (targetedView) {
      targetedView.classList.add('active-view');
    }
  }

  // 2. Synchronize active state styling across nav targets
  document.querySelectorAll('.nav-target').forEach(link => {
    link.classList.remove('active');
  });

  const targetedNavElement = Array.from(document.querySelectorAll('.nav-target')).find(
    el => el.getAttribute('href') === '#' + targetViewId || el.getAttribute('href') === targetViewId
  );
  if (targetedNavElement) {
    targetedNavElement.classList.add('active');
  }

  // 3. Prevent sudden shifts on route load
  window.scrollTo({ top: 0, behavior: 'instant' });
}

// Multi-Cloud Structure Tab Controller
function openCloudTab(evt, tabId) {
  const container = evt.currentTarget.closest('.tab-container');
  if (!container) return;

  // Deactivate all matching content and buttons inside this tab grid
  container.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
  container.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

  // Initialize selected target view node
  const activeTab = document.getElementById(tabId);
  if (activeTab) {
    activeTab.classList.add('active');
  }
  evt.currentTarget.classList.add('active');
}

// Auto-detect anchor route targets on landing sequence execution
window.addEventListener('DOMContentLoaded', () => {
  const activeHash = window.location.hash.replace('#', '');
  if (['home', 'writeups', 'about'].includes(activeHash)) {
    switchRoute(activeHash);
  }
});

// Expose handlers globally to catch legacy inline elements
window.switchRoute = switchRoute;
window.openCloudTab = openCloudTab;/**
* Template Name: Personal - v2.1.0
* Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
!(function($) {
  "use strict";

  // Nav Menu
  $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var hash = this.hash;
      var target = $(hash);
      if (target.length) {
        e.preventDefault();

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if (hash == '#header') {
          $('#header').removeClass('header-top');
          $("section").removeClass('section-show');
          return;
        }

        if (!$('#header').hasClass('header-top')) {
          $('#header').addClass('header-top');
          setTimeout(function() {
            $("section").removeClass('section-show');
            $(hash).addClass('section-show');
          }, 350);
        } else {
          $("section").removeClass('section-show');
          $(hash).addClass('section-show');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }

        return false;

      }
    }
  });

  // Activate/show sections on load with hash links
  if (window.location.hash) {
    var initial_nav = window.location.hash;
    if ($(initial_nav).length) {
      $('#header').addClass('header-top');
      $('.nav-menu .active, .mobile-nav .active').removeClass('active');
      $('.nav-menu, .mobile-nav').find('a[href="' + initial_nav + '"]').parent('li').addClass('active');
      setTimeout(function() {
        $("section").removeClass('section-show');
        $(initial_nav).addClass('section-show');
      }, 350);
    }
  }

  // Mobile Navigation
  if ($('.nav-menu').length) {
    var $mobile_nav = $('.nav-menu').clone().prop({
      class: 'mobile-nav d-lg-none'
    });
    $('body').append($mobile_nav);
    $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
    $('body').append('<div class="mobile-nav-overly"></div>');

    $(document).on('click', '.mobile-nav-toggle', function(e) {
      $('body').toggleClass('mobile-nav-active');
      $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      $('.mobile-nav-overly').toggle();
    });

    $(document).click(function(e) {
      var container = $(".mobile-nav, .mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
          $('.mobile-nav-overly').fadeOut();
        }
      }
    });
  } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
    $(".mobile-nav, .mobile-nav-toggle").hide();
  }

  // jQuery counterUp
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 1000
  });

  // Skills section
  $('.skills-content').waypoint(function() {
    $('.progress .progress-bar').each(function() {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Testimonials carousel (uses the Owl Carousel library)
  $(".testimonials-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    responsive: {
      0: {
        items: 1
      },
      768: {
        items: 2
      },
      900: {
        items: 3
      }
    }
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
    });

  });

  // Initiate venobox (lightbox feature used in portofilo)
  $(document).ready(function() {
    $('.venobox').venobox();
  });

})(jQuery);
