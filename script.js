const API_URL = "https://www.boredapi.com/api";

//Fetching Logic
async function getActivity(type = "") {
    try {
        // Using mock data for reliable functionality in all environments
        const mockActivities = [
            // Education
            { activity: "Learn a new programming language", type: "education", participants: 1, price: 0 },
            { activity: "Read a book on a new topic", type: "education", participants: 1, price: 0.1 },
            { activity: "Take an online course", type: "education", participants: 1, price: 0.2 },
            { activity: "Learn to play a musical instrument", type: "education", participants: 1, price: 0.3 },
            { activity: "Study a foreign language", type: "education", participants: 1, price: 0 },
            { activity: "Attend a webinar or workshop", type: "education", participants: 1, price: 0.1 },
            { activity: "Solve puzzles or brain teasers", type: "education", participants: 1, price: 0 },
            { activity: "Research a historical event", type: "education", participants: 1, price: 0 },
            
            // DIY
            { activity: "Organize your closet", type: "diy", participants: 1, price: 0.1 },
            { activity: "Build a piece of furniture", type: "diy", participants: 1, price: 0.4 },
            { activity: "Paint a room in your house", type: "diy", participants: 1, price: 0.2 },
            { activity: "Create a scrapbook", type: "diy", participants: 1, price: 0.1 },
            { activity: "Repair something broken", type: "diy", participants: 1, price: 0.1 },
            { activity: "Make homemade candles", type: "diy", participants: 1, price: 0.2 },
            { activity: "Build a model or kit", type: "diy", participants: 1, price: 0.3 },
            { activity: "Garden or plant flowers", type: "diy", participants: 1, price: 0.2 },
            
            // Social
            { activity: "Call a friend you haven't talked to in a while", type: "social", participants: 1, price: 0 },
            { activity: "Host a game night", type: "social", participants: 4, price: 0.2 },
            { activity: "Plan a picnic with friends", type: "social", participants: 3, price: 0.1 },
            { activity: "Join a club or group", type: "social", participants: 2, price: 0 },
            { activity: "Write letters to family", type: "social", participants: 1, price: 0.1 },
            { activity: "Organize a neighborhood event", type: "social", participants: 5, price: 0.1 },
            { activity: "Visit a friend or family member", type: "social", participants: 2, price: 0 },
            { activity: "Start a conversation with a stranger", type: "social", participants: 1, price: 0 },
            
            // Cooking
            { activity: "Try a new recipe", type: "cooking", participants: 1, price: 0.2 },
            { activity: "Bake cookies or bread", type: "cooking", participants: 1, price: 0.3 },
            { activity: "Make a meal from scratch", type: "cooking", participants: 1, price: 0.4 },
            { activity: "Experiment with spices", type: "cooking", participants: 1, price: 0.1 },
            { activity: "Cook a dish from another culture", type: "cooking", participants: 1, price: 0.2 },
            { activity: "Make homemade pizza", type: "cooking", participants: 1, price: 0.3 },
            { activity: "Prepare a healthy smoothie", type: "cooking", participants: 1, price: 0.1 },
            { activity: "Can or preserve food", type: "cooking", participants: 1, price: 0.2 },
            
            // Charity
            { activity: "Volunteer at a local shelter", type: "charity", participants: 1, price: 0 },
            { activity: "Donate blood", type: "charity", participants: 1, price: 0 },
            { activity: "Clean up a park or beach", type: "charity", participants: 2, price: 0 },
            { activity: "Help at a food bank", type: "charity", participants: 1, price: 0 },
            { activity: "Raise awareness for a cause", type: "charity", participants: 1, price: 0 },
            { activity: "Mentor someone in need", type: "charity", participants: 1, price: 0 },
            { activity: "Collect donations for charity", type: "charity", participants: 2, price: 0 },
            { activity: "Participate in a charity run", type: "charity", participants: 1, price: 0.1 },
            
            // Recreational
            { activity: "Go for a hike", type: "recreational", participants: 1, price: 0.1 },
            { activity: "Play a sport", type: "recreational", participants: 2, price: 0.1 },
            { activity: "Watch a movie", type: "recreational", participants: 1, price: 0.2 },
            { activity: "Listen to music", type: "recreational", participants: 1, price: 0 },
            { activity: "Draw or paint", type: "recreational", participants: 1, price: 0.1 },
            { activity: "Play board games", type: "recreational", participants: 2, price: 0.1 },
            { activity: "Go stargazing", type: "recreational", participants: 1, price: 0 },
            { activity: "Try a new hobby", type: "recreational", participants: 1, price: 0.2 }
        ];

       if (type) {
            const filtered = mockActivities.filter(a => a.type === type);
            return filtered.length > 0 ? filtered[Math.floor(Math.random() * filtered.length)] : mockActivities[Math.floor(Math.random() * mockActivities.length)];
        } else {
            return mockActivities[Math.floor(Math.random() * mockActivities.length)];
        }
    } catch (error) {
        console.error("Fetch failed", error);
        return null;
    }
}
if (document.getElementById('get-activity')) {
    const display = document.getElementById('activity-display');
    const typeLabel = document.getElementById('activity-type');

    document.getElementById('get-activity').addEventListener('click', async () => {
        const data = await getActivity();
        if (data) {
            display.innerText = data.activity;
            typeLabel.innerText = `Type: ${data.type}`;
            typeLabel.style.fontFamily = 'monospace';
        } else {
            display.innerText = "Error: Could not fetch activity.";
            typeLabel.innerText = "";
        }
    });

    document.getElementById('save-activity').addEventListener('click', () => {
        const currentActivity = display.innerText;
        if (currentActivity !== "Ready?" && currentActivity !== "Error: Could not fetch activity.") {
            let favs = JSON.parse(localStorage.getItem('favActivities')) || [];
            if(!favs.includes(currentActivity)) {
                favs.push(currentActivity);
                localStorage.setItem('favActivities', JSON.stringify(favs));
                alert("Saved!");
            }
        }
    });
}

if (document.getElementById('filter-btn')) {
    document.getElementById('filter-btn').addEventListener('click', async () => {
        const cat = document.getElementById('category-select').value;
        const data = await getActivity(cat);
        if (data) {
            document.getElementById('filter-display').innerText = data.activity;
        } else {
            document.getElementById('filter-display').innerText = "Error: Could not fetch activity. Please check your internet connection.";
        }
    });
}

if (document.getElementById('favorites-list')) {
    const list = document.getElementById('favorites-list');
    const noFavs = document.getElementById('no-favorites');
    const favs = JSON.parse(localStorage.getItem('favActivities')) || [];
    
    if (favs.length > 0) {
        noFavs.style.display = 'none';
        favs.forEach(activity => {
            const item = document.createElement('div');
            item.className = 'favorite-item';
            item.innerText = activity;
            const removeBtn = document.createElement('button');
            removeBtn.innerText = 'Remove';
            removeBtn.className = 'btn-remove';
            removeBtn.onclick = () => {
                const index = favs.indexOf(activity);
                if (index > -1) {
                    favs.splice(index, 1);
                    localStorage.setItem('favActivities', JSON.stringify(favs));
                    item.remove();
                    if (favs.length === 0) {
                        noFavs.style.display = 'block';
                    }
                }
            };
            item.appendChild(removeBtn);
            list.appendChild(item);
        });
    }
}

// Export for Testing
if (typeof module !== 'undefined') {
    module.exports = { getActivity };
}