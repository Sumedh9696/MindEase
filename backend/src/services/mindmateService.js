import { config } from '../config/index.js';

const EMPATHETIC_RESPONSES = {
  stress: [
    "I hear you. Feeling stressed is so valid, especially when things pile up. Let's take a gentle pause together. Would you like to try a 2-minute Guided Breathing session?",
    "Stress can feel heavy on your body and mind. You don't have to tackle everything at once. Take a slow, deep breath in... and let it out. What is currently weighing on you most?",
    "Thank you for sharing that with me. Remember to unclench your jaw and drop your shoulders away from your ears. A 5-minute break right now might do wonders."
  ],
  anxious: [
    "Anxiety can feel so overwhelming, but remember that you are safe in this moment. Try the 5-4-3-2-1 grounding exercise: notice 5 things you can see around you right now.",
    "I'm right here with you. Your feelings are real, but they are also temporary waves. Let's ground ourselves with slow, rhythmic breathing. Ready?",
    "When anxiety rises, our thoughts run fast. What if we step over to the Daily Journal and write down whatever is swirling in your mind to give it a safe container?"
  ],
  relax: [
    "Here is a gentle reminder to slow down. Inhale peace for 4 seconds... hold for 4... and exhale gently for 4. Feel your nervous system settling.",
    "A moment of stillness is a gift to yourself. Dim the lights, soften your gaze, and listen to the steady rhythm of your breath.",
    "Let's unwind. Would you like to check out the Sleep Hygiene guide or try one of the Calming Mini-Games to ease your thoughts?"
  ],
  greeting: [
    "Hello! I'm MindMate. I'm here to support you on your wellness journey today. 🧡 How is your heart feeling right now?",
    "Welcome! Take a deep breath—you've made space for yourself today. How can I best accompany you right now?",
    "Hi there! Glad you stopped by MindEase. Whether you want to reflect, breathe, or just chat, I'm here for you."
  ],
  general: [
    "Thank you for sharing your thoughts with me. Every emotion you experience has a purpose and deserves gentle recognition.",
    "I appreciate you opening up. Small moments of awareness like this are how lasting self-compassion is built.",
    "You are doing the best you can, and that is more than enough today. How can I help you find a little more ease right now?"
  ]
};

function getRandomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function generateMindMateResponse(userMessage) {
  const msg = userMessage.toLowerCase().trim();

  // If Gemini API key is configured, attempt live AI generation
  if (config.geminiApiKey) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${config.geminiApiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              role: 'user',
              parts: [{
                text: `You are MindMate, a warm, compassionate, gentle mental wellness AI companion on the MindEase platform. Keep your replies concise (2-4 sentences), soothing, empathetic, and offer gentle grounding or mindfulness suggestions. Never diagnose, and always be a calming presence. User message: "${userMessage}"`
              }]
            }
          ]
        })
      });

      if (response.ok) {
        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (text) return text.trim();
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to empathetic rule engine:', err.message);
    }
  }

  // Empathetic rule-based response engine
  if (msg.includes('stress') || msg.includes('overwhelm') || msg.includes('pressure') || msg.includes('exam')) {
    return getRandomItem(EMPATHETIC_RESPONSES.stress);
  } else if (msg.includes('anxi') || msg.includes('nervous') || msg.includes('panic') || msg.includes('fear') || msg.includes('scared')) {
    return getRandomItem(EMPATHETIC_RESPONSES.anxious);
  } else if (msg.includes('relax') || msg.includes('calm') || msg.includes('sleep') || msg.includes('rest') || msg.includes('breathe')) {
    return getRandomItem(EMPATHETIC_RESPONSES.relax);
  } else if (msg === 'hi' || msg === 'hello' || msg.startsWith('hey') || msg.includes('good morning') || msg.includes('good evening')) {
    return getRandomItem(EMPATHETIC_RESPONSES.greeting);
  } else {
    return getRandomItem(EMPATHETIC_RESPONSES.general);
  }
}
