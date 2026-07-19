const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const navToggle = document.querySelector('.nav-toggle');
const navbar = document.querySelector('.navbar');

if (navToggle && navbar) {
  navToggle.addEventListener('click', () => {
    const isOpen = navbar.classList.toggle('nav-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
}

// Typing animation for hero section
(() => {
  const phrases = [
    'Ravi Sir',
    'Professional English Teacher',
    '📘 12+ Years of Teaching Experience',
    '🏆 Trusted by Thousands of Students'
  ];

  const el = document.getElementById('heroTyped');
  const cursor = document.getElementById('heroCursor');
  if (!el) return;

  let phraseIndex = 0;
  let charIndex = 0;
  let typing = true;

  const typeSpeed = 120; // slower typing
  const backSpeed = 70;  // slower backspace
  const pauseDelay = 2400; // slightly longer pause at end of phrase

  function tick() {
    const current = phrases[phraseIndex];
    if (typing) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);
      if (charIndex >= current.length) {
        typing = false;
        setTimeout(tick, pauseDelay);
        return;
      }
      setTimeout(tick, typeSpeed);
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);
      if (charIndex <= 0) {
        typing = true;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(tick, 200);
        return;
      }
      setTimeout(tick, backSpeed);
    }
  }

  // start after small delay so page fonts load
  setTimeout(tick, 700);
})();

// Chat bot form submission handler
(() => {
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatBody = document.getElementById('chatBody');

  if (!chatForm || !chatInput || !chatBody) return;

  function addChatBubble(message, type = 'user') {
    const bubble = document.createElement('div');
    bubble.className = `chat-bubble ${type}`;
    bubble.textContent = message;
    chatBody.appendChild(bubble);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  function getRandomReply(replies) {
    return replies[Math.floor(Math.random() * replies.length)];
  }

  function getBotReply(question) {
    const lower = question.toLowerCase();
    if (!lower || lower.trim().length === 0) {
      return 'Please type your question so I can help you.';
    }

    const generalReplies = [
      'Tell me more about your English question and I will give you a simple answer.',
      'I can help with grammar, writing, speaking, and exam tips. What would you like to improve?',
      'Share your doubt in one sentence and I will explain it clearly for board exam success.'
    ];

    const greetings = ['hello', 'hi', 'hii', 'hey', 'namaste', 'what’s up', 'what is up'];
    if (greetings.some((word) => lower.includes(word))) {
      return getRandomReply([
        'Hello! I am Ravi sir AI Study Bot. Ask me about grammar, writing, or exam practice.',
        'Hi there! Tell me your English doubt and I will help you with a clear answer.',
        'Namaste! Ask any English question and I will help you improve your grammar or writing.'
      ]);
    }

    if (lower.includes('grammar') || lower.includes('tense') || lower.includes('sentence')) {
      return getRandomReply([
        'For grammar help, ask me about tenses, sentence structure, or subject-verb agreement.',
        'Need help with grammar rules? I can explain tenses, prepositions, punctuation, and sentence correction.',
        'Ask me any grammar question: I can correct sentences, explain tenses, and improve your writing.'
      ]);
    }

    if (lower.includes('writing') || lower.includes('paragraph') || lower.includes('essay') || lower.includes('letter')) {
      return getRandomReply([
        'I can help you write a strong paragraph, essay, or letter answer. Tell me the topic.',
        'Need an essay or paragraph draft? Share the topic and I will give you a clear structure and lines.',
        'For writing help, I can suggest good opening lines, main ideas, and conclusion sentences.'
      ]);
    }

    if (lower.includes('mock test') || lower.includes('exam') || lower.includes('board') || lower.includes('practice')) {
      return getRandomReply([
        'I can guide you through mock test preparation and answer practice questions step by step.',
        'Ask me a practice question from the board exam syllabus and I will help you solve it correctly.',
        'For exams, I can help with revision tips, time management, and important question practice.'
      ]);
    }

    if (lower.includes('vocabulary') || lower.includes('word') || lower.includes('meaning')) {
      return getRandomReply([
        'Ask me for word meanings, synonyms, antonyms, or vocabulary usage in a sentence.',
        'I can help you learn new words, their meanings, and how to use them correctly.',
        'Tell me a word or phrase and I will explain its meaning and examples.'
      ]);
    }

    if (lower.includes('pronunciation') || lower.includes('speak') || lower.includes('speaking')) {
      return getRandomReply([
        'I can suggest better sentence patterns and speaking tips for confidence in English.',
        'Ask me about pronunciation, speaking practice, or how to express ideas clearly in English.',
        'Tell me what you want to say and I will help you speak it in simple English.'
      ]);
    }

    return getRandomReply(generalReplies);
  }

  chatForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const question = chatInput.value.trim();
    if (!question) {
      chatInput.value = '';
      chatInput.focus();
      return;
    }

    addChatBubble(question, 'user');
    chatInput.value = '';

    const reply = getBotReply(question);
    setTimeout(() => addChatBubble(reply, 'mentor'), 300);
  });
})();
