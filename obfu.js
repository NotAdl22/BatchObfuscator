function printCode() {
    const textarea = document.getElementById('Code');
    const textareaobf = document.getElementById('ObfCode');
    const code = textarea.value;

    if (code.trim() === "") {
        textareaobf.value = "";
        return;
    }

    const set = "a" + Math.random().toString(36).substring(10); 
    const letters = Array.from("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ一二三四五六七八九十百千万亿天地人物他她它我你你们他人朋友家学校工作学习做吃喝说听走跑跳看想学玩玩具电话电电脑网络电视电影音乐书字词句阅读写写字画唱跳舞节目电视台报纸杂志新闻新闻播报新闻记者报道阅读器编辑制作演员导演音乐家艺术家作家演讲会聚会聚集分开休息旅游旅行国家城市街道公园商店超市餐厅咖啡馆商场书店电影院医院学院学术研究知识科学数学物理化学历史地理生物艺术体育体育馆足球篮球排球乒乓球羽毛球运动运动员比赛胜利失败奖杯奖状游戏卡片玩具电子产品手机照相机相机摄像机电视机空调电脑电子书电影演出音乐图书馆卫生健康疾病药物医生医院急救救护车手术治疗饮食食物饮料水茶咖啡果汁牛奶早餐午餐晚餐小吃零食甜点面包米饭面条菜饺子包子鱼肉鸡蔬菜水果苹果香蕉橙子桃子葡萄西瓜草莓樱").sort(() => Math.random() - 0.5).join('');
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
        dropZone.style.backgroundColor = '#4f5b4b';
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

