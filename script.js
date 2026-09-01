// Quiz Logic
let userPreferences = {
    mood: '',
    flavor: '',
    type: ''
};

const drinksData = {
    coffee: {
        chocolate: { name: 'Midnight Mocha', desc: "Rich espresso combined with premium chocolate and silky milk. Perfect for chocolate lovers!" },
        sweet: { name: 'Caramel Macchiato', desc: "A layered balance of espresso, velvety milk, and buttery sweet caramel." },
        fresh: { name: 'Honey Hug Latte', desc: "Espresso with natural honey and warm steamed milk." },
        default: { name: 'Cloud Nine Latte', desc: "Our signature vanilla blend topped with light, airy milk foam." }
    },
    creamy: {
        fruity: { name: 'Berry Dream', desc: "Sweet strawberry puree infused with creamy vanilla milk." },
        fresh: { name: 'Green Whisper', desc: "Premium ceremonial-grade matcha with smooth steamed milk." },
        chocolate: { name: 'Choco Cloud', desc: "Decadent chocolate whipped into a comforting, velvety treat." },
        default: { name: 'Honey Hug Latte', desc: "A soothing warm milk drink infused with honey." }
    },
    refreshing: {
        fruity: { name: 'Strawberry Spark', desc: "Crisp sparkling water paired with crushed strawberries and lemon." },
        fresh: { name: 'Sunrise Fizz', desc: "A zesty combination of passion fruit and sparkling citrus." },
        sweet: { name: 'Peachy Paw Cooler', desc: "Refreshing iced peach tea with a hint of citrus." },
        default: { name: 'Sunrise Fizz', desc: "A bright, revitalizing burst of sparkling citrus." }
    }
};

function nextQuestion(currentStep, value) {
    if (currentStep === 1) userPreferences.mood = value;
    if (currentStep === 2) userPreferences.flavor = value;

    const currentElem = document.getElementById(`question-${currentStep}`);
    const nextElem = document.getElementById(`question-${currentStep + 1}`);
    
    if (currentElem && nextElem) {
        currentElem.classList.remove('active');
        nextElem.classList.add('active');
    }
}

function showResult(type) {
    userPreferences.type = type;
    
    const q3 = document.getElementById('question-3');
    if (q3) q3.classList.remove('active');
    
    let match;
    const flavor = userPreferences.flavor;
    
    if (drinksData[type] && drinksData[type][flavor]) {
        match = drinksData[type][flavor];
    } else {
        match = drinksData[type] ? drinksData[type].default : drinksData.coffee.default;
    }

    const titleElem = document.getElementById('result-title');
    const descElem = document.getElementById('result-desc');
    const resultBox = document.getElementById('quiz-result');

    if (titleElem) titleElem.innerText = match.name;
    if (descElem) descElem.innerText = `Recommended for your ${userPreferences.mood} mood:\n${match.desc}`;
    if (resultBox) resultBox.classList.add('active');
    
    // Animate mascot
    const mascot = document.getElementById('bean-mascot');
    if (mascot) {
        mascot.style.transform = 'scale(1.2) rotate(12deg)';
        setTimeout(() => {
            mascot.style.transform = '';
        }, 600);
    }
}

function resetQuiz() {
    const resultBox = document.getElementById('quiz-result');
    const q1 = document.getElementById('question-1');
    if (resultBox) resultBox.classList.remove('active');
    if (q1) q1.classList.add('active');
    userPreferences = { mood: '', flavor: '', type: '' };
}

// Order Form Submit
function submitOrder(event) {
    event.preventDefault();
    const orderForm = document.getElementById('order-form');
    const orderSuccess = document.getElementById('order-success');
    if (orderForm) orderForm.style.display = 'none';
    if (orderSuccess) orderSuccess.classList.remove('hidden');
}

// Scroll Reveal Animation (Intersection Observer)
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.fade-in-section');
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.12
        });

        sections.forEach(sec => observer.observe(sec));
    } else {
        sections.forEach(sec => sec.classList.add('is-visible'));
    }
});

function showToast(message) {
    const toast = document.getElementById("toast");
    if (!toast) return;
    toast.innerText = message;
    toast.className = "toast show";
    setTimeout(function() { 
        toast.className = toast.className.replace("show", ""); 
    }, 3000);
}
