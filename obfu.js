function printCode() {
    const textarea = document.getElementById('Code');
    const textareaobf = document.getElementById('ObfCode');
    const code = textarea.value;

  
    if (code.trim() === "") {
        textareaobf.value = "";
        return;
    }

    const set = "a" + Math.random().toString(36).substring(10); // Random set
    const letters = Array.from("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ").sort(() => Math.random() - 0.5).join('');
    const setlettre = "Set " + set + "=" + letters;
    let codeobfu = "";
    const lettertab = {};

    for (let i = 0; i < letters.length; i++) {
        lettertab[letters[i]] = "%" + set + ":~" + i + ",1%";
    }

    for (let i = 0; i < code.length; i++) {
        if (lettertab[code[i]]) {
            codeobfu += lettertab[code[i]];
        } else {
            codeobfu += code[i];
        }
    }

    textareaobf.value = '@echo off\n' + setlettre + '\ncls' + '\n' + codeobfu;
}

window.onload = function () {
    const dropZone = document.getElementById('dropZone');
    const textarea = document.getElementById('Code');
    const fileInput = document.getElementById('fileInput');


    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.style.backgroundColor = '#555555';
    });

    dropZone.addEventListener('dragleave', () => {
        dropZone.style.backgroundColor = '';
    });

    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.style.backgroundColor = '';
        const file = e.dataTransfer.files[0];
        handleFile(file);
    });


    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        handleFile(file);
    });

    function handleFile(file) {
        if (file && (file.type === 'text/plain' || file.name.endsWith('.bat'))) {
            const reader = new FileReader();
            reader.onload = function (event) {
                textarea.value = event.target.result;
                printCode(); 
            };
            reader.readAsText(file);
        } else {
            alert('Please select a valid .bat or .txt file.');
        }
    }
};


function copyToClipboard() {
    const obfTextarea = document.getElementById('ObfCode');
    const copyButton = document.getElementById('copyButton');

    if (obfTextarea.value.trim() !== "") {
        navigator.clipboard.writeText(obfTextarea.value).then(() => {
            copyButton.textContent = "Copied";
            setTimeout(() => {
                copyButton.textContent = "Copy";
            }, 2000); 
        });
    } else {
        alert("Nothing to copy!");
    }
}
