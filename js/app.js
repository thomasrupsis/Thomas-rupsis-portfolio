/**
 * Thomas Rupsis Portfolio - Application Scripts
 * Accessible multi-page tab management & contact form handling
 */

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Restore active tab from hash if present ('home', 'about', 'lessons', 'media', 'contact')
  const initialHash = window.location.hash.replace('#', '');
  if (['home', 'about', 'lessons', 'media', 'contact'].includes(initialHash)) {
    switchTab(initialHash, false);
  } else {
    switchTab('home', false);
  }
});

/**
 * Switch Active Tab Pane ('home', 'about', 'lessons', 'media', 'contact')
 */
function switchTab(tabName, scrollUp = true) {
  const tabs = ['home', 'about', 'lessons', 'media', 'contact'];
  if (!tabs.includes(tabName)) {
    tabName = 'home';
  }

  tabs.forEach(name => {
    const pane = document.getElementById(`tab-content-${name}`);
    const btn = document.getElementById(`tab-btn-${name}`);
    const mobileBtn = document.getElementById(`mobile-tab-btn-${name}`);

    // Update Tab Panes
    if (pane) {
      if (name === tabName) {
        pane.classList.remove('hidden');
        pane.classList.add('active');
      } else {
        pane.classList.add('hidden');
        pane.classList.remove('active');
      }
    }

    // Update Desktop Nav Buttons
    if (btn) {
      if (name === 'contact') {
        if (name === tabName) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      } else {
        if (name === tabName) {
          btn.classList.add('active', 'text-copper', 'bg-copper/10', 'font-semibold');
          btn.classList.remove('text-charcoal-muted', 'hover:bg-black/5');
        } else {
          btn.classList.remove('active', 'text-copper', 'bg-copper/10', 'font-semibold');
          btn.classList.add('text-charcoal-muted', 'hover:text-charcoal-heading', 'hover:bg-black/5');
        }
      }
    }

    // Update Mobile Nav Buttons
    if (mobileBtn) {
      if (name === 'contact') {
        if (name === tabName) {
          mobileBtn.className = "text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold text-white bg-copper shadow-sm";
        } else {
          mobileBtn.className = "text-left px-3.5 py-2.5 rounded-lg text-sm font-semibold text-copper border border-copper/40 bg-copper/5 hover:bg-copper hover:text-white";
        }
      } else {
        if (name === tabName) {
          mobileBtn.classList.add('text-copper', 'bg-copper/10', 'font-semibold');
          mobileBtn.classList.remove('text-charcoal-muted');
        } else {
          mobileBtn.classList.remove('text-copper', 'bg-copper/10', 'font-semibold');
          mobileBtn.classList.add('text-charcoal-muted');
        }
      }
    }
  });

  // Manage Bottom Contact Section Header
  const bottomContactHeader = document.getElementById('contactHeaderBlock');
  if (bottomContactHeader) {
    if (tabName === 'contact') {
      bottomContactHeader.classList.add('hidden');
    } else {
      bottomContactHeader.classList.remove('hidden');
    }
  }

  if (history.pushState) {
    history.pushState(null, null, `#${tabName}`);
  }

  if (scrollUp) {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

/**
 * Navigate to Contact page and focus name input
 */
function scrollToContact(inquiryType = null) {
  switchTab('contact');

  setTimeout(() => {
    const nameInput = document.getElementById('senderName');
    if (nameInput) {
      nameInput.focus();
    }
  }, 250);
}

/**
 * Mobile Navigation Menu Toggle
 */
function toggleMobileMenu(forceState = null) {
  const menu = document.getElementById('mobileMenu');
  if (!menu) return;

  const isClosed = menu.classList.contains('hidden');
  const shouldOpen = forceState !== null ? forceState : isClosed;

  if (shouldOpen) {
    menu.classList.remove('hidden');
  } else {
    menu.classList.add('hidden');
  }
}

/**
 * Handle Contact Form Submission
 */
function handleContactSubmit(event) {
  event.preventDefault();

  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const alertBox = document.getElementById('formSuccessAlert');

  if (!form || !submitBtn) return;

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  setTimeout(() => {
    if (alertBox) {
      alertBox.classList.remove('hidden');
    }

    submitBtn.disabled = false;
    submitBtn.textContent = 'Message Sent';

    form.reset();
  }, 400);
}
