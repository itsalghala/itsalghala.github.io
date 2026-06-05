/**
 * ExploitMinder // Core Logic Engine
 */
!(function($) {
  "use strict";

  // --- 1. Machine Loading Engine (Handles writeups.html) ---
  function initMachineEngine() {
    const urlParams = new URLSearchParams(window.location.search);
    const machineId = urlParams.get('machine');

    if (!machineId) return;

    // Hide all blocks, then show the requested one
    const blocks = document.querySelectorAll('.machine-profile-node');
    const activeBlock = document.getElementById('target-' + machineId);
    const fallback = document.getElementById('fallback-deck');

    blocks.forEach(block => block.style.display = 'none');

    if (activeBlock) {
      activeBlock.style.display = 'block';
      document.title = `ExploitMinder // Log [${machineId.toUpperCase()}]`;
    } else if (fallback) {
      fallback.style.display = 'block';
    }
  }

  !(function($) {
  "use strict";

  $(document).ready(function() {
    // A. Handle dynamic machine loading (for writeups.html)
    const params = new URLSearchParams(window.location.search);
    const machine = params.get('machine');
    
    if (machine) {
      $('.machine-profile-node').hide();
      const target = $('#target-' + machine);
      if (target.length) {
        target.show();
      } else {
        $('#fallback-deck').show();
      }
    }

    // B. Handle Homepage section switching
    $('.nav-menu a').on('click', function(e) {
      const hash = this.hash;
      if (hash && $(hash).length) {
        e.preventDefault();
        $('section').removeClass('section-show');
        $(hash).addClass('section-show');
        $('#header').addClass('header-top');
      }
    });
  });

  // C. Interactive UI Helpers
  window.toggleTaskAnswer = function(btn, answer) {
    btn.innerText = answer;
    btn.style.background = "var(--neon-green)";
    btn.style.color = "#000";
  };

  window.revealTargetFlag = function(btn, flag) {
    const mask = btn.previousElementSibling.querySelector('.flag-blurred-mask');
    if (mask) {
      mask.innerText = flag;
      mask.style.filter = "none";
      mask.style.opacity = "1";
      btn.style.display = "none";
    }
  };
})(jQuery);

  // --- 2. Navigation & UI Pipeline (Handles index.html) ---
  $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
    // Only intercept if we are on the same page
    if (this.hostname === window.location.hostname && this.pathname === window.location.pathname) {
      const hash = this.hash;
      const target = $(hash);

      if (target.length) {
        e.preventDefault();
        
        // UI Updates
        $('.nav-menu .active').removeClass('active');
        $(this).closest('li').addClass('active');

        // Logic for Home
        if (hash === '#header') {
          $('#header').removeClass('header-top');
          $("section").removeClass('section-show');
          return false;
        }

        // Logic for other sections
        $('#header').addClass('header-top');
        $("section").removeClass('section-show');
        $(hash).addClass('section-show');
        
        return false;
      }
    }
  });

  // --- 3. Global Utilities (Exposed to Window) ---
  window.openPocTab = function(tabId) {
    $('.poc-content').removeClass('active');
    $('.poc-btn').removeClass('active');
    $('#' + tabId).addClass('active');
    $('#btn-' + tabId).addClass('active');
  };

  window.toggleTaskAnswer = function(btn, answerText) {
    const parent = btn.parentElement;
    let answerNode = parent.querySelector('.revealed-answer');
    if (!answerNode) {
      answerNode = document.createElement('div');
      answerNode.className = 'revealed-answer';
      answerNode.style.cssText = 'margin-top:10px; padding:10px; background:rgba(0,255,65,0.05); border:1px dashed rgba(0,255,65,0.3); border-radius:6px; font-family:monospace; color:#00ff41; font-size: 0.85rem;';
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
      wrapper.innerHTML = `<span style="color:#00ff41; font-weight:bold; letter-spacing:1px; font-family:monospace;">${explicitFlag}</span>`;
      btn.style.display = 'none';
    }
  };
!(function($) {
  "use strict";

  $(document).ready(function() {
    // 1. Get the parameter from the URL (e.g., ?machine=reactor)
    const params = new URLSearchParams(window.location.search);
    const machineId = params.get('machine');

    if (machineId) {
      const targetDiv = document.getElementById('target-' + machineId);
      
      // Hide everything first
      $('.machine-profile-node').hide();

      if (targetDiv) {
        // Show only the requested one
        targetDiv.style.display = 'block';
      } else {
        // Show fallback if machine doesn't exist
        $('#fallback-deck').show();
      }
    }
  });

  // Global helper functions
  window.toggleTaskAnswer = function(btn, answer) {
      btn.innerText = answer;
      btn.style.background = "var(--neon-green)";
  };

  window.revealTargetFlag = function(btn, flag) {
      const mask = btn.previousElementSibling.querySelector('.flag-blurred-mask');
      if (mask) {
          mask.innerText = flag;
          mask.style.filter = "none";
          btn.style.display = "none";
      }
  };

  // This is the ONLY routing logic you need in main.js
document.addEventListener("DOMContentLoaded", function() {
    const params = new URLSearchParams(window.location.search);
    const machine = params.get('machine');
    
    // Hide all profile nodes initially
    document.querySelectorAll('.machine-profile-node').forEach(node => {
        node.style.display = 'none';
    });

    const targetDiv = document.getElementById('target-' + machine);
    const fallback = document.getElementById('fallback-deck');
    
    if (machine && targetDiv) {
        targetDiv.style.display = 'block';
    } else {
        if(fallback) fallback.style.display = 'block';
    }
});

})(jQuery);
  // --- Initialization ---
  $(document).ready(function() {
    initMachineEngine();

    // Trigger hash on load
    if (window.location.hash && $(window.location.hash).length) {
      $('#header').addClass('header-top');
      $(window.location.hash).addClass('section-show');
    }
  });

})(jQuery);
