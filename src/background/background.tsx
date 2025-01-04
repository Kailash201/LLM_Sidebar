import { marked } from "marked";

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate, MessagesPlaceholder } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { HumanMessage } from "@langchain/core/messages";


let chat_history = [] as any

async function run(
		modelType: string,
		model: string,
		apiKey: string,
		query: string, 
		context: [string], 
		sendResponse: any
	) {

	let llm = modelType === "Gemini" ?
			new ChatGoogleGenerativeAI({
				model: model,
				temperature: 0,
				apiKey: apiKey,
			}) :
			new ChatOpenAI({
				model: model,
				temperature: 0,
				apiKey: apiKey,
			})
			
	
	const systemPrompt = `
		You are a helpful AI assistant that improves the user's experience in web browsing.
		Users will select texts from a website, that user needs help on. Like explaining it more,
		or summarizing it or other tasks the user needs. Your job is to follow the user instruction,
		be helpful and make the user life easier.

		The texts from the website: {context}
		`
	
	
	const template = ChatPromptTemplate.fromMessages([
		['system', systemPrompt],
		new MessagesPlaceholder("chat_history"),
		["human", "User instruction: {query}"]
	])

	const chain = template.pipe(llm).pipe(new StringOutputParser())

	const res = await chain.invoke(
		{
			context: context,
			chat_history: chat_history,
			query: query
		}
	)

	chat_history.push(new HumanMessage(query))
	chat_history.push(res)

	console.log(chat_history)
	const md = marked.parse(res)
	sendResponse({md})
}


chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		console.log(sender.tab ?
			"from a background:" + sender.tab.url :
			"from the extension");
		if (request.type === "user-query") {
			console.log("received")
			console.log(request.query)
			run(request.modelType, 
				request.model, 
				request.apiKey, 
				request.query, 
				request.kb, 
				sendResponse);
			return true
		}
	}

)

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
	if (changeInfo.status === 'complete' && tab.active) {
		chat_history = [];
	  }
})


export { }
