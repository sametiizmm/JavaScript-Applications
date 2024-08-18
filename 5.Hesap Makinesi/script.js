// HTML'deki '.calculator-input' sınıfına sahip olan input elementini seçer ve 'display' değişkenine atar.
const display = document.querySelector('.calculator-input');

// HTML'deki '.calculator-keys' sınıfına sahip olan elementleri seçer ve 'keys' değişkenine atar.
const keys = document.querySelector('.calculator-keys');

// Ekranda görüntülenen değeri tutmak için 'displayValue' değişkeni tanımlanır ve başlangıç değeri '0' olarak ayarlanır.
let displayValue = '0';

// İlk girilen sayıyı tutacak olan 'firstValue' değişkeni tanımlanır, başlangıç değeri 'null' olarak ayarlanır.
let firstValue = null;

// Kullanıcının seçtiği operatörü tutacak olan 'operator' değişkeni tanımlanır, başlangıç değeri 'null' olarak ayarlanır.
let operator = null;

// İkinci sayının girilmesini bekleyip beklemediğini kontrol eden bir değişken tanımlanır, başlangıç değeri 'false' olarak ayarlanır.
let waitingForSecondValue = false;

// Ekrandaki değeri güncelleyen fonksiyon çağrılır.
updateDisplay();

// 'displayValue' değerini ekranda (input alanında) görüntüleyen fonksiyon.
function updateDisplay() {
    display.value = displayValue;
}

// Tüm tuşlara tıklama olayını dinleyen bir olay dinleyicisi eklenir.
keys.addEventListener('click', function(e) {
    // Tıklanan elementin referansını 'element' değişkenine atar.
    const element = e.target;

    // Tıklanan elementin değerini 'value' değişkenine atar.
    const value = element.value;

    // Eğer tıklanan element bir 'button' değilse fonksiyondan çıkar.
    if (!element.matches('button')) return;

    // Tıklanan butonun değerine göre farklı işlemler gerçekleştiren switch yapısı.
    switch(value) {
        // Eğer tıklanan buton bir operatörse ('+', '-', '*', '/', '='), 'handleOperator' fonksiyonu çağrılır.
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
            handleOperator(value);
            break;
        
        // Eğer tıklanan buton bir ondalık sayı ise, 'inputDecimal' fonksiyonu çağrılır.
        case '.':
            inputDecimal();
            break;

        // Eğer tıklanan buton 'clear' ise, 'clear' fonksiyonu çağrılır.
        case 'clear':
            clear();
            break;

        // Yukarıdakilerden farklı bir buton (sayı) tıklanmışsa, 'inputNumber' fonksiyonu çağrılır.
        default:
            inputNumber(element.value);        
    }

    // Tüm işlemlerden sonra ekran (input) güncellenir.
    updateDisplay();
});

// Operatör tıklamalarını işleyen fonksiyon.
function handleOperator(nextOperator) {
    // Ekrandaki değeri sayıya çevirir ve 'value' değişkenine atar.
    const value = parseFloat(displayValue);

    // Eğer bir operatör seçiliyse ve ikinci sayı bekleniyorsa, sadece operatörü günceller ve fonksiyondan çıkar.
    if(operator && waitingForSecondValue) {
        operator = nextOperator;
        return;
    }

    // Eğer 'firstValue' değeri 'null' ise, şu anki değeri 'firstValue' olarak ayarlar.
    if (firstValue === null) {
        firstValue = value;
    } 
    // Aksi takdirde, operatörün belirlenmiş olması durumunda hesaplama yapar.
    else if (operator) {
        const result = calculate(firstValue, value, operator);

        // Sonucu ekranda görüntülemek için 'displayValue' değişkenine atar.
        displayValue = `${parseFloat(result.toFixed(7))}`;

        // İlk değeri hesaplanan sonuç olarak günceller.
        firstValue = result;
    }

    // İkinci sayıyı beklemeye başlar ve operatörü günceller.
    waitingForSecondValue = true;
    operator = nextOperator;

    // Debugging amacıyla mevcut durumu konsola yazar.
    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

// Hesaplama işlemini gerçekleştiren fonksiyon.
function calculate(first, second, operator) {
    if(operator === '+') {
        return first + second;
    } else if (operator === '-') {
        return first - second;
    } else if (operator === '*') {
        return first * second;
    } else if (operator === '/') {
        return first / second;
    }
    return second;
}

// Kullanıcı bir sayı girdiğinde bu fonksiyon çalışır.
function inputNumber(num) {
    // Eğer ikinci sayı bekleniyorsa, ekrandaki değeri değiştirir ve ikinci sayıyı beklemeyi durdurur.
    if(waitingForSecondValue) {
        displayValue = num;
        waitingForSecondValue = false;
    } 
    // Aksi takdirde, eğer ekrandaki değer '0' ise yeni girilen sayıyı gösterir, değilse sayıyı ekler.
    else {
        displayValue = displayValue === '0'? num : displayValue + num;
    }

    // Debugging amacıyla mevcut durumu konsola yazar.
    console.log(displayValue, firstValue, operator, waitingForSecondValue);
}

// Kullanıcı ondalık bir sayı girdiğinde bu fonksiyon çalışır.
function inputDecimal() {
    // Eğer ekranda henüz bir ondalık nokta yoksa, bir ondalık nokta ekler.
    if (!displayValue.includes('.')) {
        displayValue += '.';
    }
}

// Ekranı temizleyen ve hesap makinesini sıfırlayan fonksiyon.
function clear() {
    displayValue = '0';
}
