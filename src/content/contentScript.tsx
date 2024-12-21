
chrome.runtime.onMessage.addListener( // sent the total block count when asked by popupview
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
      "from a content script:" + sender.tab.url :
      "from the extension");
    if (request.greeting === "getBlockCount") {
      var notetakerblocks = document.querySelectorAll('.textBlockDiv')
      let notetakerblocksCount: number = notetakerblocks.length;
      sendResponse({ reply: notetakerblocksCount });
    }

    // if (request.action === "chat") {
    //
    //   chrome.runtime.sendMessage('get-model', (res) => {
    //     console.log("got model")
    //     async function run() {
    //       // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    //       const model = res.getGenerativeModel({ model: "gemini-1.5-flash" });
    //
    //       const prompt = "Write a story about a magic backpack."
    //
    //       const result = await model.generateContent(prompt);
    //       const response = await result.response;
    //       const text = response.text();
    //       console.log(text);
    //       return text
    //     }
    //     sendResponse({ reply: run() });
    //   });
    // };


  });





export { }
