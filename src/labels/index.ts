const ENGLISH = {
    cancel: 'Cancel',
    scanCode: 'Scan Code',
    createCode: 'Create Code',
    goToLink: 'Go to this link?',
    ok: 'OK',
    touchToScan: 'Touch here to scan'
}

const SPANISH = {
    cancel: 'Cancelar',
    scanCode: 'Escanear Código',
    createCode: 'Crear Código',
    goToLink: '¿Ir a este enlace?',
    ok: 'Aceptar',
    touchToScan: 'Toque aquí para escanear'
}

const CHINESE = {
    cancel: '取消',
    scanCode: '扫描代码',
    createCode: '创建代码',
    goToLink: '转到此链接？',
    ok: '好',
    touchToScan: '点击这里扫描'
}

const GERMAN = {
    cancel: 'Abbrechen',
    scanCode: 'Code scannen',
    createCode: 'Code erstellen',
    goToLink: 'Zu diesem Link gehen?',
    ok: 'OK',
    touchToScan: 'Hier tippen, um zu scannen'
}

const ARABIC = {
    cancel: 'إلغاء',
    scanCode: 'مسح الرمز',
    createCode: 'إنشاء الرمز',
    goToLink: 'الذهاب إلى هذا الرابط؟',
    ok: 'موافق',
    touchToScan: 'اضغط هنا للمسح'
}

const PORTUGUESE = {
    cancel: 'Cancelar',
    scanCode: 'Escanear Código',
    createCode: 'Criar Código',
    goToLink: 'Ir para este link?',
    ok: 'OK',
    touchToScan: 'Toque aqui para escanear'
}

const FRENCH = {
    cancel: 'Annuler',
    scanCode: 'Scanner le code',
    createCode: 'Créer le code',
    goToLink: 'Aller à ce lien ?',
    ok: 'OK',
    touchToScan: 'Appuyez ici pour scanner'
}

const getLabels = (language) => {
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

const language = 'hindi';
export const LABELS = getLabels(language);
