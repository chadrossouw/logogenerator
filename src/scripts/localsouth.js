import { saveAs } from 'file-saver';

const localsouth = () =>{
    let logos = {
        "thick":document.querySelector('#thick_logo'),
        "thin":document.querySelector('#thin_logo'),
    }
    let currentLogo = logos.thin;
    const buttons = document.querySelectorAll('.buttons button');
    const main = document.querySelector('.main');
    const dropZones = document.querySelectorAll('.drop_zones div');
    const icons = document.querySelectorAll('.icons');
    const download = document.querySelector('.download');

    /*Switch between thick and thin style*/
    buttons.forEach(button=>button.addEventListener('click',(e)=>{
        let className = e.currentTarget.id;
        main.classList.remove('thick');
        main.classList.remove('thin');
        main.classList.add(className); 
        currentLogo = logos[className];
        calculateDropZones();
        removeZoneListeners();
        addZoneListeners();
    }));

    /*Download Buttons event listener*/
    download.addEventListener('click',(e)=>{
        const tempDiv = document.createElement("div");
        const svgClone = currentLogo.cloneNode(true);
        tempDiv.appendChild(svgClone);
        const svgXML = tempDiv.innerHTML;
        if(e.target.id=='svg'){
            const blob = new Blob([svgXML], {type: "image/svg+xml"});
            saveAs(blob, "ls_logo.svg");
            tempDiv.remove();
        }
        else{
            const canvas = document.createElement( "canvas" );
            const bbox = currentLogo.getBBox();
            canvas.width = bbox.width;
            canvas.height = bbox.height;
            const ctx = canvas.getContext( "2d" );
            ctx.fillStyle = "#fff";
            ctx.fillRect(0, 0, bbox.width, bbox.height);
            const img = document.createElement( "img" );
            img.setAttribute( "src", "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgXML))) );
            img.onload = ()=>{
                ctx.drawImage( img, 0, 0 );
                canvas.toBlob((blob)=>{
                    saveAs(blob, `ls_logo.${e.target.id}`);
                },`image/${e.target.id}`);
            };
            img.remove();
            canvas.remove();
        }
    })
    
    /*Dragstart listener on icons*/
    icons.forEach(icon=>icon.addEventListener('dragstart',(e)=>{
        let nodeString;
        if(currentLogo.id == "thin_logo"){
            nodeString = e.target.querySelector('.icon_thin .path').innerHTML
        }
        else{
            nodeString = e.target.querySelector('.icon_thick .path').innerHTML
        }
        e.dataTransfer.setData("text/plain", nodeString);
        e.dataTransfer.effectAllowed = "link";
    }))

    /*Drop Zone Sizing*/
    const calculateDropZones = () =>{
        let logoActualDimensions = currentLogo.getBoundingClientRect();
        let logoSVGDimensions = currentLogo.viewBox.baseVal;
        let ratio = logoActualDimensions.width / logoSVGDimensions.width;
        dropZones.forEach(zone=>{
            zone.boxName = zone.dataset.zone;
            zone.box = currentLogo.querySelector(`#${zone.boxName}`);
            zone.style.top = `${zone.box.dataset.y * ratio}px`;
            zone.style.left = `${zone.box.dataset.x * ratio}px`;
            zone.style.width = `${zone.box.dataset.d * ratio}px`;
            zone.style.height = `${zone.box.dataset.d * ratio}px`;
        });
    }
    /*Drop Zone listeners*/
    const addZoneListeners = ()=>{
        dropZones.forEach(zone=>{
            
            zone.addEventListener("dragenter", zoneDragEnter);
            zone.addEventListener("dragleave", zoneDragLeave);
            zone.addEventListener("dragover", zoneDragOver);
            zone.addEventListener("drop", zoneDrop);
            zone.addEventListener("click",zoneClick);
        
        });
    }
    
    const removeZoneListeners = ()=>{
        dropZones.forEach(zone=>{
            
            zone.removeEventListener("dragenter", zoneDragEnter);
            zone.removeEventListener("dragleave", zoneDragLeave);
            zone.removeEventListener("dragover", zoneDragOver);
            zone.removeEventListener("drop", zoneDrop);
            zone.removeEventListener("click",zoneClick);
        
        });
    }

    /*Listener Functions*/
    const zoneDragEnter = (event) => {
        event.preventDefault();
        event.target.classList.add('outline');
    }

    const zoneDragLeave = (event) => {
        event.preventDefault();
        event.target.classList.remove('outline');
    }

    const zoneDragOver = (event) => {
        event.preventDefault();
    }

    const zoneDrop = (e)=>{
        let box = e.target.box;
        let data = e.dataTransfer.getData("text/plain");
        box.innerHTML = `<g transform="translate(${box.dataset.x} ${box.dataset.y}) scale(${box.dataset.d/200})" style="stroke:${box.dataset.d/200>1?'#fff':'#101a2e'}; stroke-width:${box.dataset.d/200}px;">${data}</g>`;
        e.target.classList.add('filled');
        e.target.classList.remove('outline');
    }

    const zoneClick = (e)=>{
        if(!e.target.classList.contains('filled')) return;
        let box = e.target.box;
        box.innerHTML='';
        e.target.classList.remove('filled');
    }


    calculateDropZones();
    addZoneListeners();
    window.addEventListener('resize',()=>{
        clearTimeout(window.resizedFinished);
        window.resizedFinished = setTimeout(()=>{
            calculateDropZones();
        }, 250); 
    })


}
export default localsouth;