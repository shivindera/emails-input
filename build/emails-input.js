var EmailsInput = /** @class */ (function () {
    function EmailsInput(_a) {
        var inputBox = _a.inputBox, addBtn = _a.addBtn, countBtn = _a.countBtn;
        if (!inputBox) {
            console.error('No element passed to EmailsInput for initialization');
            return;
        }
        Object.assign(this, { inputBox: inputBox, addBtn: addBtn, countBtn: countBtn });
        this.emailsArr = [];
        this.initialize();
        this.addListeners();
    }
    EmailsInput.prototype.initialize = function () {
        this.inputBox.classList.add('emails-input-container');
        var inputBoxFlex = document.createElement('div');
        inputBoxFlex.className = 'emails-input-flex';
        this.inputBoxFlex = inputBoxFlex;
        var input = document.createElement('input');
        input.type = 'email';
        input.className = 'emails-input';
        input.placeholder = 'add more people…';
        this.emailInput = input;
        this.inputBoxFlex.appendChild(input);
        this.inputBox.appendChild(inputBoxFlex);
    };
    EmailsInput.prototype.addListeners = function () {
        var _this = this;
        this.inputBox.addEventListener('click', function (e) {
            var target = e.target;
            var currTarget = e.currentTarget;
            if (target.isSameNode(currTarget)) {
                _this.emailInput.focus();
            }
        });
        this.inputBoxFlex.addEventListener('click', function (e) {
            var target = e.target;
            var currTarget = e.currentTarget;
            if (target.matches('.email-remove')) {
                var emailEl = target.parentElement;
                _this.removeEmail(emailEl);
            }
            if (target.isSameNode(currTarget)) {
                _this.emailInput.focus();
            }
        });
        this.emailInput.addEventListener('keyup', function (e) {
            var val = _this.emailInput.value;
            if (e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 188) {
                _this.addEmail(val);
                _this.emailInput.value = '';
            }
        });
        this.emailInput.addEventListener('paste', function (e) {
            e.preventDefault();
            var val = e.clipboardData.getData('text/plain');
            if (val) {
                val.split(/[\s,]+/).forEach(function (email) {
                    _this.addEmail(email);
                });
                _this.emailInput.value = '';
            }
        });
        this.emailInput.addEventListener('blur', function () {
            var val = _this.emailInput.value;
            if (val) {
                _this.addEmail(val);
                _this.emailInput.value = '';
            }
        });
        if (this.addBtn) {
            this.addBtn.addEventListener('click', function () {
                var email = _this.randomEmail();
                _this.addEmail(email);
            });
        }
        if (this.countBtn) {
            this.countBtn.addEventListener('click', function () {
                var count = _this.emailsArr.reduce(function (acc, emailObj) { return (emailObj.valid ? acc + 1 : acc); }, 0);
                window.alert(count + " valid email(s)");
            });
        }
    };
    EmailsInput.prototype.addEmail = function (str) {
        var email = str.replace(',', '');
        var isValid = this.validateEmail(email);
        var emailEl = document.createElement('div');
        emailEl.className = "email-el" + (isValid ? ' email-valid' : '');
        emailEl.innerText = email;
        var emailElRemove = document.createElement('span');
        emailElRemove.className = 'email-remove';
        emailElRemove.innerHTML = '&times;';
        emailEl.appendChild(emailElRemove);
        this.inputBoxFlex.insertBefore(emailEl, this.emailInput);
        this.emailsArr.push({
            el: emailEl,
            valid: isValid
        });
    };
    EmailsInput.prototype.removeEmail = function (emailEl) {
        this.emailsArr = this.emailsArr.filter(function (emailObj) { return !emailObj.el.isSameNode(emailEl); });
        emailEl.remove();
    };
    EmailsInput.prototype.randomEmail = function () {
        var user = '';
        var characters = 'abcdefghijklmnopqrstuvwxyz';
        var len = characters.length;
        var userLen = Math.floor(Math.random() * 10);
        for (var i = 0; i < userLen; i++) {
            user += characters.charAt(Math.floor(Math.random() * len));
        }
        return user ? user + "@gmail.com" : this.randomEmail();
    };
    EmailsInput.prototype.validateEmail = function (email) {
        var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return reg.test(email);
    };
    return EmailsInput;
}());
window.EmailsInput = EmailsInput;
