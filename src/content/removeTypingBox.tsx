const removeBoxes = () => {
    var noteBlock: any = document.getElementById("notetakerh1")
    noteBlock.parentNode.removeChild(noteBlock)
    console.log(noteBlock)
}

export default removeBoxes

