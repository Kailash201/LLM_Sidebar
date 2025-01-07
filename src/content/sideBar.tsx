const selectedText = (): string => {
    var selectedText: string = "";
    if (window.getSelection) { // For modern browsers
        selectedText = window.getSelection()!.toString();
    } else if ((document as any).selection && (document as any).selection.type != "Control") { // For older versions of IE
        selectedText = (document as any).selection.createRange().text;
    }
    return selectedText;
}


const createUserTbElement = (userText: string) => {
    const tb = document.createElement('div')
    tb.className = "userBox"
    tb.innerText = userText
    return tb
}

const addSidebar = () => {
    const knowledgeDb: string[]= []
    const navbarstyle = `
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

    body {
        margin-right: 30%; /* Shift content to the right */
        transition: margin-left 0.3s ease; /* Smooth transition */
        font-family: 'Roboto', sans-serif;
        height: 100%
    }

    div::-webkit-scrollbar {
        width: 7px;               
        height: 7px;
    }

    div::-webkit-scrollbar-track {
        background: rgb(36, 0, 32);  
    }

    div::-webkit-scrollbar-thumb {
        background-color: #e6e1dd;
        border-radius: 20px;      
    }

    .main {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 30%;
        background-color:rgb(36, 0, 32);
        position: fixed;
        top: 0;
        right: 0;
        z-index: 1000;
        padding: 0.5em;
        gap: 0.5em
    }
    
    #cards {
        display: flex;
        gap: 0.5em;
        flex-wrap: wrap;
    }

    .card {
        width: 10em;
        height: 7em;
        background-color: #decbc3;
        overflow: hidden; 
        text-overflow: ellipsis;
        display: -webkit-box; /* Create a flexbox for the content */
        -webkit-box-orient: vertical; /* Set orientation to vertical */
        border-radius: 10px;
        padding: 0.3em;
        font-size: small;
    }

    #dialogs {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }
    
    .userBox {
        width: 85%;
        background-color: #decbc3;
        word-wrap: break-word;
        border-radius: 10px;
        padding: 0.3em;
        font-size: small;
        align-self: flex-start;

    }

    .botBox {
        width: 85%;
        background-color: #decbc3;
        word-wrap: break-word;
        border-radius: 10px;
        padding: 0.3em;
        font-size: small;
        align-self: flex-end;
    }

    .chatbox {
        resize: none;
        border-radius: 10px;
        outline: none;
        height: 15%;
        width: 100%;
        margin-top: auto;
        margin-bottom: 1em;
        background-color: #decbc3;
        border: none;
        padding: 1em;
    }
    
    .sec0 {
        display: flex;
        height: 10%;
        justify-content: space-between;
        gap: 0.5em;
        width: 100%;
        align-items: center;
    }

    .sec1 {
        min-height:25%;
        max-height:25%;
        overflow-y: auto;
    }

    .sec2 {
        min-height: 60%;
        max-height: 60%;
        overflow-y: auto;
    }

    .input {
        width: 30%;
        border-radius: 10px;
        height: 2em;
        background-color: #decbc3;
        border: none;
        padding-left: 0.5em;

    }

    #models {
        position:relative;
        background-color: #decbc3;
        z-index: 10000000;
        height: auto;
        width: auto;
        padding: 1em;
        border-radius: 10px;
        display: none;
        flex-direction: column;
    }

    .modelMain {
        display: flex;
        flex-direction: column;
        height: auto;
        width: auto;
    }

    .point {
        cursor: pointer;
    }

    h4 {
        color: #e6e1dd
    }
    `

    //inject css
    const styleSheet = document.createElement("style")
    styleSheet.appendChild(document.createTextNode(navbarstyle))
    document.head.appendChild(styleSheet)

    // create navbar and inject to body
    const navbar = document.createElement("div")
    navbar.className = "main"; 
    navbar.innerHTML = `
        <div class="sec0">
            <div class="modelMain">
                <h4 class="point" id="modelType">Gemini</h4>
                <div class="models" id="models">
                    <p class="point" id="Gemini">Gemini</p>
                    <p class="point" id="OpenAi">OpenAi</p>
                </div>
            </div>
            <input class='input' id="model" placeholder="Model Name">
            <input class='input' id="apiKey" placeholder="API Key">
        </div>
        <div class="sec1">
            <h4>Collected Knowledge</h4>
            <div id="cards"></div>
        </div>
        <div class="sec2">
            <h4>Dialogs</h4>
            <div id="dialogs"></div>
        </div>
        <textarea id="chatbox" type="text" class="chatbox" placeholder="Enter Message Here"/></textarea>
    `;

    document.body.appendChild(navbar);

    document.addEventListener('mouseup', () => {
        const userText = selectedText().trim()
       
        console.log(userText)
        if (userText) {
            knowledgeDb.push(userText)
        }

        const knowContainer = document.getElementById('cards')
        knowContainer!.innerHTML = ``
        knowledgeDb.map((each: string) => {
            const card = document.createElement('div')
            const textHtml = document.createElement('p')
            card.appendChild(textHtml)
            card.className = 'card'
            textHtml.innerText = each
            knowContainer?.appendChild(card)
        })
      
    })

    ////////// HANDLING CHANGE IN MODEL ////////////////////
    const model = document.getElementById("modelType")
    const modelSelector = document.getElementById('models')
    model?.addEventListener('click', function() {
        modelSelector!.style.display = "flex"
    })

    const modelSelected = (e: any) => {
        model!.innerText = e.target.id
        modelSelector!.style.display = "none"
    }
    const gemini = document.getElementById('Gemini')
    const openAI = document.getElementById('OpenAi')
    gemini?.addEventListener('click', (event) => modelSelected(event))
    openAI?.addEventListener('click', (event) => modelSelected(event))

    ///////// HANDLING USER QUERIES ///////////////////////
    const chatbox = document.getElementById("chatbox") as HTMLTextAreaElement | null;
    //handle enter
    chatbox!.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault()
            console.log(chatbox)
            const userQuery = chatbox!.value
            chatbox!.value = ""
            console.log(userQuery)
            // chrome.runtime.sendMessage("user-query", (res) => {
            //     console.log(res.text)
            // });
            const dialogs = document.getElementById('dialogs')
            const userBox = createUserTbElement(userQuery)
            const modelType = (document.getElementById('modelType') as HTMLInputElement).innerText
            const model = (document.getElementById('model') as HTMLInputElement).value
            const apiKey = (document.getElementById('apiKey') as HTMLInputElement).value
            dialogs?.insertAdjacentElement("beforeend", userBox)
            chrome.runtime.sendMessage(
                {   
                    type: 'user-query',
                    query: userQuery,
                    modelType: modelType,
                    model: model,
                    apiKey: apiKey,
                    kb: knowledgeDb
                },
                (res) => {
                     console.log(res)
                     const dialogs = document.getElementById('dialogs')
                     const createBotTbElement = (userText: string) => {
                        const tb = document.createElement('div')
                        tb.className = "botBox"
                        tb.innerHTML = userText
                        return tb
                    }
                     const botBox = createBotTbElement(res.md)
                     dialogs?.insertAdjacentElement("beforeend", botBox)
                }
            );
            
        }
    })

}

export default addSidebar