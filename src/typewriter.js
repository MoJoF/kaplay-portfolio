export function typewriterEffect() {
    // Переменная для хранения текущего таймера печати (чтобы можно было его отменить)
    let typewriterTimer = null;
    let isDialogueActive = false;

    // 1. Создаем подложку (черное окно с белой рамкой)
    const dialogueBox = add([
        rect(width() - 40, 140),
        pos(20, height() - 160),
        color(0, 0, 0),
        outline(4, rgb(255, 255, 255)),
        fixed(),
    ]);

    // 2. Создаем текстовое поле ВНУТРИ окна
    const dialogueText = dialogueBox.add([
        text("", { size: 16, width: width() - 80 }),
        pos(20, 20), // Смещение относительно dialogueBox
    ]);

    // По умолчанию скрываем все диалоговое окно
    dialogueBox.hidden = true;

    function showDialogue(fullText) {
        // Если прошлый текст еще печатался — отменяем старый таймер
        if (typewriterTimer) {
            typewriterTimer.cancel();
        }

        // Делаем окно видимым
        dialogueBox.hidden = false;
        isDialogueActive = true;

        let currentText = "";
        let index = 0;

        function typeChar() {
            if (index < fullText.length) {
                currentText += fullText[index];
                dialogueText.text = currentText;
                index++;

                // Сохраняем ссылку на таймер, чтобы иметь возможность его прервать
                typewriterTimer = wait(0.04, typeChar);
            } else {
                typewriterTimer = null;
            }
        }

        // Запускаем печать с первого символа
        typeChar();
    }

    // Функция для закрытия диалога
    function closeDialogue() {
        if (typewriterTimer) typewriterTimer.cancel();
        dialogueBox.hidden = true;
        isDialogueActive = false;
        dialogueText.text = "";
    }

}