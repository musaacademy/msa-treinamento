// =====================================================
// CONTADOR REGRESSIVO DA OFERTA
// =====================================================
(function(){
  const minEl = document.getElementById('min');
  const secEl = document.getElementById('sec');
  if(!minEl || !secEl) return;
  const totalSeconds = 15 * 60;
  let remaining = totalSeconds;
  setInterval(function(){
    remaining = remaining > 0 ? remaining - 1 : totalSeconds;
    const m = Math.floor(remaining / 60);
    const s = remaining % 60;
    minEl.textContent = String(m).padStart(2,'0');
    secEl.textContent = String(s).padStart(2,'0');
  }, 1000);
})();

// =====================================================
// CARROSSEL DE MÓDULOS
// =====================================================
(function(){
  const track = document.querySelector('.carousel');
  if(!track) return;
  const prev = document.querySelector('.carousel-btn.prev');
  const next = document.querySelector('.carousel-btn.next');
  const step = 220;
  prev && prev.addEventListener('click', () => track.scrollBy({left:-step, behavior:'smooth'}));
  next && next.addEventListener('click', () => track.scrollBy({left:step, behavior:'smooth'}));
})();

// =====================================================
// POP-UP DE ABANDONO DE PÁGINA (EXIT INTENT)
// Captura Nome, E-mail e WhatsApp antes da lead sair.
// =====================================================
(function(){
  const overlay = document.getElementById('exitOverlay');
  if(!overlay) return;
  const closeBtn = overlay.querySelector('.close');
  const form = document.getElementById('exitForm');
  const STORAGE_KEY = 'msa_exit_popup_shown';
  let alreadyShown = sessionStorage.getItem(STORAGE_KEY);

  function showPopup(){
    if(alreadyShown) return;
    overlay.classList.add('show');
    alreadyShown = true;
    sessionStorage.setItem(STORAGE_KEY, '1');
  }
  function hidePopup(){
    overlay.classList.remove('show');
  }

  // Dispara quando o mouse sai pela parte de cima da tela (desktop)
  document.addEventListener('mouseout', function(e){
    if(!e.relatedTarget && e.clientY <= 0){
      showPopup();
    }
  });

  // Dispara em mobile após um tempo de leitura (sem "mouse leave" em touch)
  setTimeout(showPopup, 45000);

  closeBtn && closeBtn.addEventListener('click', hidePopup);
  overlay.addEventListener('click', function(e){
    if(e.target === overlay) hidePopup();
  });

  form && form.addEventListener('submit', function(e){
    e.preventDefault();
    // -----------------------------------------------------------
    // INTEGRAÇÃO: troque este bloco pelo envio para o seu CRM/e-mail
    // marketing (RD Station, ActiveCampaign, Mailchimp, planilha via
    // Zapier/Make, webhook próprio etc.). Exemplo com fetch:
    //
    // fetch('https://SEU-ENDPOINT-AQUI', {
    //   method: 'POST',
    //   headers: {'Content-Type':'application/json'},
    //   body: JSON.stringify({
    //     nome: form.nome.value,
    //     email: form.email.value,
    //     whatsapp: form.whatsapp.value
    //   })
    // });
    // -----------------------------------------------------------
    alert('Obrigado! Em breve você receberá a oferta no seu e-mail/WhatsApp.');
    hidePopup();
  });
})();
