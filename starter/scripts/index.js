const buttonSearch = document.querySelector('#page-home main a');
const closeButton = document.querySelector('#modal .header a');

buttonSearch.addEventListener('click', () => {
    const model = document.querySelector('#modal');
    model.classList.remove('hidden');
})

closeButton.addEventListener('click', () => {
    const model = document.querySelector('#modal');
    model.classList.add('hidden');
})