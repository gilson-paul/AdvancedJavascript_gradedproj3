function addCPM() {
    let string = document.getElementById('typeText').value;

    let wceta = document.getElementById('WCETA');
    
    let box = document.createElement('div');
    box.setAttribute("class", "box");

    let para = document.createElement('p');
    para.innerHTML = "CPM";
    para.setAttribute("class", "boxHeading");

    let numCPM = document.createElement('div');
    numCPM.setAttribute("class", "boxInner");

    let boxInner = document.createElement('span');
    boxInner.setAttribute("id", "cpm");
    boxInner.innerHTML = string.length;
    
    numCPM.appendChild(boxInner);

    box.appendChild(para);
    box.appendChild(numCPM);

    wceta.insertBefore(box, wceta.firstChild);
}

function addWPM() {
    let string = document.getElementById('typeText').value;

    let wceta = document.getElementById('WCETA');
    
    let box = document.createElement('div');
    box.setAttribute("class", "box");

    let para = document.createElement('p');
    para.innerHTML = "WPM";
    para.setAttribute("class", "boxHeading");

    let numWPM = document.createElement('div');
    numWPM.setAttribute("class", "boxInner");

    let boxInner = document.createElement('span');
    boxInner.setAttribute("id", "wpm");
    boxInner.innerHTML = string.split(' ').length;

    numWPM.appendChild(boxInner);
    
    box.appendChild(para);
    box.appendChild(numWPM);

    wceta.insertBefore(box, wceta.firstChild);

    if(document.getElementById('typeText').value == "") {
        document.getElementById('wpm').innerText = 0;
    }
}

function restartTest() {
    document.getElementById('WCETA').children[0].remove();
    document.getElementById('WCETA').children[0].remove();
    document.getElementById('restartContainer').remove();
    document.getElementById('instruction').innerText = "Click on the area below to start the game.";
    document.getElementById('typeText').value = "";
    document.getElementById('typeText').disabled = false;

    document.getElementById('err').innerText = 0;
    document.getElementById('time').innerText = 60;
    document.getElementById('acc').innerText = 100;
}

function addRestart() {
    let container = document.getElementById('container');

    let restartContainer = document.createElement('div');
    restartContainer.setAttribute('id', 'restartContainer');

    let restartbutton = document.createElement('button');
    restartbutton.setAttribute('id', 'restartbutton');
    restartbutton.innerText = "Restart";
    restartbutton.onclick = restartTest;

    restartContainer.appendChild(restartbutton);

    container.appendChild(restartContainer);
}

function timeOver() {
    errorAcc();
    
    document.getElementById('instruction').innerText = "Time's Over! Click on restart to start a new game.";
   
    document.getElementById('typeText').disabled = true;
    
    addCPM();
    addWPM();

    addRestart();
}

function decrTime() {
    document.getElementById('time').innerText -= 1;
    if(document.getElementById('time').innerText == 0) {
        clearInterval(window.myInterval);
        delete window.myInterval;
        timeOver();
    }
}

function replaceAt(str, index, replacement) {
    if(document.getElementById('instruction').innerText.replace(/(\r\n|\n|\r)/gm, "")[index+1] == " " &&
        document.getElementById('instruction').innerText.replace(/(\r\n|\n|\r)/gm, "")[index-1] == " ") {
            return str.substring(0, index).trim() + replacement + str.substring(index+1).trim();
    } else if(document.getElementById('instruction').innerText.replace(/(\r\n|\n|\r)/gm, "")[index+1] == " ") {
        return str.substring(0, index) + replacement + str.substring(index+1).trim();
    } else if(document.getElementById('instruction').innerText.replace(/(\r\n|\n|\r)/gm, "")[index-1] == " ") {
        return str.substring(0, index).trim() + replacement + str.substring(index+1);
    }
    return str.substring(0, index) + replacement + str.substring(index+1);
}

