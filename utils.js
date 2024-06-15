import { FRUITS } from "./constants.js";

export const getSuggestions = (keyword) => {
    const result = FRUITS.filter(
        fruit => fruit.substring(0, keyword.length).toLowerCase() === keyword.toLowerCase());

    return new Promise((res) => {
        setTimeout(() => {
            res(result);
        }, 1000);
    });
}

export const debounce = (fn, delay) => {
    let timeout;
    return function () {
        const self = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => fn.apply(self, args), delay);
    }
}