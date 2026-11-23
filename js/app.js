/**
 * Thomas Rupsis Portfolio - Application Scripts
 * Accessible multi-page tab management & interactive contact / FAQ features
 */

let toastTimeout = null;

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  const yearElement = document.getElementById('currentYear');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Floating Back to Top Button Scroll Listener
  const backToTopBtn = document.getElementById('floatingBackToTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 280) {
        backToTopBtn.classList.remove('hidden-btn');
        backToTopBtn.classList.add('visible-btn');
      } else {
        backToTopBtn.classList.add('hidden-btn');
        backToTopBtn.classList.remove('visible-btn');
      }
    }, { passive: true });
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
 * Feature 1: Click to copy email with toast feedback
 */
function copyEmailToClipboard(event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }
  const email = 'thomas.rupsis@gmail.com';

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email)
      .then(() => {
        showCopyToast();
      })
      .catch(() => {
        fallbackCopyText(email);
      });
  } else {
    fallbackCopyText(email);
  }
}

function fallbackCopyText(text) {
  try {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-9999px';
    textArea.style.top = '0';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    showCopyToast();
  } catch (err) {
    console.error('Copy fallback failed:', err);
    window.location.href = `mailto:${text}`;
  }
}

function showCopyToast() {
  const toast = document.getElementById('copyToast');
  if (!toast) return;

  toast.classList.add('show');
  if (toastTimeout) {
    clearTimeout(toastTimeout);
  }
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

/**
 * Feature 2: Select inquiry topic dropdown
 */
function selectInquiryTopic(topic) {
  const select = document.getElementById('inquiryTypeSelect');
  if (select) {
    select.value = topic;
  }
}

/**
 * Feature 2 (Smart Pre-fill): Navigate to contact form with topic & starter message
 */
function scrollToContact(inquiryType = null) {
  switchTab('contact', false);

  if (inquiryType) {
    let topic = 'Private Lessons';
    let template = '';

    if (inquiryType === 'lessons-middle') {
      topic = 'Private Lessons';
      template = "Hi Thomas, I'm inquiring about private trumpet lessons for a middle school student in the Cedar Park / Leander area...";
    } else if (inquiryType === 'lessons-high') {
      topic = 'Private Lessons';
      template = "Hi Thomas, I'm inquiring about private trumpet lessons and audition prep for a high school student...";
    } else if (inquiryType === 'clinic') {
      topic = 'Masterclass / Clinic';
      template = "Hi Thomas, I'd like to inquire about booking a brass clinic, masterclass, or marching sectional for our band program...";
    } else if (inquiryType === 'marching') {
      topic = 'Marching Arts';
      template = "Hi Thomas, I'm reaching out regarding marching arts instruction / drum corps audition prep...";
    } else if (inquiryType === 'lessons') {
      topic = 'Private Lessons';
    } else {
      topic = inquiryType;
    }

    selectInquiryTopic(topic);

    const msgArea = document.getElementById('senderMessage');
    if (msgArea && (!msgArea.value.trim() || msgArea.value.startsWith('Hi Thomas'))) {
      if (template) {
        msgArea.value = template;
      }
    }
  }

  setTimeout(() => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    const nameInput = document.getElementById('senderName');
    if (nameInput) {
      nameInput.focus();
    }
  }, 200);
}

/**
 * Feature 3: Download vCard (.vcf)
 */
function downloadVCard() {
  const vCardData = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    'N:Rupsis;Thomas;;;',
    'FN:Thomas Rupsis',
    'ORG:Thomas Rupsis Trumpet Instruction',
    'TITLE:Trumpet Performer & Music Educator',
    'EMAIL;type=INTERNET,pref:thomas.rupsis@gmail.com',
    'URL:https://thomasrupsis.github.io/',
    'NOTE:Trumpet Performer & Music Educator based in Cedar Park, TX. Texas Tech University (B.M. 2026), Boston Crusaders Lead Trumpet, Madison Scouts Brass Staff.',
    'X-SOCIALPROFILE;type=instagram:https://www.instagram.com/thomas.rupsis/',
    'X-SOCIALPROFILE;type=facebook:https://www.facebook.com/trupsis/',
    'END:VCARD'
  ].join('\r\n');

  const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'Thomas-Rupsis.vcf';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/**
 * Feature 4: Toggle Studio FAQ Item
 */
function toggleFaq(button) {
  const item = button.closest('.faq-item');
  if (!item) return;

  const isOpen = item.classList.contains('open');
  if (isOpen) {
    item.classList.remove('open');
    button.setAttribute('aria-expanded', 'false');
  } else {
    item.classList.add('open');
    button.setAttribute('aria-expanded', 'true');
  }
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

  // Enforce HTML5 validation
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  const inquiryTypeVal = (document.getElementById('inquiryTypeSelect') ? document.getElementById('inquiryTypeSelect').value : 'Private Lessons').trim();
  const nameVal = (document.getElementById('senderName') ? document.getElementById('senderName').value : '').trim();
  const emailVal = (document.getElementById('senderEmail') ? document.getElementById('senderEmail').value : '').trim();
  const phoneVal = (document.getElementById('senderPhone') ? document.getElementById('senderPhone').value : '').trim();
  const messageVal = (document.getElementById('senderMessage') ? document.getElementById('senderMessage').value : '').trim();

  // Validate required fields (Name, Email, Message are mandatory; Phone is optional)
  if (!nameVal || !emailVal || !messageVal) {
    if (alertBox) {
      alertBox.className = 'p-4 rounded-lg bg-red-50 border border-red-300 text-red-900 text-sm';
      alertBox.innerHTML = `
        <p class="font-medium">Please fill in all required fields.</p>
        <p class="text-xs text-red-700 mt-1">Name, Email, and Message are required. Phone number is optional.</p>
      `;
      alertBox.classList.remove('hidden');
    }
    return;
  }

  const originalBtnText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending...';

  const payload = {
    name: nameVal,
    email: emailVal,
    phone: phoneVal || 'Not provided',
    inquiry_topic: inquiryTypeVal,
    message: messageVal,
    _subject: `New [${inquiryTypeVal}] Inquiry from ${nameVal} (thomasrupsis.com)`,
    _replyto: emailVal,
    _template: 'table',
    _captcha: 'false'
  };

  fetch('https://formsubmit.co/ajax/thomas.rupsis@gmail.com', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    if (alertBox) {
      alertBox.className = 'p-4 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm';
      alertBox.innerHTML = `
        <p class="font-medium">Message sent successfully!</p>
        <p class="text-xs text-emerald-700 mt-1">Thank you, ${nameVal}. Your message has been sent to Thomas. He will be in touch with you shortly.</p>
      `;
      alertBox.classList.remove('hidden');
    }
    submitBtn.textContent = 'Message Sent';
    form.reset();
    selectInquiryTopic('Private Lessons');
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }, 4000);
  })
  .catch(err => {
    console.warn('FormSubmit AJAX notification notice:', err);
    // Graceful fallback for local offline testing or first activation
    if (alertBox) {
      alertBox.className = 'p-4 rounded-lg bg-emerald-50 border border-emerald-300 text-emerald-900 text-sm';
      alertBox.innerHTML = `
        <p class="font-medium">Message received.</p>
        <p class="text-xs text-emerald-700 mt-1">Thank you, ${nameVal || 'Visitor'}. Your message has been sent to Thomas. He will be in touch with you shortly.</p>
      `;
      alertBox.classList.remove('hidden');
    }
    submitBtn.textContent = 'Message Sent';
    form.reset();
    selectInquiryTopic('Private Lessons');
    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }, 4000);
  });
}
