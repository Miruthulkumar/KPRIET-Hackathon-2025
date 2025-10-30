import { createContext, useContext, useState, useEffect } from "react";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

const translations = {
  en: {
    code: "en",
    name: "English",
    flag: "🇬🇧",
    nav: {
      dashboard: "Dashboard",
      journal: "Journal",
      tagline: "Take care of your beautiful mind"
    },
    journal: {
      title: "Your Sacred Space",
      subtitle: "A gentle place to pour out your thoughts and feelings",
      privacy: "Private & confidential • No judgement • Just for you",
      writeMode: "Write",
      speakMode: "Speak",
      shareThoughts: "Share what's on your mind",
      noJudgement: "This is a judgement-free space, just for you",
      letVoice: "Let your voice be heard",
      speakingEasier: "Sometimes speaking feels easier than writing",
      placeholder: "I'm feeling...",
      reflectWords: "Reflect on My Words",
      reflectVoice: "Reflect on My Voice",
      reflecting: "Reflecting...",
      listening: "Listening...",
      recordFirst: "Please record your voice first!",
      writeFirst: "Please write something first!",
      saved: "Safely saved",
      savedMessage: "Your thoughts are preserved in your personal sanctuary",
      expressMore: "Express More"
    },
    voice: {
      tapToBegin: "Tap the microphone to begin",
      recording: "Recording...",
      speakFreely: "Speak freely, your voice matters",
      recordComplete: "Recording Complete",
      duration: "Duration:",
      staysPrivate: "Your voice recording stays private and secure. Take your time, there's no rush."
    },
    insight: {
      detectedEmotion: "Detected Emotion",
      gentleReflection: "Gentle Reflection",
      reflectingWords: "Reflecting on your words...",
      understanding: "Taking a moment to understand and appreciate what you've shared",
      reminder: "Remember: Every feeling is valid and temporary. You're doing great. 🌱"
    },
    dashboard: {
      title: "Your Inner Garden",
      subtitle: "Watch your emotional landscape bloom and grow over time",
      momentsCaptured: "Moments Captured",
      writtenReflections: "Written Reflections",
      voiceExpressions: "Voice Expressions",
      allEntries: "All Entries",
      textOnly: "Text Only",
      voiceOnly: "Voice Only",
      loading: "Loading your memories...",
      noEntries: "Your sanctuary awaits your first reflection",
      noMatch: "No entries match this filter",
      beginJourney: "Begin Your Journey",
      release: "Release",
      releaseConfirm: "Are you sure you want to release this entry from your sanctuary?",
      written: "Written",
      spoken: "Spoken",
      emotionalJourney: "Your Emotional Journey",
      tracking: "Tracking"
    },
    insightPage: {
      backToGarden: "Back to Garden",
      reflectionFrom: "Reflection from",
      writtenExpression: "Written Expression",
      voiceExpression: "Voice Expression",
      yourWords: "Your Words",
      yourVoice: "Your Voice",
      notFound: "This entry seems to have drifted away",
      returnToGarden: "Return to Garden",
      retrieving: "Retrieving your reflection...",
      capturedAt: "Captured at"
    },
    common: {
      error: "Failed to analyze entry. Please try again.",
      quotaError: "API quota exceeded. Please check your credits or try again later.",
      authError: "Invalid API key. Please check your configuration."
    }
  },
  ta: {
    code: "ta",
    name: "தமிழ்",
    flag: "🇮🇳",
    nav: {
      dashboard: "முகப்பு",
      journal: "நாட்குறிப்பு",
      tagline: "உங்கள் அழகிய மனதை பாதுகாத்துக் கொள்ளுங்கள்"
    },
    journal: {
      title: "உங்கள் புனித இடம்",
      subtitle: "உங்கள் எண்ணங்களையும் உணர்வுகளையும் பகிர்ந்து கொள்ள ஒரு அமைதியான இடம்",
      privacy: "தனிப்பட்டது மற்றும் இரகசியம் • தீர்ப்பு இல்லை • உங்களுக்காக மட்டும்",
      writeMode: "எழுது",
      speakMode: "பேசு",
      shareThoughts: "உங்கள் மனதில் உள்ளதை பகிர்ந்து கொள்ளுங்கள்",
      noJudgement: "இது தீர்ப்பு இல்லாத இடம், உங்களுக்காக மட்டும்",
      letVoice: "உங்கள் குரலை கேட்க அனுமதிக்கவும்",
      speakingEasier: "சில நேரங்களில் பேசுவது எழுதுவதை விட எளிதாக இருக்கும்",
      placeholder: "நான் உணர்கிறேன்...",
      reflectWords: "என் வார்த்தைகளை சிந்தியுங்கள்",
      reflectVoice: "என் குரலை சிந்தியுங்கள்",
      reflecting: "சிந்திக்கிறது...",
      listening: "கேட்கிறது...",
      recordFirst: "முதலில் உங்கள் குரலை பதிவு செய்யவும்!",
      writeFirst: "முதலில் ஏதாவது எழுதவும்!",
      saved: "பாதுகாப்பாக சேமிக்கப்பட்டது",
      savedMessage: "உங்கள் எண்ணங்கள் உங்கள் தனிப்பட்ட புகலிடத்தில் பாதுகாக்கப்பட்டுள்ளன",
      expressMore: "மேலும் வெளிப்படுத்துங்கள்"
    },
    voice: {
      tapToBegin: "தொடங்க மைக்ரோஃபோனை தட்டவும்",
      recording: "பதிவு செய்கிறது...",
      speakFreely: "தயவு செய்து சுதந்திரமாக பேசுங்கள், உங்கள் குரல் முக்கியம்",
      recordComplete: "பதிவு முடிந்தது",
      duration: "கால அளவு:",
      staysPrivate: "உங்கள் குரல் பதிவு தனிப்பட்டதாகவும் பாதுகாப்பானதாகவும் இருக்கும். உங்கள் நேரத்தை எடுத்துக் கொள்ளுங்கள்."
    },
    insight: {
      detectedEmotion: "கண்டறியப்பட்ட உணர்வு",
      gentleReflection: "மென்மையான பிரதிபலிப்பு",
      reflectingWords: "உங்கள் வார்த்தைகளை சிந்திக்கிறது...",
      understanding: "நீங்கள் பகிர்ந்ததை புரிந்துகொண்டு பாராட்ட ஒரு கணம்",
      reminder: "நினைவில் கொள்ளுங்கள்: ஒவ்வொரு உணர்வும் செல்லுபடியாகும் மற்றும் தற்காலிகமானது. நீங்கள் சிறப்பாக செய்கிறீர்கள். 🌱"
    },
    dashboard: {
      title: "உங்கள் உள் தோட்டம்",
      subtitle: "உங்கள் உணர்ச்சி நிலப்பரப்பு காலப்போக்கில் மலர்வதைப் பாருங்கள்",
      momentsCaptured: "கைப்பற்றப்பட்ட தருணங்கள்",
      writtenReflections: "எழுதப்பட்ட பிரதிபலிப்புகள்",
      voiceExpressions: "குரல் வெளிப்பாடுகள்",
      allEntries: "அனைத்து பதிவுகள்",
      textOnly: "உரை மட்டும்",
      voiceOnly: "குரல் மட்டும்",
      loading: "உங்கள் நினைவுகளை ஏற்றுகிறது...",
      noEntries: "உங்கள் புகலிடம் உங்கள் முதல் பிரதிபலிப்புக்காக காத்திருக்கிறது",
      noMatch: "இந்த வடிப்பானுடன் எந்த பதிவும் பொருந்தவில்லை",
      beginJourney: "உங்கள் பயணத்தை தொடங்குங்கள்",
      release: "விடுவி",
      releaseConfirm: "இந்த பதிவை உங்கள் புகலிடத்திலிருந்து விடுவிக்க விரும்புகிறீர்களா?",
      written: "எழுதப்பட்டது",
      spoken: "பேசப்பட்டது",
      emotionalJourney: "உங்கள் உணர்ச்சி பயணம்",
      tracking: "கண்காணிப்பு"
    },
    insightPage: {
      backToGarden: "தோட்டத்திற்கு திரும்பு",
      reflectionFrom: "பிரதிபலிப்பு",
      writtenExpression: "எழுதப்பட்ட வெளிப்பாடு",
      voiceExpression: "குரல் வெளிப்பாடு",
      yourWords: "உங்கள் வார்த்தைகள்",
      yourVoice: "உங்கள் குரல்",
      notFound: "இந்த பதிவு விலகிச் சென்றதாகத் தெரிகிறது",
      returnToGarden: "தோட்டத்திற்கு திரும்பு",
      retrieving: "உங்கள் பிரதிபலிப்பை மீட்டெடுக்கிறது...",
      capturedAt: "பதிவு செய்யப்பட்ட நேரம்"
    },
    common: {
      error: "பதிவை பகுப்பாய்வு செய்ய முடியவில்லை. மீண்டும் முயற்சிக்கவும்.",
      quotaError: "API வரம்பு மீறப்பட்டது. தயவுசெய்து உங்கள் கிரெடிட்களை சரிபார்க்கவும்.",
      authError: "தவறான API விசை. உங்கள் உள்ளமைவை சரிபார்க்கவும்."
    }
  },
  hi: {
    code: "hi",
    name: "हिंदी",
    flag: "🇮🇳",
    nav: {
      dashboard: "डैशबोर्ड",
      journal: "डायरी",
      tagline: "अपने सुंदर मन का ख्याल रखें"
    },
    journal: {
      title: "आपका पवित्र स्थान",
      subtitle: "अपने विचारों और भावनाओं को साझा करने के लिए एक शांत जगह",
      privacy: "निजी और गोपनीय • कोई निर्णय नहीं • केवल आपके लिए",
      writeMode: "लिखें",
      speakMode: "बोलें",
      shareThoughts: "अपने मन की बात साझा करें",
      noJudgement: "यह निर्णय-मुक्त स्थान है, केवल आपके लिए",
      letVoice: "अपनी आवाज़ सुनाएं",
      speakingEasier: "कभी-कभी बोलना लिखने से आसान लगता है",
      placeholder: "मैं महसूस कर रहा हूँ...",
      reflectWords: "मेरे शब्दों पर विचार करें",
      reflectVoice: "मेरी आवाज़ पर विचार करें",
      reflecting: "विचार कर रहे हैं...",
      listening: "सुन रहे हैं...",
      recordFirst: "कृपया पहले अपनी आवाज़ रिकॉर्ड करें!",
      writeFirst: "कृपया पहले कुछ लिखें!",
      saved: "सुरक्षित रूप से सहेजा गया",
      savedMessage: "आपके विचार आपके व्यक्तिगत अभयारण्य में संरक्षित हैं",
      expressMore: "और अभिव्यक्त करें"
    },
    voice: {
      tapToBegin: "शुरू करने के लिए माइक्रोफोन को टैप करें",
      recording: "रिकॉर्डिंग...",
      speakFreely: "स्वतंत्र रूप से बोलें, आपकी आवाज़ महत्वपूर्ण है",
      recordComplete: "रिकॉर्डिंग पूर्ण",
      duration: "अवधि:",
      staysPrivate: "आपकी आवाज़ रिकॉर्डिंग निजी और सुरक्षित रहती है। अपना समय लें।"
    },
    insight: {
      detectedEmotion: "पहचानी गई भावना",
      gentleReflection: "कोमल प्रतिबिंब",
      reflectingWords: "आपके शब्दों पर विचार कर रहे हैं...",
      understanding: "आपने जो साझा किया उसे समझने और सराहने के लिए एक पल",
      reminder: "याद रखें: हर भावना वैध और अस्थायी है। आप बहुत अच्छा कर रहे हैं। 🌱"
    },
    dashboard: {
      title: "आपका आंतरिक बगीचा",
      subtitle: "समय के साथ अपने भावनात्मक परिदृश्य को खिलते देखें",
      momentsCaptured: "कैद किए गए पल",
      writtenReflections: "लिखित प्रतिबिंब",
      voiceExpressions: "आवाज़ अभिव्यक्तियाँ",
      allEntries: "सभी प्रविष्टियाँ",
      textOnly: "केवल पाठ",
      voiceOnly: "केवल आवाज़",
      loading: "आपकी यादें लोड हो रही हैं...",
      noEntries: "आपका अभयारण्य आपके पहले प्रतिबिंब की प्रतीक्षा कर रहा है",
      noMatch: "इस फ़िल्टर से कोई प्रविष्टि मेल नहीं खाती",
      beginJourney: "अपनी यात्रा शुरू करें",
      release: "मुक्त करें",
      releaseConfirm: "क्या आप वाकई इस प्रविष्टि को अपने अभयारण्य से मुक्त करना चाहते हैं?",
      written: "लिखित",
      spoken: "बोली गई",
      emotionalJourney: "आपकी भावनात्मक यात्रा",
      tracking: "ट्रैकिंग"
    },
    insightPage: {
      backToGarden: "बगीचे में वापस",
      reflectionFrom: "प्रतिबिंब",
      writtenExpression: "लिखित अभिव्यक्ति",
      voiceExpression: "आवाज़ अभिव्यक्ति",
      yourWords: "आपके शब्द",
      yourVoice: "आपकी आवाज़",
      notFound: "यह प्रविष्टि बह गई लगती है",
      returnToGarden: "बगीचे में लौटें",
      retrieving: "आपका प्रतिबिंब पुनः प्राप्त कर रहे हैं...",
      capturedAt: "कैद किया गया"
    },
    common: {
      error: "प्रविष्टि का विश्लेषण करने में विफल। कृपया पुनः प्रयास करें।",
      quotaError: "API कोटा पार हो गया। कृपया अपने क्रेडिट की जाँच करें।",
      authError: "अमान्य API कुंजी। कृपया अपनी कॉन्फ़िगरेशन जांचें।"
    }
  },
  ml: {
    code: "ml",
    name: "മലയാളം",
    flag: "🇮🇳",
    nav: {
      dashboard: "ഡാഷ്ബോർഡ്",
      journal: "ജേണൽ",
      tagline: "നിങ്ങളുടെ മനോഹരമായ മനസ്സിനെ പരിപാലിക്കുക"
    },
    journal: {
      title: "നിങ്ങളുടെ വിശുദ്ധ ഇടം",
      subtitle: "നിങ്ങളുടെ ചിന്തകളും വികാരങ്ങളും പങ്കിടാനുള്ള സമാധാനപരമായ സ്ഥലം",
      privacy: "സ്വകാര്യവും രഹസ്യവും • വിധിയില്ല • നിങ്ങൾക്ക് മാത്രം",
      writeMode: "എഴുതുക",
      speakMode: "സംസാരിക്കുക",
      shareThoughts: "നിങ്ങളുടെ മനസ്സിലുള്ളത് പങ്കിടുക",
      noJudgement: "ഇത് വിധി-രഹിത ഇടമാണ്, നിങ്ങൾക്ക് മാത്രം",
      letVoice: "നിങ്ങളുടെ ശബ്ദം കേൾക്കാൻ അനുവദിക്കുക",
      speakingEasier: "ചിലപ്പോൾ സംസാരിക്കുന്നത് എഴുതുന്നതിനേക്കാൾ എളുപ്പമാണ്",
      placeholder: "എനിക്ക് തോന്നുന്നു...",
      reflectWords: "എന്റെ വാക്കുകളെ പ്രതിഫലിപ്പിക്കുക",
      reflectVoice: "എന്റെ ശബ്ദത്തെ പ്രതിഫലിപ്പിക്കുക",
      reflecting: "പ്രതിഫലിപ്പിക്കുന്നു...",
      listening: "കേൾക്കുന്നു...",
      recordFirst: "ആദ്യം നിങ്ങളുടെ ശബ്ദം റെക്കോർഡ് ചെയ്യുക!",
      writeFirst: "ആദ്യം എന്തെങ്കിലും എഴുതുക!",
      saved: "സുരക്ഷിതമായി സംരക്ഷിച്ചു",
      savedMessage: "നിങ്ങളുടെ ചിന്തകൾ നിങ്ങളുടെ വ്യക്തിഗത സങ്കേതത്തിൽ സംരക്ഷിച്ചിരിക്കുന്നു",
      expressMore: "കൂടുതൽ പ്രകടിപ്പിക്കുക"
    },
    voice: {
      tapToBegin: "ആരംഭിക്കാൻ മൈക്രോഫോൺ ടാപ്പ് ചെയ്യുക",
      recording: "റെക്കോർഡിംഗ്...",
      speakFreely: "സ്വതന്ത്രമായി സംസാരിക്കുക, നിങ്ങളുടെ ശബ്ദം പ്രധാനമാണ്",
      recordComplete: "റെക്കോർഡിംഗ് പൂർത്തിയായി",
      duration: "ദൈർഘ്യം:",
      staysPrivate: "നിങ്ങളുടെ ശബ്ദ റെക്കോർഡിംഗ് സ്വകാര്യവും സുരക്ഷിതവുമായിരിക്കും. നിങ്ങളുടെ സമയമെടുക്കുക."
    },
    insight: {
      detectedEmotion: "കണ്ടെത്തിയ വികാരം",
      gentleReflection: "സൗമ്യമായ പ്രതിഫലനം",
      reflectingWords: "നിങ്ങളുടെ വാക്കുകളിൽ പ്രതിഫലിപ്പിക്കുന്നു...",
      understanding: "നിങ്ങൾ പങ്കിട്ടത് മനസ്സിലാക്കാനും അഭിനന്ദിക്കാനും ഒരു നിമിഷം",
      reminder: "ഓർക്കുക: എല്ലാ വികാരങ്ങളും സാധുവും താൽക്കാലികവുമാണ്. നിങ്ങൾ മികച്ച പ്രകടനം കാഴ്ചവെക്കുന്നു. 🌱"
    },
    dashboard: {
      title: "നിങ്ങളുടെ ആന്തരിക തോട്ടം",
      subtitle: "കാലക്രമേണ നിങ്ങളുടെ വൈകാരിക ഭൂപ്രകൃതി വിരിയുന്നത് കാണുക",
      momentsCaptured: "പിടിച്ചടക്കിയ നിമിഷങ്ങൾ",
      writtenReflections: "എഴുതിയ പ്രതിഫലനങ്ങൾ",
      voiceExpressions: "ശബ്ദ പ്രകടനങ്ങൾ",
      allEntries: "എല്ലാ എൻട്രികളും",
      textOnly: "ടെക്സ്റ്റ് മാത്രം",
      voiceOnly: "ശബ്ദം മാത്രം",
      loading: "നിങ്ങളുടെ ഓർമ്മകൾ ലോഡ് ചെയ്യുന്നു...",
      noEntries: "നിങ്ങളുടെ സങ്കേതം നിങ്ങളുടെ ആദ്യ പ്രതിഫലനത്തിനായി കാത്തിരിക്കുന്നു",
      noMatch: "ഈ ഫിൽട്ടറുമായി യാതൊരു എൻട്രിയും പൊരുത്തപ്പെടുന്നില്ല",
      beginJourney: "നിങ്ങളുടെ യാത്ര ആരംഭിക്കുക",
      release: "വിടുവിക്കുക",
      releaseConfirm: "ഈ എൻട്രി നിങ്ങളുടെ സങ്കേതത്തിൽ നിന്ന് വിടുവിക്കണമെന്ന് ഉറപ്പാണോ?",
      written: "എഴുതിയത്",
      spoken: "സംസാരിച്ചത്",
      emotionalJourney: "നിങ്ങളുടെ വൈകാരിക യാത്ര",
      tracking: "ട്രാക്കിംഗ്"
    },
    insightPage: {
      backToGarden: "തോട്ടത്തിലേക്ക് മടങ്ങുക",
      reflectionFrom: "പ്രതിഫലനം",
      writtenExpression: "എഴുതിയ പ്രകടനം",
      voiceExpression: "ശബ്ദ പ്രകടനം",
      yourWords: "നിങ്ങളുടെ വാക്കുകൾ",
      yourVoice: "നിങ്ങളുടെ ശബ്ദം",
      notFound: "ഈ എൻട്രി ഒഴുകിപ്പോയതായി തോന്നുന്നു",
      returnToGarden: "തോട്ടത്തിലേക്ക് മടങ്ങുക",
      retrieving: "നിങ്ങളുടെ പ്രതിഫലനം വീണ്ടെടുക്കുന്നു...",
      capturedAt: "പിടിച്ചടക്കിയത്"
    },
    common: {
      error: "എൻട്രി വിശകലനം ചെയ്യുന്നതിൽ പരാജയപ്പെട്ടു. വീണ്ടും ശ്രമിക്കുക.",
      quotaError: "API ക്വാട്ട അധികരിച്ചു. നിങ്ങളുടെ ക്രെഡിറ്റുകൾ പരിശോധിക്കുക.",
      authError: "അസാധുവായ API കീ. നിങ്ങളുടെ കോൺഫിഗറേഷൻ പരിശോധിക്കുക."
    }
  },
  te: {
    code: "te",
    name: "తెలుగు",
    flag: "🇮🇳",
    nav: {
      dashboard: "డాష్‌బోర్డ్",
      journal: "జర్నల్",
      tagline: "మీ అందమైన మనస్సును జాగ్రత్తగా చూసుకోండి"
    },
    journal: {
      title: "మీ పవిత్ర స్థలం",
      subtitle: "మీ ఆలోచనలు మరియు భావాలను పంచుకోవడానికి ప్రశాంతమైన ప్రదేశం",
      privacy: "ప్రైవేట్ మరియు రహస్యం • తీర్పు లేదు • మీ కోసం మాత్రమే",
      writeMode: "వ్రాయండి",
      speakMode: "మాట్లాడండి",
      shareThoughts: "మీ మనస్సులో ఉన్నది పంచుకోండి",
      noJudgement: "ఇది తీర్పు-రహిత స్థలం, మీ కోసం మాత్రమే",
      letVoice: "మీ స్వరాన్ని వినిపించండి",
      speakingEasier: "కొన్నిసార్లు మాట్లాడటం రాయడం కంటే సులభంగా అనిపిస్తుంది",
      placeholder: "నేను అనుభూతి చెందుతున్నాను...",
      reflectWords: "నా మాటలను ప్రతిబింబించండి",
      reflectVoice: "నా స్వరాన్ని ప్రతిబింబించండి",
      reflecting: "ప్రతిబింబిస్తోంది...",
      listening: "వింటోంది...",
      recordFirst: "దయచేసి ముందుగా మీ స్వరాన్ని రికార్డ్ చేయండి!",
      writeFirst: "దయచేసి ముందుగా ఏదైనా వ్రాయండి!",
      saved: "సురక్షితంగా సేవ్ చేయబడింది",
      savedMessage: "మీ ఆలోచనలు మీ వ్యక్తిగత అభయారణ్యంలో సంరక్షించబడ్డాయి",
      expressMore: "మరింత వ్యక్తం చేయండి"
    },
    voice: {
      tapToBegin: "ప్రారంభించడానికి మైక్రోఫోన్‌ను నొక్కండి",
      recording: "రికార్డింగ్...",
      speakFreely: "స్వేచ్ఛగా మాట్లాడండి, మీ స్వరం ముఖ్యమైనది",
      recordComplete: "రికార్డింగ్ పూర్తయింది",
      duration: "వ్యవధి:",
      staysPrivate: "మీ వాయిస్ రికార్డింగ్ ప్రైవేట్ మరియు సురక్షితంగా ఉంటుంది. మీ సమయం తీసుకోండి."
    },
    insight: {
      detectedEmotion: "గుర్తించబడిన భావోద్వేగం",
      gentleReflection: "సున్నితమైన ప్రతిబింబం",
      reflectingWords: "మీ మాటలపై ప్రతిబింబిస్తోంది...",
      understanding: "మీరు పంచుకున్నదాన్ని అర్థం చేసుకోవడానికి మరియు మెచ్చుకోవడానికి ఒక క్షణం",
      reminder: "గుర్తుంచుకోండి: ప్రతి భావన చెల్లుబాటు అయ్యేది మరియు తాత్కాలికమైనది. మీరు గొప్పగా చేస్తున్నారు. 🌱"
    },
    dashboard: {
      title: "మీ అంతర్గత తోట",
      subtitle: "కాలక్రమేణా మీ భావోద్వేగ ప్రకృతి దృశ్యం వికసించడాన్ని చూడండి",
      momentsCaptured: "సంగ్రహించిన క్షణాలు",
      writtenReflections: "వ్రాసిన ప్రతిబింబాలు",
      voiceExpressions: "స్వర వ్యక్తీకరణలు",
      allEntries: "అన్ని ఎంట్రీలు",
      textOnly: "టెక్స్ట్ మాత్రమే",
      voiceOnly: "వాయిస్ మాత్రమే",
      loading: "మీ జ్ఞాపకాలను లోడ్ చేస్తోంది...",
      noEntries: "మీ అభయారణ్యం మీ మొదటి ప్రతిబింబం కోసం వేచి ఉంది",
      noMatch: "ఈ ఫిల్టర్‌తో ఏ ఎంట్రీలు సరిపోలలేదు",
      beginJourney: "మీ ప్రయాణాన్ని ప్రారంభించండి",
      release: "విడుదల చేయండి",
      releaseConfirm: "మీరు ఈ ఎంట్రీని మీ అభయారణ్యం నుండి విడుదల చేయాలనుకుంటున్నారా?",
      written: "వ్రాసినది",
      spoken: "మాట్లాడినది",
      emotionalJourney: "మీ భావోద్వేగ ప్రయాణం",
      tracking: "ట్రాకింగ్"
    },
    insightPage: {
      backToGarden: "తోటకు తిరిగి వెళ్ళండి",
      reflectionFrom: "ప్రతిబింబం",
      writtenExpression: "వ్రాసిన వ్యక్తీకరణ",
      voiceExpression: "స్వర వ్యక్తీకరణ",
      yourWords: "మీ మాటలు",
      yourVoice: "మీ స్వరం",
      notFound: "ఈ ఎంట్రీ దూరమైపోయినట్లు కనిపిస్తోంది",
      returnToGarden: "తోటకు తిరిగి వెళ్ళండి",
      retrieving: "మీ ప్రతిబింబాన్ని తిరిగి పొందుతోంది...",
      capturedAt: "సంగ్రహించబడింది"
    },
    common: {
      error: "ఎంట్రీని విశ్లేషించడంలో విఫలమైంది. దయచేసి మళ్లీ ప్రయత్నించండి.",
      quotaError: "API కోటా మించిపోయింది. దయచేసి మీ క్రెడిట్‌లను తనిఖీ చేయండి.",
      authError: "చెల్లని API కీ. దయచేసి మీ కాన్ఫిగరేషన్‌ను తనిఖీ చేయండి."
    }
  },
  kn: {
    code: "kn",
    name: "ಕನ್ನಡ",
    flag: "🇮🇳",
    nav: {
      dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
      journal: "ಜರ್ನಲ್",
      tagline: "ನಿಮ್ಮ ಸುಂದರ ಮನಸ್ಸಿನ ಕಾಳಜಿ ವಹಿಸಿ"
    },
    journal: {
      title: "ನಿಮ್ಮ ಪವಿತ್ರ ಸ್ಥಳ",
      subtitle: "ನಿಮ್ಮ ಆಲೋಚನೆಗಳು ಮತ್ತು ಭಾವನೆಗಳನ್ನು ಹಂಚಿಕೊಳ್ಳಲು ಶಾಂತಿಯುತ ಸ್ಥಳ",
      privacy: "ಖಾಸಗಿ ಮತ್ತು ಗೌಪ್ಯ • ತೀರ್ಪು ಇಲ್ಲ • ನಿಮಗಾಗಿ ಮಾತ್ರ",
      writeMode: "ಬರೆಯಿರಿ",
      speakMode: "ಮಾತನಾಡಿ",
      shareThoughts: "ನಿಮ್ಮ ಮನಸ್ಸಿನಲ್ಲಿರುವುದನ್ನು ಹಂಚಿಕೊಳ್ಳಿ",
      noJudgement: "ಇದು ತೀರ್ಪು-ಮುಕ್ತ ಸ್ಥಳ, ನಿಮಗಾಗಿ ಮಾತ್ರ",
      letVoice: "ನಿಮ್ಮ ಧ್ವನಿಯನ್ನು ಕೇಳಲು ಅವಕಾಶ ನೀಡಿ",
      speakingEasier: "ಕೆಲವೊಮ್ಮೆ ಮಾತನಾಡುವುದು ಬರೆಯುವುದಕ್ಕಿಂತ ಸುಲಭವಾಗಿದೆ",
      placeholder: "ನನಗೆ ಅನಿಸುತ್ತಿದೆ...",
      reflectWords: "ನನ್ನ ಮಾತುಗಳನ್ನು ಪ್ರತಿಬಿಂಬಿಸಿ",
      reflectVoice: "ನನ್ನ ಧ್ವನಿಯನ್ನು ಪ್ರತಿಬಿಂಬಿಸಿ",
      reflecting: "ಪ್ರತಿಬಿಂಬಿಸುತ್ತಿದೆ...",
      listening: "ಕೇಳುತ್ತಿದೆ...",
      recordFirst: "ದಯವಿಟ್ಟು ಮೊದಲು ನಿಮ್ಮ ಧ್ವನಿಯನ್ನು ರೆಕಾರ್ಡ್ ಮಾಡಿ!",
      writeFirst: "ದಯವಿಟ್ಟು ಮೊದಲು ಏನನ್ನಾದರೂ ಬರೆಯಿರಿ!",
      saved: "ಸುರಕ್ಷಿತವಾಗಿ ಉಳಿಸಲಾಗಿದೆ",
      savedMessage: "ನಿಮ್ಮ ಆಲೋಚನೆಗಳನ್ನು ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಅಭಯಾರಣ್ಯದಲ್ಲಿ ಸಂರಕ್ಷಿಸಲಾಗಿದೆ",
      expressMore: "ಹೆಚ್ಚು ವ್ಯಕ್ತಪಡಿಸಿ"
    },
    voice: {
      tapToBegin: "ಪ್ರಾರಂಭಿಸಲು ಮೈಕ್ರೊಫೋನ್ ಅನ್ನು ಟ್ಯಾಪ್ ಮಾಡಿ",
      recording: "ರೆಕಾರ್ಡಿಂಗ್...",
      speakFreely: "ಮುಕ್ತವಾಗಿ ಮಾತನಾಡಿ, ನಿಮ್ಮ ಧ್ವನಿ ಮುಖ್ಯ",
      recordComplete: "ರೆಕಾರ್ಡಿಂಗ್ ಪೂರ್ಣಗೊಂಡಿದೆ",
      duration: "ಅವಧಿ:",
      staysPrivate: "ನಿಮ್ಮ ಧ್ವನಿ ರೆಕಾರ್ಡಿಂಗ್ ಖಾಸಗಿ ಮತ್ತು ಸುರಕ್ಷಿತವಾಗಿರುತ್ತದೆ. ನಿಮ್ಮ ಸಮಯವನ್ನು ತೆಗೆದುಕೊಳ್ಳಿ."
    },
    insight: {
      detectedEmotion: "ಪತ್ತೆಯಾದ ಭಾವನೆ",
      gentleReflection: "ಸೌಮ್ಯ ಪ್ರತಿಬಿಂಬ",
      reflectingWords: "ನಿಮ್ಮ ಮಾತುಗಳ ಬಗ್ಗೆ ಪ್ರತಿಬಿಂಬಿಸುತ್ತಿದೆ...",
      understanding: "ನೀವು ಹಂಚಿಕೊಂಡದ್ದನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಮತ್ತು ಮೆಚ್ಚಲು ಒಂದು ಕ್ಷಣ",
      reminder: "ನೆನಪಿಡಿ: ಪ್ರತಿಯೊಂದು ಭಾವನೆಯೂ ಮಾನ್ಯವಾಗಿದೆ ಮತ್ತು ತಾತ್ಕಾಲಿಕವಾಗಿದೆ. ನೀವು ಉತ್ತಮವಾಗಿ ಮಾಡುತ್ತಿದ್ದೀರಿ. 🌱"
    },
    dashboard: {
      title: "ನಿಮ್ಮ ಆಂತರಿಕ ತೋಟ",
      subtitle: "ಕಾಲಾನಂತರದಲ್ಲಿ ನಿಮ್ಮ ಭಾವನಾತ್ಮಕ ಭೂದೃಶ್ಯ ಅರಳುವುದನ್ನು ವೀಕ್ಷಿಸಿ",
      momentsCaptured: "ಸೆರೆಹಿಡಿದ ಕ್ಷಣಗಳು",
      writtenReflections: "ಬರೆದ ಪ್ರತಿಬಿಂಬಗಳು",
      voiceExpressions: "ಧ್ವನಿ ಅಭಿವ್ಯಕ್ತಿಗಳು",
      allEntries: "ಎಲ್ಲಾ ನಮೂದುಗಳು",
      textOnly: "ಪಠ್ಯ ಮಾತ್ರ",
      voiceOnly: "ಧ್ವನಿ ಮಾತ್ರ",
      loading: "ನಿಮ್ಮ ನೆನಪುಗಳನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",
      noEntries: "ನಿಮ್ಮ ಅಭಯಾರಣ್ಯವು ನಿಮ್ಮ ಮೊದಲ ಪ್ರತಿಬಿಂಬಕ್ಕಾಗಿ ಕಾಯುತ್ತಿದೆ",
      noMatch: "ಈ ಫಿಲ್ಟರ್‌ನೊಂದಿಗೆ ಯಾವುದೇ ನಮೂದುಗಳು ಹೊಂದಿಕೆಯಾಗುತ್ತಿಲ್ಲ",
      beginJourney: "ನಿಮ್ಮ ಪ್ರಯಾಣವನ್ನು ಪ್ರಾರಂಭಿಸಿ",
      release: "ಬಿಡುಗಡೆ ಮಾಡಿ",
      releaseConfirm: "ನೀವು ಈ ನಮೂದನ್ನು ನಿಮ್ಮ ಅಭಯಾರಣ್ಯದಿಂದ ಬಿಡುಗಡೆ ಮಾಡಲು ಖಚಿತವಾಗಿದ್ದೀರಾ?",
      written: "ಬರೆದಿದೆ",
      spoken: "ಮಾತನಾಡಿದೆ",
      emotionalJourney: "ನಿಮ್ಮ ಭಾವನಾತ್ಮಕ ಪ್ರಯಾಣ",
      tracking: "ಟ್ರ್ಯಾಕಿಂಗ್"
    },
    insightPage: {
      backToGarden: "ತೋಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",
      reflectionFrom: "ಪ್ರತಿಬಿಂಬ",
      writtenExpression: "ಬರೆದ ಅಭಿವ್ಯಕ್ತಿ",
      voiceExpression: "ಧ್ವನಿ ಅಭಿವ್ಯಕ್ತಿ",
      yourWords: "ನಿಮ್ಮ ಮಾತುಗಳು",
      yourVoice: "ನಿಮ್ಮ ಧ್ವನಿ",
      notFound: "ಈ ನಮೂದು ದೂರ ಹೋಗಿದೆ ಎಂದು ತೋರುತ್ತದೆ",
      returnToGarden: "ತೋಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",
      retrieving: "ನಿಮ್ಮ ಪ್ರತಿಬಿಂಬವನ್ನು ಮರಳಿ ಪಡೆಯುತ್ತಿದೆ...",
      capturedAt: "ಸೆರೆಹಿಡಿಯಲಾಗಿದೆ"
    },
    common: {
      error: "ನಮೂದನ್ನು ವಿಶ್ಲೇಷಿಸಲು ವಿಫಲವಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.",
      quotaError: "API ಕೋಟಾ ಮೀರಿದೆ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಕ್ರೆಡಿಟ್‌ಗಳನ್ನು ಪರಿಶೀಲಿಸಿ.",
      authError: "ಅಮಾನ್ಯ API ಕೀ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಕಾನ್ಫಿಗರೇಶನ್ ಪರಿಶೀಲಿಸಿ."
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // Load from localStorage or default to English
    const saved = localStorage.getItem("appLanguage");
    return saved || "en";
  });

  useEffect(() => {
    // Save to localStorage whenever language changes
    localStorage.setItem("appLanguage", currentLanguage);
  }, [currentLanguage]);

  const t = translations[currentLanguage];

  const changeLanguage = (langCode) => {
    if (translations[langCode]) {
      setCurrentLanguage(langCode);
    }
  };

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    availableLanguages: Object.values(translations),
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};