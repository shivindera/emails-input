class EmailsInput {
    inputBox: HTMLElement;
    inputBoxFlex: HTMLElement;
    addBtn?: HTMLElement;
    countBtn?: HTMLElement;
    emailInput: HTMLInputElement;
    emailsArr: Array<{
        el: HTMLElement;
        valid: Boolean;
    }>;

    constructor({ inputBox, addBtn, countBtn }: { inputBox: HTMLElement; addBtn: HTMLElement; countBtn: HTMLElement }) {
        if (!inputBox) {
            console.error('No element passed to EmailsInput for initialization');
            return;
        }
        (<any>Object).assign(this, { inputBox, addBtn, countBtn });
        this.emailsArr = [];
        this.initialize();
        this.addListeners();
    }

    initialize() {
        this.inputBox.classList.add('emails-input-container');
        const inputBoxFlex = document.createElement('div');
        inputBoxFlex.className = 'emails-input-flex';
        this.inputBoxFlex = inputBoxFlex;
        const input = document.createElement('input');
        input.type = 'email';
        input.className = 'emails-input';
        input.placeholder = 'add more people…';
        this.emailInput = input;
        this.inputBoxFlex.appendChild(input);
        this.inputBox.appendChild(inputBoxFlex);
    }

    addListeners() {
        this.inputBox.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            const currTarget = e.currentTarget as HTMLElement;
            if (target.isSameNode(currTarget)) {
                this.emailInput.focus();
            }
        });
        this.inputBoxFlex.addEventListener('click', (e) => {
            const target = e.target as HTMLElement;
            const currTarget = e.currentTarget as HTMLElement;
            if (target.matches('.email-remove')) {
                const emailEl = target.parentElement;
                this.removeEmail(emailEl);
            }
            if (target.isSameNode(currTarget)) {
                this.emailInput.focus();
            }
        });
        this.emailInput.addEventListener('keyup', (e) => {
            const val = this.emailInput.value;
            if (e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 188) {
                this.addEmail(val);
                this.emailInput.value = '';
            }
        });
        this.emailInput.addEventListener('paste', (e) => {
            e.preventDefault();
            const val = e.clipboardData.getData('text/plain');
            if (val) {
                val.split(/[\s,]+/).forEach((email) => {
                    this.addEmail(email);
                });
                this.emailInput.value = '';
            }
        });
        this.emailInput.addEventListener('blur', () => {
            const val = this.emailInput.value;
            if (val) {
                this.addEmail(val);
                this.emailInput.value = '';
            }
        });
        if (this.addBtn) {
            this.addBtn.addEventListener('click', () => {
                const email = this.randomEmail();
                this.addEmail(email);
            });
        }
        if (this.countBtn) {
            this.countBtn.addEventListener('click', () => {
                const count = this.emailsArr.reduce((acc, emailObj) => (emailObj.valid ? acc + 1 : acc), 0);
                window.alert(`${count} valid email(s)`);
            });
        }
    }

    addEmail(str: string) {
        const email = str.replace(',', '');
        const isValid = this.validateEmail(email);
        const emailEl = document.createElement('div');
        emailEl.className = `email-el${isValid ? ' email-valid' : ''}`;
        emailEl.innerText = email;
        const emailElRemove = document.createElement('span');
        emailElRemove.className = 'email-remove';
        emailElRemove.innerHTML = '&times;';
        emailEl.appendChild(emailElRemove);
        this.inputBoxFlex.insertBefore(emailEl, this.emailInput);
        this.emailsArr.push({
            el: emailEl,
            valid: isValid,
        });
    }

    removeEmail(emailEl: HTMLElement) {
        this.emailsArr = this.emailsArr.filter((emailObj) => !emailObj.el.isSameNode(emailEl));
        emailEl.remove();
    }

    randomEmail() {
        let user = '';
        const characters = 'abcdefghijklmnopqrstuvwxyz';
        const len = characters.length;
        const userLen = Math.floor(Math.random() * 10);
        for (let i = 0; i < userLen; i++) {
            user += characters.charAt(Math.floor(Math.random() * len));
        }
        return user ? `${user}@gmail.com` : this.randomEmail();
    }

    validateEmail(email) {
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(email);
    }
}

(<any>window).EmailsInput = EmailsInput;
