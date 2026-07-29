/* --------------------------------------------------------------------------
   SATHIALA OVERSEAS & IMMIGRATION PVT. LTD. - INTERACTIVE ANIMATIONS & LOGIC
   Location: Majitha Road, Opp. Dominos, Amritsar, Punjab – 143001
   Founder: Mr. Amritpal Singh | Phone: +91 9780795050 | Est. 2021
   -------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Scroll Reveal Animations (IntersectionObserver)
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right, .reveal-scale');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // 2. Animated Number Counters
  const counterElements = document.querySelectorAll('.counter-number');
  let countersAnimated = false;

  const animateCounters = () => {
    counterElements.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const prefix = counter.getAttribute('data-prefix') || '';
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 2000;
      const stepTime = 30;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        
        let displayVal = current.toLocaleString('en-US', {
          maximumFractionDigits: target % 1 !== 0 ? 1 : 0
        });

        counter.textContent = `${prefix}${displayVal}${suffix}`;
      }, stepTime);
    });
  };

  const countersContainer = document.querySelector('.hero-counters-bar');
  if (countersContainer) {
    const counterObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !countersAnimated) {
        countersAnimated = true;
        animateCounters();
      }
    }, { threshold: 0.5 });
    counterObserver.observe(countersContainer);
  }

  // 3. Filterable Destination Tabs
  const filterBtns = document.querySelectorAll('.filter-btn');
  const countryCards = document.querySelectorAll('.country-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      countryCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 4. PTE Score Converter Slider
  const pteRange = document.getElementById('pteRange');
  const pteVal = document.getElementById('pteVal');
  const ieltsVal = document.getElementById('ieltsVal');
  const pteText = document.getElementById('pteText');

  if (pteRange) {
    pteRange.addEventListener('input', (e) => {
      const score = parseInt(e.target.value);
      pteVal.textContent = score;

      let ielts = "5.0 Band";
      let advice = "Suitable for diplomas in Cyprus, Singapore & Russia.";

      if (score >= 79) {
        ielts = "8.0+ Band";
        advice = "🎯 Perfect Score! Full eligibility for top Universities & Express Entry PR in Canada & USA!";
      } else if (score >= 65) {
        ielts = "7.0 Band";
        advice = "🌟 Excellent! Eligible for Canada Direct SDS Student Visa, USA Universities & Europe Work Permits!";
      } else if (score >= 58) {
        ielts = "6.5 Band";
        advice = "✅ Great Score! High acceptance for Canada Diplomas, Greece Work Permits & Europe Study Visas.";
      } else if (score >= 50) {
        ielts = "6.0 Band";
        advice = "👍 Good Score! Eligible for Singapore Diplomas, Cyprus, Dubai Employment & Select Canada Colleges.";
      }

      ieltsVal.textContent = ielts;
      pteText.textContent = advice;
    });
  }

  // 5. Visa Calculator Logic
  const calcForm = document.getElementById('calcForm');
  const resultOutputCard = document.getElementById('resultOutputCard');
  const rWaBtn = document.getElementById('rWaBtn');

  if (calcForm && resultOutputCard) {
    calcForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const country = document.getElementById('cCountry').value;
      const visa = document.getElementById('cVisa').value;
      const qual = document.getElementById('cQual').value;
      const score = document.getElementById('cScore').value;

      resultOutputCard.classList.add('active');

      const waMessage = `Hello Sathiala Overseas! I checked my visa eligibility on your website:%0A%0A*Target Country:* ${encodeURIComponent(country)}%0A*Visa Category:* ${encodeURIComponent(visa)}%0A*Qualification:* ${encodeURIComponent(qual)}%0A*Score:* ${encodeURIComponent(score)}%0A%0APlease evaluate my profile for visa processing.`;

      if (rWaBtn) {
        rWaBtn.href = `https://wa.me/919780795050?text=${waMessage}`;
      }

      resultOutputCard.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // 6. Contact Form WhatsApp Dispatch
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contactName').value;
      const phone = document.getElementById('contactPhone').value;
      const country = document.getElementById('contactCountry').value;
      const notes = document.getElementById('contactNotes').value;

      const waText = `*Inquiry from Sathiala Overseas Website*%0A%0A*Name:* ${encodeURIComponent(name)}%0A*Phone:* ${encodeURIComponent(phone)}%0A*Target Country:* ${encodeURIComponent(country)}%0A*Notes:* ${encodeURIComponent(notes || 'Requesting free visa advice')}`;
      window.open(`https://wa.me/919780795050?text=${waText}`, '_blank');
    });
  }

  // 7. Mobile Drawer Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const drawerClose = document.getElementById('drawerClose');
  const drawerNavLinks = document.querySelectorAll('.drawer-nav-link');

  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileDrawer.classList.add('active');
    });
  }

  if (drawerClose && mobileDrawer) {
    drawerClose.addEventListener('click', () => {
      mobileDrawer.classList.remove('active');
    });
  }

  drawerNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer) mobileDrawer.classList.remove('active');
    });
  });

});
