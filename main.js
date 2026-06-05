/**
 * ExploitMinder // Core Logic Engine
 */
!(function($) {
  "use strict";

  // --- 1. Matrix Target Engine (Machine Writeups) ---
  function initMachineEngine() {
    const urlParams = new URLSearchParams(window.location.search);
    const targetMachine = urlParams.get('machine');

    if (targetMachine) {
      const blocks = document.querySelectorAll('.machine-profile-node');
      if (blocks.length > 0) {
        blocks.forEach(block => block.style.display = 'none');
        
        const activeBlock = document.getElementById('target-' + targetMachine);
        if (activeBlock) {
          activeBlock.style.display = 'block';
          document.title = `ExploitMinder // Log [${targetMachine.toUpperCase()}]`;
        } else {
          const fallback = document.getElementById('fallback-deck');
          if (fallback) fallback.style.display = 'block';
        }
      }
    }
  }

  // --- 2. Bootstrap Theme Pipeline (Navigation & UI) ---
  $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var hash = this.hash;
      var target = $(hash);
      
      // If the link is a standard section link (e.g., #about)
      if (target.length) {
        e.preventDefault();
        $('.nav-menu .active, .mobile-nav .active').removeClass('active');
        $(this).closest('li').addClass('active');

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
        return false;
      }
    }
  });

  // Initialize all subsystems on load
  $(document).ready(function() {
    initMachineEngine();

    // Re-trigger hash activation on page load
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        $('#header').addClass('header-top');
        setTimeout(function() {
          $("section").removeClass('section-show');
          $(initial_nav).addClass('section-show');
        }, 350);
      }
    }
  });

})(jQuery);

/**
 * Global Utilities (Exposed to Window)
 */
window.toggleTaskAnswer = function(btn, answerText) {
  const parent = btn.parentElement;
  let answerNode = parent.querySelector('.revealed-answer');
  if (!answerNode) {
    answerNode = document.createElement('div');
    answerNode.className = 'revealed-answer';
    answerNode.style.cssText = 'margin-top:10px; padding:10px; background:rgba(0,255,65,0.05); border:1px dashed rgba(0,255,65,0.3); border-radius:6px; font-family:monospace; color:#00ff41;';
    answerNode.innerText = `[>] ANSWER: ${answerText}`;
    parent.appendChild(answerNode);
    btn.innerText = "Hide Answer";
  } else {
    answerNode.remove();
    btn.innerText = "Show Answer";
  }
};

window.revealTargetFlag = function(btn, explicitFlag) {
  const wrapper = btn.previousElementSibling;
  if (wrapper) {
    wrapper.innerHTML = `<span style="color:#00ff41; font-weight:bold; letter-spacing:1px;">${explicitFlag}</span>`;
    btn.style.display = 'none';
  }
};


// --- Logic for writeups.html ---
$(document).ready(function() {
    const container = document.getElementById('writeup-container');
    if (!container) return; // Only run if we are on the writeups page

    const urlParams = new URLSearchParams(window.location.search);
    const view = urlParams.get('view');
    const machineId = urlParams.get('machine');

    // 1. Handle Machine Detail View
    if (machineId) {
        // Fetch machine data from your registry (the object we discussed earlier)
        const machine = getMachineContent(machineId); 
        if (machine) {
            container.innerHTML = `<h1>${machine.title}</h1>...`; // Render logic
        }
    } 
    // 2. Handle List View (Machines or Blogs)
    else if (view === 'machines') {
        container.innerHTML = `<h2>Listing all HTB Machines...</h2>`;
    }
});
