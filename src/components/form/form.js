initForms();

function initForms() {
  const forms = document.querySelectorAll('form');
  if (!forms.length) return;

  forms.forEach((form) => {
    form.setAttribute('novalidate', '');
    startValidation(form);
  });
}

function startValidation(form) {
  const formType = form.dataset.form;

  const fieldset = form.querySelector('fieldset');
  const onlyWords = /^[a-zA-Zа-яА-ЯёЁ"'«».,\s-]+$/;

  const inputList = Array.from(
    form.querySelectorAll(
      'input:not([hidden]):not([type="checkbox"]):not([type="radio"]):not([data-input="segmented"])'
    )
  );

  const checkboxList = Array.from(
    form.querySelectorAll('input[type="checkbox"][required]:not([hidden])')
  );

  if (!inputList.length) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const ok = validateAll({ showErrors: true, requiredOnly: true });

    if (!ok) {
      formError(form, true);
      if (fieldset) fieldset.removeAttribute('disabled');
      return;
    }

    formError(form, false);

    const formData = new FormData(form);
    console.log(Array.from(formData));

    if (fieldset) fieldset.setAttribute('disabled', '');

    if (formType === 'consultation') {
      closeModalByName?.('consultation');
    }

    setTimeout(() => {
      fieldset?.removeAttribute('disabled');
      showModal?.('success');
    }, 300);

    resetForm(form);
  });

  form.addEventListener('input', (e) => {
    const el = e.target;
    if (!(el instanceof HTMLInputElement)) return;

    if (el.type !== 'checkbox') {
      el.classList.toggle('filled', !!el.value.length);
      formError(form, false);

      if (el.required || el.value.trim().length) {
        validateOne(el, { showError: false });
      } else {
        clearOne(el);
      }
    } else {
      if (el.required) {
        if (el.checked) el.setAttribute('valid', 'true');
        else el.removeAttribute('valid');
      }
    }
  });

  form.addEventListener('focusin', (e) => {
    const el = e.target;
    if (!(el instanceof HTMLInputElement)) return;
    if (el.type === 'checkbox') return;

    el.classList.add('focus');
    el.classList.remove('error');
    formError(form, false);
  });

  form.addEventListener('focusout', (e) => {
    const el = e.target;
    if (!(el instanceof HTMLInputElement)) return;
    if (el.type === 'checkbox') return;

    el.classList.remove('focus');

    if (!el.value.length) {
      el.classList.remove('filled');

      if (!el.required) {
        clearOne(el);
        return;
      }
    }

    validateOne(el, { showError: false });
  });

  function validateAll({ showErrors, requiredOnly }) {
    let ok = true;

    // inputs
    inputList.forEach((input) => {
      if (isHidden(input)) return;

      if (requiredOnly && !input.required) {
        if (!input.value.trim().length) clearOne(input);
        return;
      }

      const v = validateOne(input, { showError: showErrors });
      if (!v) ok = false;
    });

    checkboxList.forEach((cb) => {
      if (isHidden(cb)) return;

      if (cb.checked) {
        cb.setAttribute('valid', 'true');
        cb.classList.remove('error');
      } else {
        cb.removeAttribute('valid');
        if (showErrors) cb.classList.add('error');
        ok = false;
      }
    });

    return ok;
  }

  function validateOne(input, { showError }) {
    const type = input.dataset.input;
    if (!type) return true;

    const value = (input.value || '').trim();

    if (input.required && value === '') {
      setInvalid(input, showError ? 'Заполните поле' : '');
      return false;
    }

    if (!input.required && value === '') {
      clearOne(input);
      return true;
    }

    let result = { valid: true, message: '' };

    switch (type) {
      case 'name': {
        if (!onlyWords.test(value) || value.length < 3) {
          result = { valid: false, message: 'Некорректное имя' };
        }
        break;
      }

      case 'phone': {
        const digits = value.replace(/\D/g, '');

        if (digits.length !== 11) {
          result = { valid: false, message: 'Некорректный номер' };
        }
        break;
      }

      case 'param': {
        result = { valid: true, message: '' };
        break;
      }

      default: {
        result = { valid: false, message: 'Некорректное значение' };
      }
    }

    if (!result.valid) {
      setInvalid(input, showError ? result.message : '');
      return false;
    }

    setValid(input);
    return true;
  }

  function isHidden(el) {
    return !!el.closest('.hide');
  }

  function setValid(input) {
    input.classList.remove('error');
    input.setAttribute('valid', 'true');
    setErrorText(input, '');
  }

  function setInvalid(input, message) {
    input.removeAttribute('valid');

    if (message) {
      input.classList.add('error');
      setErrorText(input, message);
    } else {
      input.classList.remove('error');
      setErrorText(input, '');
    }
  }

  function clearOne(input) {
    input.classList.remove('error');
    input.removeAttribute('valid');
    setErrorText(input, '');
  }

  function setErrorText(input, text) {
    const type = input.dataset.input;
    if (!type) return;

    const label = input.closest('.input-field');
    const errorEl = label?.querySelector(`[data-input-error="${type}"]`);
    if (errorEl) errorEl.textContent = text || '';
  }
}

function formError(form, active) {
  const formErrorField = form.querySelector('[data-form-error]');
  if (!formErrorField) return;

  if (!active) {
    formErrorField.classList.remove('active');
  } else {
    formErrorField.textContent = 'Проверьте корректное заполнение полей';
    formErrorField.classList.add('active');
  }
}

function resetForm(form) {
  setTimeout(() => {
    form.reset();

    const inputs = form.querySelectorAll('input:not([type="checkbox"])');
    inputs.forEach((input) => {
      input.classList.remove('focus', 'filled', 'error');
      input.removeAttribute('valid');

      const type = input.dataset.input;
      if (!type) return;

      const label = input.closest('.input-field');
      const errorEl = label?.querySelector(`[data-input-error="${type}"]`);
      if (errorEl) errorEl.textContent = '';
    });

    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
      checkbox.removeAttribute('valid');
      checkbox.classList.remove('error');
    });

    formError(form, false);
  }, 300);
}

