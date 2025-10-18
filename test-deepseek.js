// Test DeepSeek API directly
const DEEPSEEK_API_KEY = "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";
const DEEPSEEK_API_URL = "https://api.deepseek.com/v1/chat/completions";

async function testDeepSeek() {
  try {
    console.log("Testing DeepSeek API...");
    
    const prompt = `You are a creative business consultant who understands both English and Roman Urdu.
Analyze this business idea: "main shoes ka business karna chahta hun"

Return ONLY this JSON format:
{
  "option1": {"name": "Name 1", "tagline": "Tagline 1"},
  "option2": {"name": "Name 2", "tagline": "Tagline 2"},
  "option3": {"name": "Name 3", "tagline": "Tagline 3"},
  "pitch": "2 sentence pitch",
  "audience": "Who will buy this",
  "landingText": "1 sentence reason"
}`;

    const response = await fetch(DEEPSEEK_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${DEEPSEEK_API_KEY}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      })
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error:", errorText);
      throw new Error(`DeepSeek API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log("✅ DeepSeek API Response:", JSON.stringify(data, null, 2));

    const text = data.choices[0].message.content;
    console.log("✅ AI Generated Text:", text);

    // Try to parse JSON
    try {
      const cleanText = text.replace(/```json|```/g, "").trim();
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
      const finalJson = jsonMatch ? jsonMatch[0] : cleanText;
      
      const parsedData = JSON.parse(finalJson);
      console.log("✅ Parsed JSON:", JSON.stringify(parsedData, null, 2));
    } catch (parseError) {
      console.error("❌ JSON Parse Error:", parseError);
    }

  } catch (error) {
    console.error("❌ Test Error:", error);
  }
}

testDeepSeek();
