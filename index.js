
import { getSuggestions, debounce } from "./utils.js";

const inputBox = document.getElementById("input-box");
const suggestionBox = document.getElementsByClassName("suggestions-wrapper")[0];

const resetState = () => {
    suggestionBox.classList.remove("suggestion-box-visible");
}

const renderDropdown = (list) => {
    const suggFrag = document.createDocumentFragment();

    list.forEach(option => {
        const el = document.createElement("div");
        el.innerHTML = option;
        el.classList.add("suggestion-item");
        el.setAttribute("data-key", option);
        suggFrag.appendChild(el);
    });
    suggestionBox.innerHTML = "";
    suggestionBox.appendChild(suggFrag);
}

const handleSearch = async (keyword) => {
    const result = await getSuggestions(keyword);

    if (keyword.length > 0 && result.length) {
        suggestionBox.classList.add("suggestion-box-visible");
        renderDropdown(result);
    }
    else {
        resetState();
    }
}

const handleInputValueChange = (e) => {
    const value = e.target.value;
    console.log(value);

    if (value)
        handleSearch(value);
    else
        resetState();
}

const handleSelectValue = (e) => {
    const { key } = e.target.dataset;
    if (key) {
        inputBox.value = key;
        resetState();
    }
}

(() => {
    inputBox.addEventListener('input', debounce(handleInputValueChange, 1000));
    suggestionBox.addEventListener('click', handleSelectValue);
})();