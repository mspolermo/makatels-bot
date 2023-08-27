const lettersDictionary = {
    'e': 'е',
    'е': 'e',
    'y': 'у',
    'у': "y",
    'o': 'о',
    'о': 'o',
    'p': 'р',
    'р': 'p',
    'a': 'а',
    'а': 'a',
    'k': 'к',
    'к': 'k', 
    'x': 'х',
    'х': 'x', 
    'c': 'с',
    'с': 'c', 
    'E': 'Е',
    'Е': 'E', 
    'T': 'Т',
    'Т': 'T', 
    'O': 'О',
    'О': 'O', 
    'P': 'Р',
    'Р': 'P', 
    'A': 'А',
    'А': 'A',
    'H': 'Н',
    'Н': 'Н', 
    'K': 'К',
    'К': 'K', 
    'X': 'Х',
    'Х': 'X', 
    'C': 'С',
    'С': 'С', 
    'B': 'B',
    'В': 'B', 
    'M': 'М',
    'М': 'M'
};
//Функция возврата смешанной строки
export function getMixedString(string) {
    // const engLatters = ['e', 'y', 'o', 'p', 'a', 'k', 'x', 'c', 'E', 'T', 'O', 'P', 'A', 'H', 'K', 'X', 'C', 'B', 'M'] ;
    // const ruLatters = ['у', "к", "е", "х", "а", "р", "о", "с", "К", "Е", "Н","Х", "В", "А", "Р", "О","С", "М" ];

    let arrayFromString = string.split('');
    let mixedAdday = [];
    arrayFromString.forEach(e => mixedAdday.push(
        getMixedLatter(e)
    ));

    return mixedAdday.join('');

}
//Функция возврата смешанной буквы
function getMixedLatter (currentLetter) {
    if (lettersDictionary[currentLetter] === undefined) {
        return currentLetter;
    };

    let lattersArr = [ lettersDictionary[currentLetter], lettersDictionary[ lettersDictionary[currentLetter] ] ];
    let randomNum = Math.round(Math.round ( Math.random()*10 ) /10);

    return lattersArr[randomNum];  
}