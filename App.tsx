import React, { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import { Message, Sender } from './types';
import { CoffeeIcon, SendIcon, BackIcon, CoffeeCupIcon, HistoryIcon, CycleIcon, VarietiesIcon, TourismIcon, EcosystemIcon } from './components/icons';
import en from './i18n/en';
import kn from './i18n/kn';

const I18N = { en, kn } as const;
type Lang = keyof typeof I18N;

type Screen = 'welcome' | 'dashboard' | 'chat';

// Helper to generate unique IDs
const generateId = () => `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// --- Knowledge Base for the Chatbot ---
const KNOWLEDGE_BASE = `# KNOWLEDGE BASE: COFFEE CULTIVATION IN COORG 

## 1. History and Introduction
Coffee was first brought to India by the saint Baba Budan in the 17th century. However, large-scale, systematic cultivation in the Coorg (Kodagu) district of Karnataka was established by the British in the 1850s. They found the misty hills, rich soil, and climate of the Western Ghats to be ideal for producing high-quality coffee. Today, Coorg is one of India's most important coffee-producing regions.

## 2. Geography and Climate (Terroir)
The unique environment of Coorg, its "terroir," is the secret behind its coffee's distinctive character.
- **Elevation:** Arabica is grown at higher altitudes of 3,300 to 4,500 ft, where the cooler temperatures allow for slow bean development. Robusta is grown at lower, warmer elevations from 2,000 to 3,000 ft.
- **Soil:** The soil is a deep, fertile, well-drained lateritic loam, rich in organic matter (humus).
- **Rainfall:** The region receives 1,500 to 2,500 mm of annual rainfall, primarily from the Southwest Monsoon. Crucially, it also receives "blossom showers" in March-April, which are essential to trigger the coffee flowering.
- **Shade-Grown:** This is a defining feature. Coorg coffee is "shade-grown" under a two-tier canopy of trees. This includes native jungle trees and cultivated trees like Rosewood, Jackfruit, Silver Oak, and Fig. The shade protects the coffee plants from direct sunlight, slows down ripening (which enhances flavor), conserves soil moisture, and promotes incredible biodiversity.

## 3. Main Coffee Varieties and Flavor Profile
- **Arabica:** This is the premium variety, known for its complex aroma and bright flavor. It has higher acidity and lower caffeine than Robusta. Popular sub-varietals grown in Coorg include S.795, which is known for its balanced cup with subtle notes of mocha.
- **Robusta:** A hardy and robust plant, as its name suggests. It has a stronger, bolder, and more "classic" coffee flavor with a nutty or chocolaty aftertaste. It has nearly double the caffeine of Arabica and is prized for producing a rich, stable crema in espresso.

- **Flavor Profile of Coorg Coffee:**
  - **Coorg Arabica:** Often described as having a balanced and complex cup. It has notes of spices (like cardamom or pepper) and a hint of fruit or citrus, with a medium body and a fine acidity.
  - **Coorg Robusta:** Known for its strong, full-bodied cup with distinct notes of chocolate and nuts. It is less acidic and has a slightly bitter finish, making it a perfect base for espresso blends.

## 4. The Annual Cultivation Cycle
This is a year-long process of patient farming.
- **Pruning and Maintenance (All Year):** After harvest, plants are pruned to encourage new growth for the next season. This includes removing old branches and training the bush into a desired shape. Manuring with organic compost is also done.
- **Flowering (March-April):** Following the first summer "blossom showers," the coffee estates are magically covered in fragrant, snow-white flowers for about 3-4 days. This is a critical moment that determines the year's potential yield.
- **Berry Development (April-October):** The flowers give way to small green berries. Over the next 6-8 months, these berries grow and slowly ripen, changing from green to a bright, glossy red.
- **Harvesting (November-February):** A meticulous, labor-intensive process.
  - **Fly Picking:** An early round to pick the first few ripe berries.
  - **Main Picking:** The primary harvest, where skilled workers selectively hand-pick only the perfectly ripe red cherries, leaving unripe ones for later.
  - **Stripping & Gleaning:** The final rounds to get all the remaining berries from the plant.
- **Processing (Post-Harvest):** This stage is crucial for the final taste.
  - **Wet Processing (Washed):** Primarily for Arabica. The cherry skin is removed (pulping) within hours of picking. The beans are then fermented in water for 24-48 hours to break down the sticky mucilage layer. Finally, they are washed thoroughly and dried on large patios or raised tables. This method produces a clean, bright, high-acidity coffee.
  - **Dry Processing (Natural):** Common for Robusta. The entire coffee cherry is spread out on large patios or mats to dry in the sun for several weeks. The cherries are raked regularly to ensure even drying. This results in a full-bodied, sweeter, fruitier, and less acidic coffee because the bean absorbs flavors from the drying fruit pulp.
- **Curing and Grading:** The dried beans, now called "parchment" (wet-processed) or "cherry" (dry-processed), are sent to a curing works. Here, machines hull, polish, grade them by size and density, and sort them to remove any defective beans. The final green coffee beans are then bagged and ready for roasters.

## 5. The GI (Geographical Indication) Tag
"Coorg Arabica Coffee" was granted the Geographical Indication (GI) tag in 2019. This tag is a legal recognition that the coffee possesses specific qualities and a reputation attributable to its origin in Coorg. It acts as a mark of authenticity and quality, assuring consumers that they are buying genuine coffee grown and processed according to the traditional methods of the region.

## 6. Pests, Diseases, and Management
Coffee planters in Coorg constantly battle various pests and diseases.
- **White Stem Borer:** A major pest for Arabica. The grub of a beetle bores into the woody stem of the plant, often killing it. Management involves tracing and uprooting infested plants.
- **Coffee Berry Borer:** A small beetle that bores into the coffee berry, damaging the beans inside and reducing yield and quality.
- **Coffee Leaf Rust:** A fungal disease that causes orange-yellow powdery spots on the leaves, leading to defoliation and reduced photosynthetic ability. The S.795 varietal was bred specifically for its resistance to this rust.

## 7. Economy, Culture, and Sustainability
- **Economy:** Coffee is the backbone of Coorg's economy. The industry employs a significant portion of the local population, from plantation owners (planters) to the thousands of workers involved in picking, processing, and management.
- **Culture:** Coffee is woven into the fabric of Kodava life. The rhythm of the year is often set by the coffee cycle. The "planter" is a respected figure in the community.
- **Sustainability and Biodiversity:** The shade-grown method makes Coorg's coffee estates biodiversity hotspots. They provide a sanctuary for hundreds of species of birds, insects, reptiles, and even mammals like monkeys and civets. This method naturally enriches the soil and prevents erosion, making it an environmentally sustainable form of agriculture.

## 8. Modern Challenges
- **Climate Change:** Erratic rainfall patterns, including delayed or insufficient blossom showers, can severely impact flowering and yield. Increased temperatures can also favor the spread of pests.
- **Labor Shortage:** Finding skilled labor for the intensive harvesting season is becoming increasingly difficult and expensive.
- **Price Volatility:** Coffee planters are often subject to the fluctuating prices of the global coffee market, which can make profitability uncertain.

## 9. Coffee Grades and Quality Classification
After curing and before bagging, the green coffee beans are graded based on Indian standards. This is crucial for determining their price and quality.
- **Grading by Size (Screen Size):** Beans are passed through screens with specific sized holes. The main grades are:
  - **AA:** The largest beans, often considered the highest quality (e.g., Arabica Plantation-AA).
  - **A:** The next size down.
  - **B:** Smaller beans.
  - **C:** The smallest beans.
- **Peaberry (PB):** Normally, a coffee cherry contains two flat-sided beans. A Peaberry is a natural mutation where only one small, round bean develops inside the cherry. These are often separated and sold as a premium grade, as they are believed to have a more concentrated flavor.
- **Grading by Defect:** Beans are also sorted to remove broken, insect-damaged, or discolored beans. A lower defect count means higher quality.
- **Specialty vs. Commodity:** High-grade Arabica and some fine Robustas from Coorg are sold as "specialty coffee" to discerning roasters. The lower grades are often sold as "commodity coffee" for use in large-scale commercial blends and instant coffee.

## 10. The Rich Ecosystem: Beyond Coffee
The shade-grown coffee estates of Coorg are not just farms; they are thriving ecosystems, often referred to as "coffee forests."
- **Intercropping:** Many estates are not monocultures. Farmers grow valuable spices alongside the coffee, primarily **Black Pepper** (vines are trained up the shade trees) and **Cardamom**. Sometimes vanilla and cloves are also grown. This provides diversified income and contributes to the unique aromatic environment.
- **Fauna:** These estates are a sanctuary for wildlife. It is common to see:
  - **Birds:** The Malabar Grey Hornbill, parrots, and numerous other species thrive in the shade canopy.
  - **Mammals:** Civet cats (whose droppings are famously, but rarely, used for 'Kopi Luwak' coffee), monkeys, and squirrels are common residents.
  - **Insects and Reptiles:** A vast array of insects, including bees essential for pollination, and various reptiles contribute to the balanced ecosystem.

## 11. Coffee Tourism in Coorg
Coorg has become a major destination for coffee tourism, offering immersive experiences for visitors.
- **Estate Stays and Homestays:** Many coffee planters have opened their ancestral homes and bungalows to tourists, offering a chance to live on a working plantation.
- **Plantation Tours:** Guided tours are a popular activity. A guide (often the planter themselves) walks visitors through the estate, explaining the entire cultivation cycle, from blossom to bean.
- **Best Time to Visit:**
  - **February to April:** Ideal for witnessing the magical, fragrant coffee blossoms. The weather is pleasant.
  - **November to January:** The peak harvesting season. Visitors can see the vibrant red cherries on the plants and watch the picking and processing activities.
- **Bean-to-Cup Experiences:** Some estates offer workshops where guests can participate in roasting and brewing the coffee grown right there, often ending with a tasting session.

## 12. From Bean to Cup: The Final Steps
While the chatbot's focus is cultivation, understanding what happens next completes the story.
- **Sale of Green Beans:** The vast majority of coffee from Coorg is sold as un-roasted "green beans" to national and international buyers and roasters. The quality and grade determine the price.
- **Roasting:** This is the chemical process that transforms the green bean into the brown, aromatic bean we recognize. The roaster's skill is paramount in bringing out the specific flavor profile (spicy, fruity, chocolaty) inherent in the Coorg bean.
- **Traditional Brewing:** In South India, coffee is traditionally enjoyed as "Filter Kaapi." This is a strong decoction made using a metal drip filter, which is then mixed with hot, foamed milk and sugar. It is a cultural staple in the region.`;

// --- Components ---
const SimpleMarkdownRenderer: React.FC<{ text: string }> = ({ text }) => {
  const parseInline = (line: string): string => {
    return line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  const blocks = text.split(/\n\s*\n/).filter(block => block.trim() !== '');

  return (
    <div className="text-sm space-y-4">
      {blocks.map((block, index) => {
        const lines = block.split('\n');
        const isList = lines.every(line => line.trim().startsWith('* ') || line.trim().startsWith('- '));
        
        if (isList) {
          return (
            <ul key={index} className="list-disc list-inside space-y-1">
              {lines.map((line, lineIndex) => (
                <li 
                  key={lineIndex} 
                  dangerouslySetInnerHTML={{ __html: parseInline(line.trim().substring(2)) }} 
                />
              ))}
            </ul>
          );
        }
        
        const paragraphHtml = parseInline(block).replace(/\n/g, '<br />');
        return <p key={index} dangerouslySetInnerHTML={{ __html: paragraphHtml }} />;
      })}
    </div>
  );
};

// --- Welcome Screen ---
const WelcomeScreen: React.FC<{
  onExplore: () => void;
  T: typeof en;
  language: Lang;
  setLanguage: (lang: Lang) => void;
}> = ({ onExplore, T, language, setLanguage }) => (
  <div
    className="h-screen w-screen bg-cover bg-center flex flex-col items-center justify-center text-white text-center p-4"
    style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(https://d3vp2rl7047vsp.cloudfront.net/articles/article_images/000/000/023/original/Paradise-of-Plantations-in-Karnataka.jpg?1606206270)` }}
  >
    <div style={{ position: 'absolute', top: 16, right: 16, zIndex: 5 }}>
      <select
        aria-label="Language"
        value={language}
        onChange={(e) => setLanguage(e.target.value as Lang)}
        style={{ background: '#fff', color: '#000', padding: '6px 10px', borderRadius: 8, border: '1px solid #ccc' }}
      >
        <option value="en">English</option>
        <option value="kn">ಕನ್ನಡ</option>
      </select>
    </div>
    <div className="bg-black/50 backdrop-blur-sm p-8 rounded-xl shadow-2xl max-w-2xl">
      <CoffeeCupIcon className="w-16 h-16 mx-auto mb-4 text-emerald-400" />
      <h1 className="text-4xl md:text-5xl font-bold mb-2">{T.welcomeTitle}</h1>
      <p className="text-lg md:text-xl text-stone-300 mb-8">{T.welcomeSubtitle}</p>
      <button
        onClick={onExplore}
        className="bg-emerald-600 text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-emerald-500 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-emerald-500/50"
      >
        {T.explore}
      </button>
    </div>
  </div>
);

