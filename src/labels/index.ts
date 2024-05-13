const ENGLISH = {
    cancel: 'Cancel',
    scanCode: 'Scan Code',
    createCode: 'Create Code',
    goToLink: 'Go to this link?',
    ok: 'OK',
    touchToScan: 'Touch here to scan',
    selectLanguage:'Select Language',
    pasteLink:'Paste your link or text here'
    ,generate:'Generate'
}

const SPANISH = {
    cancel: 'Cancelar',
    scanCode: 'Escanear Código',
    createCode: 'Crear Código',
    goToLink: '¿Ir a este enlace?',
    ok: 'Aceptar',
    touchToScan: 'Toque aquí para escanear',
    selectLanguage:'Seleccionar idioma',
    pasteLink:'Pega tu enlace o texto aquí'
    ,generate:'generar'
}

const CHINESE = {
    cancel: '取消',
    scanCode: '扫描代码',
    createCode: '创建代码',
    goToLink: '转到此链接？',
    ok: '好',
    touchToScan: '点击这里扫描',
    selectLanguage:'选择语言'
    ,pasteLink:'粘贴你的链接或文字在这里'
    ,generate:"生成"
}

const GERMAN = {
    cancel: 'Abbrechen',
    scanCode: 'Code scannen',
    createCode: 'Code erstellen',
    goToLink: 'Zu diesem Link gehen?',
    ok: 'OK',
    touchToScan: 'Hier tippen, um zu scannen',
    selectLanguage:'Sprache auswählen'
    ,pasteLink:'Füge deinen Link oder Text hier ein'
    ,generate:'generieren'
}

const ARABIC = {
    cancel: 'إلغاء',
    scanCode: 'مسح الرمز',
    createCode: 'إنشاء الرمز',
    goToLink: 'الذهاب إلى هذا الرابط؟',
    ok: 'موافق',
    touchToScan: 'اضغط هنا للمسح',
    selectLanguage:'تحديد اللغة',
    pasteLink: "الصق الرابط أو النص هنا"
    ,generate: "توليد"
}

const PORTUGUESE = {
    cancel: 'Cancelar',
    scanCode: 'Escanear Código',
    createCode: 'Criar Código',
    goToLink: 'Ir para este link?',
    ok: 'OK',
    touchToScan: 'Toque aqui para escanear',
    selectLanguage:'Selecionar idioma',
    pasteLink:'Cole o seu link ou texto aqui'
    ,generate: 'gerar'
}

const FRENCH = {
    cancel: 'Annuler',
    scanCode: 'Scanner le code',
    createCode: 'Créer le code',
    goToLink: 'Aller à ce lien ?',
    ok: 'OK',
    touchToScan: 'Appuyez ici pour scanner',
    selectLanguage:'Sélectionner la langue',
    pasteLink:"Collez votre lien ou texte ici"
    ,generate: "générer"
}

 export const getLabels = (language) => {
    console.log("🎯: getLabels -> language", language)
    switch (language) {
        case 'english':
            return ENGLISH;
        case 'spanish':
            return SPANISH;
        case 'chinese':
            return CHINESE;
        case 'german':
            return GERMAN;
        case 'arabic':
            return ARABIC;
        case 'portuguese':
            return PORTUGUESE;
        case 'french':
            return FRENCH;
        default:
            return ENGLISH; // Default to English
    }
};

// Set initial language to English
let selectedLanguage = 'english';
export let LABELS = getLabels(selectedLanguage);

// Function to update labels when language is changed
export const updateLabels = (language) => {
console.log("🎯: updateLabels -> language", language)
    
    selectedLanguage = language.toLowerCase();
    console.log("🎯: updateLabels -> selectedLanguage", selectedLanguage)
    LABELS = getLabels(selectedLanguage);
};