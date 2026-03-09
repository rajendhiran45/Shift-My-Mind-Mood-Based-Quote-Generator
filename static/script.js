const colors = {
    happy: "#FFEB3B",      
    sad: "#90CAF9",        
    motivation: "#FFCC80", 
    love: "#F48FB1"        
};

const labels = {
    happy: "Spread the Joy",
    sad: "Comfort Me",
    motivation: "Fuel My Day",
    love: "Feel the Warmth"
};

function updateUI() {
    const moodSelect = document.getElementById("Mood");
    const selectedMood = moodSelect.value;
    const btn = document.getElementById("btn");
    const body = document.getElementById("bg-layer");

    if (selectedMood && colors[selectedMood]) {
        btn.innerText = labels[selectedMood];
        body.style.backgroundColor = colors[selectedMood];
    } else {
        btn.innerText = "Select a mood first...";
        body.style.backgroundColor = "#f0f2f5"; 
    }
}
async function fetchNewQuote() {
    const mood = document.getElementById("Mood").value;
    if (!mood) return;
    const display = document.getElementById("quoteDisplay");
    display.innerText = "Fetching inspiration...";
    // Fetch the quote from our new Flask API route
    const response = await fetch(`/get_quote/${mood}`);
    const data = await response.json();
    await new Promise(resolve => setTimeout(resolve, 700));

    // Restart the animation
    display.style.animation = 'none';
    display.offsetHeight; /* trigger reflow */
    display.style.animation = null; 
    
    display.innerText = `"${data.quote}"`;
}
// Automatically runs when the page loads to apply colors from Flask
window.onload = function() {
    updateUI();
};