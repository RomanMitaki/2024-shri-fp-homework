/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from '../tools/api';
import * as R from 'ramda';

//валидация инпута
const isMinLengthValid = (str) => str.trim().length > 2;
const isMaxLengthValid = (str) => str.trim().length < 10;
const isNumberPositive = (str) => parseFloat(str) >= 0;
const isValidCharacters = (str) => /^\d+(\.\d+)?$/.test(str.trim());

const isValidInput = R.allPass([isMinLengthValid, isMaxLengthValid, isNumberPositive, isValidCharacters]);

//Получение числа и его округление
const strToNumber = (str) => parseFloat(str);
const roundNumber = (num) => Math.round(num);
const getNumber = R.compose(roundNumber, strToNumber);

//работа с api
const getResult = R.prop('result');
const api = new Api();
const getAnimal = async (id) => {
    const url = `https://animals.tech/${id}`;
    try {
        const response = await api.get(url, {});
        return getResult(response);
    } catch (error) {
        console.error(error);
        await getAnimal(id);
    }
};

const getNumbersBaseInfo = async ({from, to, number}) => {
    const url = 'https://api.tech/numbers/base';
    const params = {from, to, number};
    try {
        const response = await api.get(url, params);
        return getResult(response);
    } catch (error) {
        console.error(error);
        await getNumbersBaseInfo({from, to, number});
    }
};

//преобразование результата
const countSymbols = (str) => str.length;
const binaryToDecimal = (binary) => parseInt(binary, 2);
const squareBinaryNumber = (binary) => {
    const decimal = binaryToDecimal(binary);
    return Math.pow(decimal, 2);
};
const getRemainder = (binary) => {
    return squareBinaryNumber(binary) % 3;
};
const processSequence = async ({value, writeLog, handleSuccess, handleError}) => {
    writeLog(value);
    if (!isValidInput(value)) {
        return handleError('ValidationError')
    }
    const currNum = getNumber(value);
    writeLog(currNum);
    const binaryNum = await getNumbersBaseInfo({from: 10, to: 2, number: currNum});
    writeLog(binaryNum);
    const getRemainderOfNum = R.compose(writeLog, getRemainder);
    const getCountedSymbols = R.compose(writeLog, countSymbols);
    const getPoweredNum = R.compose(writeLog, squareBinaryNumber);
    const getMappedNum = R.compose(getRemainder, R.tap(getRemainderOfNum), R.tap(getPoweredNum), R.tap(getCountedSymbols));
    const rem = getMappedNum(binaryNum);
    const animal = await getAnimal(rem);
    return handleSuccess(animal);
}

export default processSequence;