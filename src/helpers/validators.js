import * as R from 'ramda'

/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */
/*
RED: 'red',
    BLUE: 'blue',
    ORANGE: 'orange',
    GREEN: 'green',
    WHITE: 'white',

 */
const isRed = (figureColor) => figureColor === 'red';
const isBlue = (figureColor) => figureColor === 'blue';
const isOrange = (figureColor) => figureColor === 'orange';
const isGreen = (figureColor) => figureColor === 'green';
const isWhite = (figureColor) => figureColor === 'white';

const getStarColor = R.prop('star');
const getSquareColor = R.prop('square');
const getTriangleColor = R.prop('triangle');
const getCircleColor = R.prop('circle');

const isRedStar = R.compose(isRed, getStarColor);
const isBlueStar = R.compose(isBlue, getStarColor);
const isOrangeStar = R.compose(isOrange, getStarColor);
const isGreenStar = R.compose(isGreen, getStarColor);
const isWhiteStar = R.compose(isWhite, getStarColor);

const isRedSquare = R.compose(isRed, getSquareColor);
const isBlueSquare = R.compose(isBlue, getSquareColor);
const isOrangeSquare = R.compose(isOrange, getSquareColor);
const isGreenSquare = R.compose(isGreen, getSquareColor);
const isWhiteSquare = R.compose(isWhite, getSquareColor);

const isRedTriangle = R.compose(isRed, getTriangleColor);
const isBlueTriangle = R.compose(isBlue, getTriangleColor);
const isOrangeTriangle = R.compose(isOrange, getTriangleColor);
const isGreenTriangle = R.compose(isGreen, getTriangleColor);
const isWhiteTriangle = R.compose(isWhite, getTriangleColor);

const isRedCircle = R.compose(isRed, getCircleColor);
const isBlueCircle = R.compose(isBlue, getCircleColor);
const isOrangeCircle = R.compose(isOrange, getCircleColor);
const isGreenCircle = R.compose(isGreen, getCircleColor);
const isWhiteCircle = R.compose(isWhite, getCircleColor);

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = (figures) => {
    const isDemandedFiguresWhite = R.allPass([isWhiteTriangle, isWhiteCircle]);
    const isValid = R.allPass([isRedStar, isGreenSquare, isDemandedFiguresWhite]);
    return isValid(figures);
};

// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = (figures) => {
    const greenFigures = R.map(fn => fn(figures), [isGreenSquare, isGreenStar, isGreenCircle, isGreenTriangle]);
    const countGreenFigures = R.count(R.equals(true));
    const greenFiguresCount = countGreenFigures(greenFigures);
    return greenFiguresCount >= 2;

};

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = (figures) => {
    const redFigures = R.map(fn => fn(figures), [isRedSquare, isRedStar, isRedCircle, isRedTriangle]);
    const countRedFigures = R.count(R.equals(true));
    const redFiguresCount = countRedFigures(redFigures);

    const blueFigures = R.map(fn => fn(figures), [isBlueSquare, isBlueStar, isBlueCircle, isBlueTriangle]);
    const countBlueFigures = R.count(R.equals(true));
    const blueFiguresCount = countBlueFigures(blueFigures);

    return blueFiguresCount === redFiguresCount;
};

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = (figures) => {
    const isValid = R.allPass([isRedStar, isOrangeSquare, isBlueCircle]);
    return isValid(figures);
};

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = (figures) => {
    const redFigures = R.map(fn => fn(figures), [isRedSquare, isRedStar, isRedCircle, isRedTriangle]);
    const countRedFigures = R.count(R.equals(true));
    const redFiguresCount = countRedFigures(redFigures);

    const blueFigures = R.map(fn => fn(figures), [isBlueSquare, isBlueStar, isBlueCircle, isBlueTriangle]);
    const countBlueFigures = R.count(R.equals(true));
    const blueFiguresCount = countBlueFigures(blueFigures);

    const orangeFigures = R.map(fn => fn(figures), [isOrangeSquare, isOrangeStar, isOrangeCircle, isOrangeTriangle]);
    const countOrangeFigures = R.count(R.equals(true));
    const orangeFiguresCount = countOrangeFigures(orangeFigures);

    const greenFigures = R.map(fn => fn(figures), [isGreenSquare, isGreenStar, isGreenCircle, isGreenTriangle]);
    const countGreenFigures = R.count(R.equals(true));
    const greenFiguresCount = countGreenFigures(greenFigures);

    const res = R.count(R.gte(R.__, 3), [greenFiguresCount, orangeFiguresCount, blueFiguresCount, redFiguresCount]);

    return res > 0;
};

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = () => false;

// 7. Все фигуры оранжевые.
export const validateFieldN7 = () => false;

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = () => false;

// 9. Все фигуры зеленые.
export const validateFieldN9 = () => false;

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = () => false;