function mark_character_red(index) {
    let htmlText = document.getElementById('instruction').innerHTML;
    console.log("htmlText="+htmlText);
    
    let spanInd = [];
    
    let loopTimes = 0;
    if(htmlText.indexOf("span") != -1) {
        loopTimes = (htmlText.match(/span/g).length)/2;
    }

    htmlText = htmlText.replace(/\&nbsp;/g, " ");
    for(let i = 0; i < loopTimes; ++i) {
        spanInd.push(htmlText.indexOf('<span class="errorRed">'));
        htmlText = htmlText.replace('<span class="errorRed">',"");
        htmlText = htmlText.replace("</span>","");
    }
    
    spanInd.push(index);
    console.log("htmlText="+htmlText);
    console.log("spanInd="+spanInd);

    let textText = document.getElementById('instruction').innerText.replace(/(\r\n|\n|\r)/gm, "");
    console.log("textText="+textText);
    let rep = "";
    for(i = 0; i < loopTimes + 1; ++i) {
        
        if(document.getElementById('instruction').innerText.replace(/(\r\n|\n|\r)/gm, "")[spanInd[loopTimes-i]+1] == " " &&
        document.getElementById('instruction').innerText.replace(/(\r\n|\n|\r)/gm, "")[spanInd[loopTimes-i]-1] == " ") {
            rep = `&nbsp;<span class="errorRed">${textText[spanInd[loopTimes-i]]}</span>&nbsp;`;
        } else if(document.getElementById('instruction').innerText.replace(/(\r\n|\n|\r)/gm, "")[spanInd[loopTimes-i]+1] == " ") {
            rep = `<span class="errorRed">${textText[spanInd[loopTimes-i]]}</span>&nbsp;`;
        } else if(document.getElementById('instruction').innerText.replace(/(\r\n|\n|\r)/gm, "")[spanInd[loopTimes-i]-1] == " ") {
            rep = `&nbsp;<span class="errorRed">${textText[spanInd[loopTimes-i]]}</span>`;
        } else {
            rep = `<span class="errorRed">${textText[spanInd[loopTimes-i]]}</span>`;
        }
        
        textText = replaceAt(textText, spanInd[loopTimes-i], rep);
        console.log("spanInd[loopTimes-i]="+spanInd[loopTimes-i]+"...textText="+textText);
    }
    console.log("textText="+textText);

    document.getElementById('instruction').innerHTML = textText;
    console.log(document.getElementById('instruction').innerHTML);
    console.log(document.getElementById('instruction').innerText);
    console.log("__________________________________________________");
}

function errorAcc(cha) {
    let lengthDiff = document.getElementById('instruction').innerText.length - document.getElementById('typeText').value.length;
    
    if(typeof window.myInterval == "undefined") {
        document.getElementById('err').innerText = parseInt(document.getElementById('err').innerText) + lengthDiff;
    } else {
        if(cha.inputType == 'deleteContentBackward') {
            return;
        }

        let index = document.getElementById('typeText').value.length - 1;
        let typedCh = document.getElementById('typeText').value[index];
        
        let htmlText = document.getElementById('instruction').innerHTML;
        let loopTimes = 0;
        if(htmlText.indexOf("span") != -1) {
            loopTimes = (htmlText.match(/span/g).length)/2;
        }
        for(let i = 0; i < loopTimes; ++i) {
            htmlText = htmlText.replace('<span class="errorRed">',"");
            htmlText = htmlText.replace("</span>","");
        }
        htmlText = htmlText.replace(/\&nbsp;/g, " ");
        //let actualCh = document.getElementById('instruction').innerText.replace(/(\r\n|\n|\r)/gm, "")[index];
        let actualCh = htmlText[index];

        if(typedCh != actualCh) {
            document.getElementById('err').innerText = parseInt(document.getElementById('err').innerText) + 1;
            if(actualCh != " " && window.paintedRedOrNot[index] == 0) {
                mark_character_red(index);
                window.paintedRedOrNot[index] = 1;
            }
        }
    }

    let accNum = document.getElementById('acc');
    accNum.innerText = ((1 - parseInt(document.getElementById('err').innerText)/document.getElementById('instruction').innerText.length)*100).toFixed();
}

function addEventListeners() {
    document.getElementById('typeText').addEventListener('input', errorAcc);
}

function startedTyping() {
    addEventListeners();
    document.getElementById('instruction').innerText = "Journey of thousand miles begins with a single step means that big achievements are made through small concrete resolves. Dreams and life goals are achieved by making a path plan and taking the first step towards it.";
    
    let inputMaxLength = document.getElementById('instruction').innerText.length;
    document.getElementById('typeText').maxLength = inputMaxLength;
    window.paintedRedOrNot = [];
    while(inputMaxLength--) window.paintedRedOrNot.push(0);
    
    window.myInterval = setInterval(decrTime, 1000);
}