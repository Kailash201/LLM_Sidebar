const addSidebar = () => {
    const navbarstyle = `
    .main {
        display: flex;
        flex-direction: column;
        height: 100%;
        width: 20em;
        background-color: #FFFBE9;
        position: fixed;
        top: 0;
        right: 0;
        z-index: 1000;
    }
    body {
        margin-right: 20em; /* Shift content to the right */
        transition: margin-left 0.3s ease; /* Smooth transition */
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
        <a href="#home">Home</a>
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
    `;

    document.body.appendChild(navbar);

}

export default addSidebar