// --- Dashboard Screen ---
interface AccordionCardProps {
    title: string;
    summary: string;
    children: React.ReactNode;
    icon: React.ReactNode;
}
const AccordionCard: React.FC<AccordionCardProps> = ({ title, summary, children, icon }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-stone-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 mb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left p-4 flex justify-between items-center hover:bg-stone-700/50 focus:outline-none"
                aria-expanded={isOpen}
            >
                <div className="flex items-center flex-grow min-w-0">
                    <div className="flex-shrink-0 text-stone-400">{icon}</div>
                    <div className="ml-4 min-w-0">
                        <h3 className={`font-bold text-lg transition-colors duration-300 ${isOpen ? 'text-emerald-500' : 'text-emerald-400'}`}>{title}</h3>
                        <p className={`text-sm text-stone-400 transition-opacity duration-300 ${isOpen ? 'opacity-0 h-0' : 'opacity-100 h-auto mt-1'}`}>{summary}</p>
                    </div>
                </div>
                <svg className={`w-6 h-6 transform transition-transform duration-300 flex-shrink-0 ml-2 ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            <div className={`transition-all duration-500 ease-in-out ${isOpen ? 'max-h-screen' : 'max-h-0'}`}>
                <div className="p-4 border-t border-stone-700 text-stone-300 text-sm space-y-2">
                    {children}
                </div>
            </div>
        </div>
    );
};

const DashboardScreen: React.FC<{
  onAskAI: () => void;
  onBack: () => void;
  T: typeof en;
}> = ({ onAskAI, onBack, T }) => (
    <div className="bg-stone-900 text-white min-h-screen font-sans">
         <header className="bg-stone-800/50 backdrop-blur-sm p-4 border-b border-stone-700 shadow-lg flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center space-x-3">
                <CoffeeIcon className="w-8 h-8 text-emerald-400" />
                <div>
                    <h1 className="text-xl font-bold text-stone-100">{T.dashboardTitle}</h1>
                    <p className="text-xs text-stone-400">An interactive guide</p>
                </div>
            </div>
            <button
              onClick={onBack}
              className="text-stone-300 hover:text-white hover:bg-stone-700 font-semibold py-2 px-4 rounded-lg transition-colors duration-200 text-sm flex items-center space-x-2"
              aria-label="Back to welcome screen"
            >
              <BackIcon className="w-5 h-5" />
              <span>{T.back}</span>
            </button>
         </header>
         <div 
            className="h-48 bg-cover bg-center" 
            style={{ backgroundImage: `url(https://d3vp2rl7047vsp.cloudfront.net/articles/article_images/000/000/023/original/Paradise-of-Plantations-in-Karnataka.jpg?1606206270)`}}
            role="presentation"
            aria-hidden="true"
        ></div>
         <main className="p-4 md:p-6">
            <div className="max-w-4xl mx-auto">
                <AccordionCard title={T.cards.history} summary={T.cards.history_summary} icon={<HistoryIcon className="w-8 h-8"/>}>
                    <SimpleMarkdownRenderer text={T.cards.history_details} />
                </AccordionCard>
                <AccordionCard title={T.cards.cycle} summary={T.cards.cycle_summary} icon={<CycleIcon className="w-8 h-8"/>}>
                    <SimpleMarkdownRenderer text={T.cards.cycle_details} />
                </AccordionCard>
                 <AccordionCard title={T.cards.varieties} summary={T.cards.varieties_summary} icon={<VarietiesIcon className="w-8 h-8"/>}>
                    <SimpleMarkdownRenderer text={T.cards.varieties_details} />
                </AccordionCard>
                <AccordionCard title={T.cards.tourism} summary={T.cards.tourism_summary} icon={<TourismIcon className="w-8 h-8"/>}>
                    <SimpleMarkdownRenderer text={T.cards.tourism_details} />
                </AccordionCard>
                <AccordionCard title={T.cards.ecosystem} summary={T.cards.ecosystem_summary} icon={<EcosystemIcon className="w-8 h-8"/>}>
                    <SimpleMarkdownRenderer text={T.cards.ecosystem_details} />
                </AccordionCard>
            </div>
         </main>
         <footer className="p-4 sticky bottom-0">
             <div className="max-w-4xl mx-auto">
                 <button onClick={onAskAI} className="w-full bg-emerald-600 text-white font-bold py-3 px-6 rounded-lg text-base hover:bg-emerald-500 transition-all duration-200 shadow-lg">
                     {T.askExpert}
                 </button>
             </div>
         </footer>
    </div>
);

// --- Chat Screen ---
const TypingIndicator: React.FC = () => (
    <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-stone-400 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-stone-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 bg-stone-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
    </div>
);

interface MessageBubbleProps {
  message: Message;
}
const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.sender === Sender.USER;
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}>
      <div
        className={`max-w-xs md:max-w-md lg:max-w-2xl px-4 py-3 rounded-2xl shadow-md ${
          isUser
            ? 'bg-emerald-600 text-white rounded-br-none'
            : 'bg-stone-700 text-stone-200 rounded-bl-none'
        }`}
      >
        {isUser ? (
          <p className="text-sm whitespace-pre-wrap">{message.text}</p>
        ) : (
          <SimpleMarkdownRenderer text={message.text} />
        )}
      </div>
    </div>
  );
};

