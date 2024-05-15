const ENGLISH = {
    cancel: 'Cancel',
    scanCode: 'Scan Code',
    createCode: 'Create Code',
    goToLink: 'Go to this link?',
    ok: 'OK',
    touchToScan: 'Touch here to scan',
    selectLanguage:'Select Language',
    pasteLink:'Paste your link or text here'
    ,generate:'Generate',
    selectImage:'Select an Image (optional), for QR Code only',
    selectFormat:'Select a Code Format (default CODE128), for BAR Code only',
    removeSelectedCode:"Remove Selected Code",
    generateCodeError:'You can only choose to generate one type of code at a time',
    pleaseEnter:'Please paste your text or link to generate a code',
    pleaseChoose:'Please choose',
    generateQR:'Generate QR Code',
    generateBAR:'Generate BAR Code'
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
    ,generate:'generar',
    selectImage:'Seleccionar una imagen (opcional), solo para código QR',
    selectFormat:'Seleccionar un formato de código (predeterminado CODE128), solo para código de barras',
    removeSelectedCode: 'Eliminar el código seleccionado',
generateCodeError: 'Solo puedes elegir generar un tipo de código a la vez'
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
    ,generate:"生成",
    selectImage:"选择图像（可选），仅适用于二维码",
    selectFormat:"选择代码格式（ 默认为CODE128 ) .仅适用于条形码",
    removeSelectedCode: '删除选定的代码',
    generateCodeError: '您一次只能选择生成一种代码'
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
    ,generate:'generieren',
    selectImage:"Wähle ein Bild (optional), nur für QR-Code",
    selectFormat:"Wähle ein Code-Format (Standard CODE128), nur für Barcode",
    removeSelectedCode: 'Ausgewählten Code entfernen',
    generateCodeError: 'Sie können jeweils nur eine Art von Code generieren'

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
    ,generate: "توليد",
    selectImage:"اختر صورة (اختياري)، فقط لرمز الاستجابة السريعة",
    selectFormat:"اختر تنسيق الرمز (الافتراضي CODE128)، فقط لرمز الباركود",
    removeSelectedCode: 'إزالة الكود المحدد',
    generateCodeError: 'يمكنك اختيار توليد نوع واحد فقط من الأكواد في المرة الواحدة'

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
    ,generate: 'gerar',
    selectImage:"Selecionar uma imagem (opcional), apenas para código QR",
    selectFormat:"Selecionar um formato de código (padrão CODE128), apenas para código de barras",
    removeSelectedCode: 'Remover código selecionado',
    generateCodeError: 'Você só pode escolher gerar um tipo de código por vez'

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
    ,generate: "générer",
    selectImage:"Sélectionner une image (optionnel), uniquement pour code QR",
    selectFormat: "Sélectionner un format de code (par défaut CODE128), uniquement pour code-barres",
    removeSelectedCode: 'Supprimer le code sélectionné',
    generateCodeError: 'Vous ne pouvez choisir de générer qu\'un seul type de code à la fois'
    

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