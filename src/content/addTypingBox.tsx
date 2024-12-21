import ReactDOM from "react-dom";

const addTypingBox = (count: number) => {

    const selectedText = (): string => {
        var selectedText: string = "";
        if (window.getSelection) { // For modern browsers
            selectedText = window.getSelection()!.toString();
        } else if ((document as any).selection && (document as any).selection.type != "Control") { // For older versions of IE
            selectedText = (document as any).selection.createRange().text;
        }
        return selectedText;
    }

    const findElementContainingSelectedText = (selectedText: string): HTMLElement | null => {
        const range = window.getSelection()?.getRangeAt(0);
        if (range) {
            let node: Node | null = range.commonAncestorContainer;
            while (node) {
                if (node.nodeType === Node.ELEMENT_NODE && node.textContent?.includes(selectedText)) {
                    return node as HTMLElement;
                }
                node = node.parentNode;
            }

            // Keep searching until it reaches the top of the DOM tree
            let nextParent: HTMLElement | null = range.commonAncestorContainer.parentElement;
            while (nextParent) {
                if (nextParent.textContent?.includes(selectedText)) {
                    // nextParent.innerHTML = nextParent.innerHTML.replace(selectedText, '<span style="color:red;">${selected}</span>')
                    return nextParent;
                }
                nextParent = nextParent.parentElement;
            }
        }
        return null;
    };

    const blockStyle = `
    .textBlockDiv {
        display: flex;
        flex-direction: column;
        width: 35em;
        box-sizing: border-box;
        padding-left: 20px;
        padding-right: 20px;
        padding-bottom: 10px;
        border: 1px solid #CCC;
        margin-top: 0px;
        margin-bottom: 5px;
        background-color: #FFFBE9;
        border-radius: 10px;
    }
    
    .topLayer {
        display: flex;
        justify-content: space-between;
        padding-top: 4px;
        height: 100%;
    }
    
    .textBlockInput {
        width: calc(100% - 40px); /* Adjust for padding */
        max-width: 100%;
        min-height: 25mm;
        padding: 10px;
        border-radius: 20px;
        border: 3px solid #AD8B73;
        resize: none;
    }

    .blockTitle {
        color: #AD8B73;
        font-size: 16px;
        max-width: 80%;
        max-height: 20px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    
    .but {
        max-width: 20%;
        background-color: #CD8D7A;
        border: 0px solid #AD8B73;
        border-radius: 25px;
        width: 12mm;
        height: 6mm;
        margin-top: 10px;
        
    }`

    const saveText = (textarea: HTMLTextAreaElement) => {
        console.log(textarea.value)
    }

    const styleSheet = document.createElement("style")
    styleSheet.appendChild(document.createTextNode(blockStyle))
    document.head.appendChild(styleSheet)

    const block = document.createElement("div")
    block.classList.add("textBlockDiv")
    block.id = count.toString() //unique id for each block
    block.innerHTML = ` 
    <div class="topLayer">
        <p class="blockTitle">Notes for '${selectedText()}'</p>
        <button class="but" type="button">D</button>
    </div>
    <textarea class="textBlockInput" id=${block.id}"
    placeholder="Enter your notes..."></textarea>
    <button class="sBut" id="sendPrompt" type="button">S</button>
    `
    const but: HTMLButtonElement = block.querySelector('#sendPrompt')!
    const tA: HTMLTextAreaElement = block.querySelector('.textBlockInput')!
    but.onclick = function() {
        // console.log("Saved:", tA.value)
        // chrome.storage.local.set({ ['userInput_' + tA.id]: tA.value });
        const text = tA.value
        chrome.runtime.sendMessage("get-model", (res) => {
            tA.value = res.text
            console.log(res.text)
        });
    }
             
    tA.addEventListener('input', function() {
        console.log("Current user input at tA.id:" + tA.id.toString(), tA.value)
    })

    const text = selectedText()
    const element = findElementContainingSelectedText(text)
    console.log(text)
    if (element !== null) {
        const html = element.innerHTML;
        console.log(html)
        const highlightedHTML = html.replace(
            text,
            `<span style="background-color: yellow;">${text}</span>`
        );
        element.innerHTML = highlightedHTML;
        element.insertAdjacentElement("afterend", block)
        console.log("before")
    }
    else {
        alert("cannot find")

    }

}

export default addTypingBox