const ChatScreen: React.FC<{
  onBack: () => void;
  T: typeof en;
  language: Lang;
}> = ({ onBack, T, language }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chatInstance = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);
  
  useEffect(() => {
    try {
        if (!process.env.API_KEY) {
            throw new Error("API_KEY environment variable not set.");
        }
        setError(null);

        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const systemInstruction = `${T.systemInstruction}\n\nBase every answer strictly on the following context. If something is not in the context, say you don’t have that info.\n\n${KNOWLEDGE_BASE}`;

        chatInstance.current = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: { systemInstruction },
        });

        // Set the static initial message
        const initialMessage: Message = {
            id: generateId(),
            text: T.chatGreeting,
            sender: Sender.BOT,
            suggestions: T.chat.suggestions,
        };
        setMessages([initialMessage]);
    } catch (e) {
        console.error(e);
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred during initialization.';
        setError(errorMessage);
        setMessages([{
            id: generateId(),
            text: `Sorry, I couldn't start the conversation. Please try again.`,
            sender: Sender.BOT,
        }]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language, T]);

  const executeSendMessage = useCallback(async (messageText: string) => {
    if (!messageText.trim() || isLoading || !chatInstance.current) return;

    const userMessage: Message = {
      id: generateId(),
      text: messageText,
      sender: Sender.USER,
    };
    
    setIsLoading(true);
    setError(null);
    const botResponseId = generateId();
    // Remove suggestions from the previous bot message
    setMessages(prev => {
        const newMessages = prev.map(msg => ({ ...msg, suggestions: undefined }));
        return [...newMessages, userMessage, { id: botResponseId, text: '', sender: Sender.BOT }];
    });


    try {
      const prefix = language === 'kn' ? 'ಉತ್ತರವನ್ನು ಕನ್ನಡದಲ್ಲಿ ಮಾತ್ರ ನೀಡಿ. ' : 'Answer only in English. ';
      const messageToSend = prefix + messageText;
      const stream = await chatInstance.current.sendMessageStream({ message: messageToSend });

      let currentBotText = '';
      for await (const chunk of stream) {
        currentBotText += chunk.text;
        setMessages(prev =>
          prev.map(msg =>
            msg.id === botResponseId ? { ...msg, text: currentBotText } : msg
          )
        );
      }

      // After stream is done, parse for suggestions
      const [mainText, suggestionsText] = currentBotText.split('[SUGGESTIONS]');
      const suggestions = suggestionsText
        ? suggestionsText
            .split('\n')
            .map(q => q.replace(/^\d+\.\s*/, '').trim()) // Removes "1. ", "2. " etc.
            .filter(q => q) // Filters out empty lines
        : [];
      
      // Final update with parsed text and suggestions
      setMessages(prev =>
        prev.map(msg =>
          msg.id === botResponseId ? { ...msg, text: mainText.trim(), suggestions: suggestions.length > 0 ? suggestions : undefined } : msg
        )
      );

    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Sorry, something went wrong: ${errorMessage}`);
       setMessages(prev =>
          prev.map(msg =>
            msg.id === botResponseId ? { ...msg, text: `Sorry, I encountered an error. Please try again.` } : msg
          )
        );
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, language]);
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
        executeSendMessage(input);
        setInput('');
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    executeSendMessage(suggestion);
  };


  return (
    <div className="bg-stone-900 text-white flex flex-col h-screen font-sans">
      <header className="bg-stone-800/50 backdrop-blur-sm p-4 border-b border-stone-700 shadow-lg flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="p-1 rounded-full hover:bg-stone-700 transition-colors" aria-label="Back to dashboard">
            <BackIcon className="w-6 h-6"/>
          </button>
          <CoffeeIcon className="w-8 h-8 text-emerald-400" />
          <div>
              <h1 className="text-xl font-bold text-stone-100">{T.chatTitle}</h1>
              <p className="text-xs text-stone-400">{T.chatSubtitle}</p>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          {messages.map((msg) => {
              if (msg.text === '' && msg.sender === Sender.BOT) {
                return (
                  <div key={msg.id} className="flex justify-start mb-4">
                       <div className="max-w-xs md:max-w-md lg:max-w-2xl px-4 py-3 rounded-2xl shadow-md bg-stone-700 text-stone-200 rounded-bl-none">
                          <TypingIndicator />
                       </div>
                  </div>
                );
              }
              return (
                  <div key={msg.id}>
                      <MessageBubble message={msg} />
                      {msg.sender === Sender.BOT && msg.suggestions && msg.suggestions.length > 0 && (
                          <div className="mt-2 mb-4 flex flex-wrap justify-start gap-2 max-w-xs md:max-w-md lg:max-w-2xl">
                              {msg.suggestions.map((suggestion, index) => (
                                  <button
                                      key={index}
                                      onClick={() => handleSuggestionClick(suggestion)}
                                      className="bg-stone-800 text-stone-200 text-sm px-4 py-2 rounded-full hover:bg-stone-700 transition-colors border border-stone-700"
                                  >
                                      {suggestion}
                                  </button>
                              ))}
                          </div>
                      )}
                  </div>
              );
          })}

          {error && (
            <div className="flex justify-center my-4">
              <p className="bg-red-500/20 text-red-300 px-4 py-2 rounded-lg text-sm">{error}</p>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className="bg-stone-800/50 backdrop-blur-sm border-t border-stone-700 p-2 md:p-4 sticky bottom-0">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleFormSubmit} className="flex items-center space-x-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={T.chatPlaceholder}
              className="flex-1 w-full bg-stone-700 text-stone-200 placeholder-stone-400 px-4 py-3 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-500 border-transparent border transition"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-emerald-600 text-white rounded-full p-3 hover:bg-emerald-500 disabled:bg-stone-600 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-stone-800 focus:ring-emerald-500 transform active:scale-95"
              aria-label="Send message"
            >
              <SendIcon className="w-6 h-6" />
            </button>
          </form>
        </div>
      </footer>
    </div>
  );
};


// --- Main App Component ---
const App: React.FC = () => {
    const [screen, setScreen] = useState<Screen>('welcome');
    const [language, setLanguage] = useState<Lang>(() => (localStorage.getItem('lang') as Lang) || 'en');
    
    useEffect(() => { 
        localStorage.setItem('lang', language); 
    }, [language]);

    const T = I18N[language];

    switch (screen) {
        case 'welcome':
            return <WelcomeScreen onExplore={() => setScreen('dashboard')} T={T} language={language} setLanguage={setLanguage} />;
        case 'dashboard':
            return <DashboardScreen onAskAI={() => setScreen('chat')} onBack={() => setScreen('welcome')} T={T} />;
        case 'chat':
            return <ChatScreen onBack={() => setScreen('dashboard')} T={T} language={language} />;
        default:
            return <WelcomeScreen onExplore={() => setScreen('dashboard')} T={T} language={language} setLanguage={setLanguage} />;
    }
}


export default App;