document.addEventListener('DOMContentLoaded', () => {
  console.info('DOM ready — script loaded');

  const colorBtn = document.getElementById('colorBtn');
  const quoteBtn = document.getElementById('quoteBtn');
  const quoteEl  = document.getElementById('quote');

  const quotes = [
    "Every heartbeat matters, every patient is family.",
    "Healing begins the moment you walk through our doors.",
    "Your health is our promise, your trust our pride.",
    "Where advanced medicine meets compassionate care.",
    "Together, we build a healthier tomorrow."
  ];

  if (colorBtn) {
    colorBtn.addEventListener('click', () => {
      bgIndex = (bgIndex + 1) % bgColors.length;
      document.body.style.background = bgColors[bgIndex];
      console.log('Background changed to', bgColors[bgIndex]);
    });
  }

  if (quoteBtn && quoteEl) {
    quoteBtn.addEventListener('click', () => {
      const q = quotes[Math.floor(Math.random() * quotes.length)];
      quoteEl.textContent = `"${q}"`;
      quoteEl.classList.remove('visually-hidden');
      quoteEl.classList.add('visually-visible');
      setTimeout(() => {
        quoteEl.classList.remove('visually-visible');
        quoteEl.classList.add('visually-hidden');
      }, 6000);
    });
  }

  const form = document.getElementById('contactForm');
  if (form) {
    console.info('Contact form found — binding listeners');

    const nameInput = form.querySelector('#name');
    const emailInput = form.querySelector('#email');
    const messageInput = form.querySelector('#message');
    const charCount = document.getElementById('charCount');
    const errorDiv = document.getElementById('formError');
    const thankYou = document.getElementById('thankYou');
    const resetBtn = document.getElementById('resetBtn');

    if (messageInput && charCount) {
      charCount.textContent = `${messageInput.value.length} / ${messageInput.maxLength || 300}`;
      messageInput.addEventListener('input', () => {
        charCount.textContent = `${messageInput.value.length} / ${messageInput.maxLength || 300}`;
      });
    }

    if (emailInput) {
      emailInput.addEventListener('input', () => {
        if (emailInput.value.length === 0) {
          emailInput.style.borderColor = '';
        } else if (!validateEmail(emailInput.value)) {
          emailInput.style.borderColor = '#dc2626';
        } else {
          emailInput.style.borderColor = '#10b981';
        }
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        form.reset();
        errorDiv.textContent = '';
        if (charCount) charCount.textContent = `0 / ${messageInput.maxLength || 300}`;
        emailInput.style.borderColor = '';
        thankYou.classList.remove('visually-visible');
        thankYou.classList.add('visually-hidden');
      });
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      const nameVal = nameInput.value.trim();
      const emailVal = emailInput.value.trim();
      const msgVal = messageInput.value.trim();

      if (!nameVal || !emailVal || !msgVal) {
        showError('Please fill in all fields.');
        return;
      }

      if (!validateEmail(emailVal)) {
        showError('Please enter a valid email address.');
        return;
      }

      errorDiv.textContent = '';
      console.log('Form valid — sending (simulated)');

      setFormEnabled(false);

      setTimeout(() => {
        thankYou.textContent = `✅ Thanks, ${nameVal.split(' ')[0] || 'there'} — we received your message.`;
        thankYou.classList.remove('visually-hidden');
        thankYou.classList.add('visually-visible');

        setFormEnabled(true);
        form.reset();
        if (charCount) charCount.textContent = `0 / ${messageInput.maxLength || 300}`;
        emailInput.style.borderColor = '';

        setTimeout(() => {
          thankYou.classList.remove('visually-visible');
          thankYou.classList.add('visually-hidden');
        }, 6000);

      }, 800);
    });

    function setFormEnabled(enabled) {
      Array.from(form.elements).forEach(el => el.disabled = !enabled);
    }

    function showError(msg) {
      errorDiv.textContent = msg;
      setTimeout(() => { errorDiv.textContent = ''; }, 5000);
    }
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

});
