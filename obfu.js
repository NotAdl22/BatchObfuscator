function printCode() {
    var textarea = document.getElementById('Code');
    var textareaobf = document.getElementById('ObfCode');
    var set = "a" + Math.random().toString(36).substring(10); 
    var letters = Array.from("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ").sort(() => Math.random() - 0.5).join('');
    var setlettre = "Set " + set + "=" + letters;
    var code = textarea.value;
    var codeobfu = "";
    var lettertab = {};
    for (var i = 0; i < letters.length; i++) {
        lettertab[letters[i]] = "%" + set + ":~" + i + ",1%";
    }

    for (var i = 0; i < code.length; i++) {
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

        if (file && (file.type === 'text/plain' || file.name.endsWith('.bat'))) {
            const reader = new FileReader();
            reader.onload = function (event) {
                textarea.value = event.target.result;
                printCode(); 
            };
            reader.readAsText(file);
        } else {
            alert('Please drop a valid .bat or .txt file.');
        }
    });
};
