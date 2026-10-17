import { state } from '../state.js';
import { buttonsBlock, createButton } from '../dom.js';

export function updateButtons(onSubmit) {
    buttonsBlock.innerHTML = '';
    buttonsBlock.classList.remove('hardcore-mode');
    if (state.difficulty.hardcore) {
        renderHardcoreInput(onSubmit);
    } else {
        state.options.forEach(opt => buttonsBlock.appendChild(createButton(opt.title, 'Buttons')));
    }
}

export function renderHardcoreInput(onSubmit) {
    buttonsBlock.classList.add('hardcore-mode');
    const wrapper = document.createElement('div');
    wrapper.className = 'hardcore-input-wrapper';

    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'hardcoreInput';
    input.className = 'hardcore-input';
    input.placeholder = 'Введите название или исполнителя...';
    input.autocomplete = 'off';
    input.addEventListener('keydown', (e) => { if (e.key === 'Enter') onSubmit(); });

    const submitBtn = document.createElement('button');
    submitBtn.className = 'btn btn-primary hardcore-submit';
    submitBtn.innerHTML = '<i class="fa-solid fa-check"></i> Проверить';
    submitBtn.addEventListener('click', onSubmit);

    wrapper.appendChild(input);
    wrapper.appendChild(submitBtn);
    buttonsBlock.appendChild(wrapper);
    setTimeout(() => input.focus(), 200);
}
