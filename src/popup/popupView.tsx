import React, { useState } from 'react';
import addTypingBox from '../content/addTypingBox';
import removeBoxes from '../content/removeTypingBox';
import saveWebPage from '../content/saveWebPage'

const Popup = () => {

    const [annotate, setAnnotate] = useState(false)
    //let [blockCount, setBlockCount] = useState(0)


    const onClick = async () => {
        setAnnotate(!annotate)
        let [tab] = await chrome.tabs.query({ active: true });
        //var port = chrome.tabs.connect(tab.id!);
        if (!annotate) {
            const response = await chrome.tabs.sendMessage(tab.id!, { greeting: "getBlockCount" });
            //setBlockCount(response['reply'])

            chrome.scripting.executeScript({
                target: { tabId: tab.id!, allFrames: true },
                func: (a: number) => { addTypingBox(a) },
                args: [response['reply']]
            })
        }

    }

    const savePage = () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const currentTabId = tabs[0].id;

            if (currentTabId) {
                chrome.scripting.executeScript({
                    target: { tabId: currentTabId },
                    func: () => window.print()
                }, () => {
                    console.log('Print command executed');
                });
            }
        });
    }

    return (
        <div className="App">
            <button onClick={onClick}>Add Text Box</button>
            <button onClick={savePage}>Save Page</button>
        </div>
    );
};

export default Popup;
