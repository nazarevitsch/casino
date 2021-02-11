'use strict';

let table = [{number: 0, color: 'green'}, {number: 1, color: 'red'}, {number: 2, color: 'black'},
    {number: 3, color: 'red'}, {number: 4, color: 'black'}, {number: 5, color: 'red'}, {number: 6, color: 'black'},
    {number: 7, color: 'red'}, {number: 8, color: 'black'}, {number: 9, color: 'red'}, {number: 10, color: 'black'},
    {number: 11, color: 'black'}, {number: 12, color: 'red'}, {number: 13, color: 'black'}, {number: 14, color: 'red'},
    {number: 15, color: 'black'}, {number: 16, color: 'red'}, {number: 17, color: 'black'}, {number: 18, color: 'red'},
    {number: 19, color: 'red'}, {number: 20, color: 'black'}, {number: 21, color: 'red'}, {number: 22, color: 'black'},
    {number: 23, color: 'red'}, {number: 24, color: 'black'}, {number: 25, color: 'red'}, {number: 26, color: 'black'},
    {number: 27, color: 'red'}, {number: 28, color: 'black'}, {number: 29, color: 'black'}, {number: 30, color: 'red'},
    {number: 31, color: 'black'}, {number: 32, color: 'red'}, {number: 33, color: 'black'}, {number: 34, color: 'red'},
    {number: 35, color: 'black'}, {number: 36, color: 'red'}];


async function spin(bets) {
    let result = await randomWin();
    let sum = 0;
    for (let i = 0; i < bets.length; i++) {
        sum += await checkNumber(bets[i], result);
        if (result.number !== 0) {
            sum += await checkColor(bets[i], result);
            sum += await checkSmallHeap(bets[i], result);
            sum += await checkBigHeap(bets[i], result);
            sum += await checkOddEven(bets[i], result);
            sum += await checkColumn(bets[i], result);
        }
    }
    return {answer: result, win: sum};
}

async function randomWin(){
    let result = table[Math.floor(Math.random() * table.length)];
    if (result.number <= 18) {
        result.bigHeap = '1-18';
        if (result.number <= 12) {
            result.smallHeap = '1-12';
        } else {
            result.smallHeap = '13-24';
        }
    } else {
        result.bigHeap = '19-36';
        if (result.number <= 24) {
            result.smallHeap = '13-24';
        } else {
            result.smallHeap = '25-36';
        }
    }
    return result;
}

async function checkNumber(bet, result){
    if (+bet.type === result.number) return bet.money * 36;
    else return 0;
}

async function checkOddEven(bet, result){
    if (bet.type === 'even') return (result.number % 2) === 0 ? bet.money * 2 : 0;
    if (bet.type === 'odd') return (result.number % 2) === 1 ? bet.money * 2 : 0;
    return 0;
}

async function checkColor(bet, result){
    if (bet.type === result.color) return bet.money * 2;
    else return 0;
}

async function checkSmallHeap(bet, result){
    if (bet.type === result.smallHeap) return bet.money * 3;
    else return 0;
}

async function checkBigHeap(bet, result){
    if (bet.type === result.bigHeap) return bet.money * 2;
    else return 0;
}

async function checkColumn(bet, result){
    if (bet.type === '1st') return (result.number % 3) === 1 ? bet.money * 3 : 0;
    if (bet.type === '2nd') return (result.number % 3) === 2 ? bet.money * 3 : 0;
    if (bet.type === '3rd') return (result.number % 3) === 0 ? bet.money * 3 : 0;
    return 0;
}

module.exports = {
    spin
};
