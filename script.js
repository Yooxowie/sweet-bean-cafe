// Quiz Logic
let userPreferences = {
    mood: '',
    flavor: '',
    type: ''
};

const drinksData = {
    coffee: {
        chocolate: { name: '🌙 Midnight Mocha', desc: "Perfect for chocolate lovers!" },
        sweet: { name: '🍮 Caramel Macchiato', desc: "Our best seller for a sweet craving." },
        default: { name: '🫘 Cloud Nine Latte', desc: "Bean's favorite comforting classic." }
    },
    creamy: {
        fruity: { name: '🍓 Berry Dream', desc: "Sweet, fruity, and super creamy!" },
        fresh: { name: '🌿 Green Whisper', desc: "Earthy matcha goodness." },
        chocolate: { name: '🍫 Choco Cloud', desc: "A cozy chocolate hug in a cup." },
        default: { name: '🍯 Honey Hug Latte', desc: "Warm and comforting." }
    },
    refreshing: {
        fruity: { name: '🍓 Strawberry Spark', desc: "Fizzy, fruity, and refreshing!" },
        fresh: { name: '🌅 Sunrise Fizz', desc: "A bright burst of citrus energy." },
        sweet: { name: '🍑 Peachy Paw', desc: "Sweet peach tea for a sunny day." },
        default: { name: '🌅 Sunrise Fizz', desc: "A bright burst of energy." }
    }
};

function nextQuestion(currentStep, value) {
    // Save preference
    if (currentStep === 1) userPreferences.mood = value;
    if (currentStep === 2) userPreferences.flavor = value;

    // Hide current step, show next
    document.getElementById(`question-${currentStep}`).classList.remove('active');
    document.getElementById(`question-${currentStep + 1}`).classList.add('active');
}

function showResult(type) {
    userPreferences.type = type;
    
    // Hide last question, show result
    document.getElementById('question-3').classList.remove('active');
    
    // Determine match
    let match;
    const flavor = userPreferences.flavor;
    
    if (drinksData[type] && drinksData[type][flavor]) {
        match = drinksData[type][flavor];
    } else {
        match = drinksData[type] ? drinksData[type].default : drinksData.coffee.default;
    }

    // Update UI
    document.getElementById('result-title').innerText = match.name;
    document.getElementById('result-desc').innerText = `Bean thinks this is the perfect match for your ${userPreferences.mood} mood! 🐾\n${match.desc}`;
    
    document.getElementById('quiz-result').classList.add('active');
    
    // Animate mascot
    const mascot = document.getElementById('bean-mascot');
    mascot.style.transform = 'scale(1.2) rotate(15deg)';
    setTimeout(() => {
        mascot.style.transform = 'scale(1) rotate(0deg)';
    }, 500);
}

function resetQuiz() {
    document.getElementById('quiz-result').classList.remove('active');
    document.getElementById('question-1').classList.add('active');
    userPreferences = { mood: '', flavor: '', type: '' };
}

// Order Form Submit
function submitOrder(event) {
    event.preventDefault();
    document.getElementById('order-form').style.display = 'none';
    document.getElementById('order-success').classList.remove('hidden');
}

// Interactive Paw Prints
document.addEventListener('DOMContentLoaded', () => {
    const paws = document.querySelectorAll('.interactive-paw');
    
    paws.forEach(paw => {
        paw.addEventListener('click', function() {
            const msg = this.getAttribute('data-msg') || "You found me!";
            showToast("🐾 Bean says: " + msg);
        });
    });
});

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.innerText = message;
    toast.className = "toast show";
    setTimeout(function(){ 
        toast.className = toast.className.replace("show", ""); 
    }, 3000);
}
