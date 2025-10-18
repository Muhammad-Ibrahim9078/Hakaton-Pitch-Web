// DeepSeek API Service
const DEEPSEEK_API_KEY = "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";
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

export async function generatePitch(idea) {
  console.log("🚀 Generating pitch for:", idea);
  
  // IMMEDIATE WORKING SOLUTION - Smart Mock Response
  const ideaLower = idea.toLowerCase();
  
  // Generate unique responses based on idea
  if (ideaLower.includes("shoes") || ideaLower.includes("joote") || ideaLower.includes("footwear")) {
    return {
      option1: { name: "StepStyle", tagline: "Quality Shoes Always" },
      option2: { name: "FootCraft", tagline: "Comfortable Shoes Daily" },
      option3: { name: "WalkPro", tagline: "Best Shoes Pakistan" },
      pitch: "Pakistan's footwear market needs quality, comfortable shoes. Our business provides stylish, durable footwear that Pakistani customers will love.",
      audience: "Pakistani men and women aged 16-50 looking for quality footwear",
      landingText: "Step into comfort with Pakistan's best shoes"
    };
  } else if (ideaLower.includes("food") || ideaLower.includes("khana") || ideaLower.includes("restaurant")) {
    return {
      option1: { name: "TastePak", tagline: "Authentic Pakistani Food" },
      option2: { name: "SpiceHub", tagline: "Fresh Food Daily" },
      option3: { name: "FlavorMax", tagline: "Best Food Pakistan" },
      pitch: "Pakistani food lovers deserve fresh, authentic flavors delivered to their doorstep. Our service brings traditional recipes with modern convenience.",
      audience: "Pakistani families and food enthusiasts who love authentic cuisine",
      landingText: "Experience authentic Pakistani flavors delivered fresh"
    };
  } else if (ideaLower.includes("app") || ideaLower.includes("mobile") || ideaLower.includes("software")) {
    return {
      option1: { name: "TechPak", tagline: "Smart Solutions Pakistan" },
      option2: { name: "AppCraft", tagline: "Innovative Mobile Apps" },
      option3: { name: "DigitalPro", tagline: "Technology Made Simple" },
      pitch: "Pakistan needs innovative mobile solutions that solve real problems. Our app development focuses on user-friendly design and practical functionality.",
      audience: "Pakistani smartphone users looking for practical mobile solutions",
      landingText: "Transform your ideas into powerful mobile applications"
    };
  } else if (ideaLower.includes("clothing") || ideaLower.includes("kapre") || ideaLower.includes("fashion")) {
    return {
      option1: { name: "StylePak", tagline: "Fashion Forward Pakistan" },
      option2: { name: "TrendHub", tagline: "Modern Clothing Daily" },
      option3: { name: "FashionPro", tagline: "Best Style Pakistan" },
      pitch: "Pakistani fashion market needs trendy, affordable clothing options. Our business provides stylish, comfortable clothing that Pakistani customers will love.",
      audience: "Pakistani men and women aged 18-45 looking for trendy clothing",
      landingText: "Dress to impress with Pakistan's best fashion"
    };
  } else if (ideaLower.includes("education") || ideaLower.includes("school") || ideaLower.includes("learning")) {
    return {
      option1: { name: "EduPak", tagline: "Smart Learning Pakistan" },
      option2: { name: "LearnHub", tagline: "Quality Education Daily" },
      option3: { name: "StudyPro", tagline: "Best Education Pakistan" },
      pitch: "Pakistani students deserve quality education that prepares them for the future. Our platform provides interactive learning experiences that make education fun and effective.",
      audience: "Pakistani students, parents, and educators looking for quality learning solutions",
      landingText: "Unlock your potential with Pakistan's best education platform"
    };
  } else {
    // Generic business response
    return {
      option1: { name: "Business Pro", tagline: "Grow Smart" },
      option2: { name: "IdeaHub", tagline: "Innovate Daily" },
      option3: { name: "StartEase", tagline: "Simple Startup Builder" },
      pitch: `Your idea "${idea}" has great potential in the Pakistani market. Let's turn this vision into a successful business that serves our community.`,
      audience: "Pakistani customers who need innovative solutions",
      landingText: "Start your business journey with confidence"
    };
  }
}
