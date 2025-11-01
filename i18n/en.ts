const en = {
langCode: 'en',
langLabel: 'English',

// Welcome
welcomeTitle: 'Welcome to the World of Coorg Coffee',
welcomeSubtitle: 'An interactive guide to the history, cultivation, and culture of coffee in the heart of Karnataka.',
explore: 'Explore the Guide',

// Dashboard
dashboardTitle: 'Coorg Coffee: At a Glance',
cards: {
history: 'History & Heritage',
history_summary: 'From its 19th-century British origins to its modern-day GI-tagged status.',
history_details: "Systematic coffee cultivation in Coorg was established by the British in the 1850s, who found the climate ideal. Today, it's a vital coffee region. In 2019, \"Coorg Arabica Coffee\" received the Geographical Indication (GI) tag, a legal mark of authenticity and quality tied to its origin.",
cycle: 'The Annual Cultivation Cycle',
cycle_summary: 'A year-long journey from fragrant blossoms in spring to meticulous hand-picked harvest in winter.',
cycle_details: "The cycle begins with \"blossom showers\" triggering fragrant flowering in March-April. Berries develop over 6-8 months, turning from green to red. Harvesting from November to February is a labor-intensive process of selectively hand-picking ripe cherries. Post-harvest, beans are wet-processed (for Arabica) or dry-processed (for Robusta) to develop their final flavor profile.",
varieties: 'Coffee Varieties & Flavors',
varieties_summary: 'Explore the two main stars: the bright, complex Arabica and the bold, chocolaty Robusta.',
varieties_details: "**Coorg Arabica:** Grown at high altitudes, it offers a balanced, complex cup with notes of spice, fruit, and a fine acidity. It has lower caffeine. The S.795 sub-varietal is popular.\n\n**Coorg Robusta:** A hardier plant with nearly double the caffeine. It yields a strong, full-bodied cup with distinct notes of chocolate and nuts, making it perfect for espresso.",
tourism: 'Tourism in Coorg',
tourism_summary: 'Experience coffee culture firsthand with estate stays, plantation tours, and bean-to-cup workshops.',
tourism_details: "Coorg is a major coffee tourism hub. Visitors can stay on plantations, take guided tours to understand the cultivation cycle, and even participate in roasting and brewing workshops. The best times to visit are Feb-Apr for blossoms or Nov-Jan for the harvest season.",
ecosystem: 'A Rich Ecosystem',
ecosystem_summary: "Discover how shade-grown coffee creates a 'coffee forest,' a biodiversity hotspot for wildlife and spices.",
ecosystem_details: "Coorg's shade-grown method creates a sanctuary for birds, mammals like civets, and insects. This sustainable practice enriches the soil and prevents erosion. Farmers often intercrop with valuable spices like Black Pepper and Cardamom, diversifying income and enhancing the aromatic environment.",
},
askExpert: 'Ask the Expert AI',
back: 'Back',

// Chat
chatTitle: 'Coorg Coffee Chatbot',
chatSubtitle: 'Your expert on coffee cultivation',
chatGreeting: 'Hello! I am an expert on Coorg coffee cultivation. Ask me anything, or start with one of the suggestions below.',
chat: {
    suggestions: [
        "What are the main coffee varieties?",
        "Why is Coorg coffee shade-grown?",
        "How does the harvesting cycle work?"
    ]
},
chatPlaceholder: 'Ask about Coorg coffee...',

// Language directive for the model
systemInstruction: `You must respond ONLY in English. After your main answer, you MUST provide a list of three relevant follow-up questions, formatted exactly like this:

[SUGGESTIONS]
1. First question
2. Second question
3. Third question`,
};
export default en;