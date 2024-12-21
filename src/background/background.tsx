const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyBkLwxYev4XNsZ4KjZZR4iZZVPVNKIQwSY");

// ...

// The Gemini 1.5 models are versatile and work with most use cases
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
// const prompt = "Write a story about a magic backpack."

async function run(sendResponse: any) {
	// The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
	const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

	const prompt = "Write a story about a magic backpack."

	const result = await model.generateContent(prompt);
	const response = await result.response;
	const text = response.text();

	sendResponse({ text });
}

// run();
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log(sender.tab ?
			"from a background:" + sender.tab.url :
			"from the extension");
		if (request === "get-model") {
			console.log("received")
			run(sendResponse);
			return true
		}
	}

)


export { }
