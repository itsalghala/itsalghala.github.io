/**
 * Template Name: Personal - v2.1.0 (Restored & Enhanced)
 * Template URL: https://bootstrapmade.com/personal-free-resume-bootstrap-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */

/* =========================================================================
   1. Matrix Target Engine (Handles standalone CTF writeup nodes via ?machine=)
   ========================================================================= */
document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const targetMachine = urlParams.get('machine');

  // Only execute separation logic if the machine query parameter exists
  if (targetMachine) {
    const blocks = document.querySelectorAll('.machine-profile-node');
    if (blocks.length > 0) {
      // Hide all default nodes
      blocks.forEach(block => block.style.display = 'none');
      
      // Isolate and wake up the requested node
      const activeBlock = document.getElementById('target-' + targetMachine);
      if (activeBlock) {
        activeBlock.style.display = 'block';
        document.title = `0xRoot // Log [${targetMachine.toUpperCase()}]`;
      } else {
        const fallback = document.getElementById('fallback-deck');
        if (fallback) fallback.style.display = 'block';
      }
    }
  }
});

/**
 * Interactive writeup answer reveal utility
 */
function toggleTaskAnswer(btn, answerText) {
  const parent = btn.parentElement;
  let answerNode = parent.querySelector('.revealed-answer');
  
  if (!answerNode) {
    answerNode = document.createElement('div');
    answerNode.className = 'revealed-answer';
    answerNode.style.marginTop = '10px';
    answerNode.style.padding = '10px';
    answerNode.style.background = 'rgba(0, 255, 65, 0.05)';
    answerNode.style.border = '1px dashed rgba(0, 255, 65, 0.3)';
    answerNode.style.borderRadius = '6px';
    answerNode.style.fontFamily = 'monospace';
    answerNode.style.color = '#00ff41';
    answerNode.innerText = `[>] ANSWER: ${answerText}`;
    parent.appendChild(answerNode);
    btn.innerText = "Hide Answer";
  } else {
    answerNode.remove();
    btn.innerText = "Show Answer";
  }
}

/**
 * Global flag un-blur utility
 */
function revealTargetFlag(btn, explicitFlag) {
  const wrapper = btn.previousElementSibling;
  if (wrapper) {
    wrapper.innerHTML = `<span style="color: #00ff41; font-weight: bold; letter-spacing: 1px;">${explicitFlag}</span>`;
    btn.style.display = 'none';
  }
}

// Expose utilities to window context to catch dynamic inline triggers
window.toggleTaskAnswer = toggleTaskAnswer;
window.revealTargetFlag = revealTargetFlag;


/* =========================================================================
   2. Original Bootstrap Personal Theme Pipeline (Untouched Architecture)
   ========================================================================= */
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
  if ($.fn.counterUp) {
    $('[data-toggle="counter-up"]').counterUp({
      delay: 10,
      time: 1000
    });
  }

  // Skills section
  if ($('.skills-content').length && typeof $.fn.waypoint !== 'undefined') {
    $('.skills-content').waypoint(function() {
      $('.progress .progress-bar').each(function() {
        $(this).css("width", $(this).attr("aria-valuenow") + '%');
      });
    }, {
      offset: '80%'
    });
  }

  // Testimonials carousel (uses the Owl Carousel library)
  if ($.fn.owlCarousel) {
    $(".testimonials-carousel").owlCarousel({
      autoplay: true,
      dots: true,
      loop: true,
      responsive: {
        0: { items: 1 },
        768: { items: 2 },
        900: { items: 3 }
      }
    });
  }

  // Porfolio isotope and filter
  if ($.fn.isotope) {
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
  }

  // Initiate venobox (lightbox feature used in portofilo)
  $(document).ready(function() {
    if ($.fn.venobox) {
      $('.venobox').venobox();
    }
  });

})(jQuery);
