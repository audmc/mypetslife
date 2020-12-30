import {
    authorizedPseudo,
    checkEmpty,
    checkEmailFormat,
    checkPasswordFormat,
    showPassword,
    authorizedEmail
} from "../utils/form-functions";

const mailErrorEmpty = ' <small className="register-error-label" id="mail-error-empty">Veuillez entrer ' +
    'une adresse email</small>';
const mailErrorFormat = '<small className="register-error-label" id="mail-error-format">Veuillez entrer ' +
    'une adresse email valide</small>'
const mailErrorUnauthorized = '<small className="register-error-label" id="mail-error-unauthorized">Cette ' +
    'adresse email est interdite</small>'

const pseudoErrorEmpty = '<small className="register-error-label" id="pseudo-error-empty">Veuillez ' +
    'entrer un pseudo</small>';
const pseudoErrorUnauthorized = '<small className="register-error-label" id="pseudo-error-unauthorized">Ce pseudo est interdit</small>';

const passwordErrorEmpty = '<small className="register-error-label" id="password-error-empty">Veuillez ' +
    'entrer un pseudo</small>';
const passwordErrorFormat = '<small className="register-error-label" id="password-error-format">Attention, ' +
    'le mot de passe doit contenir au moins une majuscule, une minucule et un chiffre</small>';

describe('Test emails', () => {

    test('Email is empty', () => {
        document.body.innerHTML = mailErrorEmpty;
        expect(checkEmpty("","mail-error-empty")).toBe(false);
        expect(document.getElementById("mail-error-empty").style.display).toBe('block');
    });

    test('Email is not empty', () => {
        document.body.innerHTML = mailErrorEmpty;
        expect(checkEmpty("test","mail-error-empty")).toBe(true);
        expect(document.getElementById("mail-error-empty").style.display).toBe('none');
    });

    test('Email without @', () => {
        document.body.innerHTML = mailErrorFormat;
        expect(checkEmailFormat("test.","mail-error-format")).toBe(false);
        expect(document.getElementById("mail-error-format").style.display).toBe('block');
    });

    test('Email without .', () => {
        document.body.innerHTML = mailErrorFormat;
        expect(checkEmailFormat("test@","mail-error-format")).toBe(false);
        expect(document.getElementById("mail-error-format").style.display).toBe('block');
    });

    test('Email with space', () => {
        document.body.innerHTML = mailErrorFormat;
        expect(checkEmailFormat("test @gmail.com","mail-error-format")).toBe(false);
        expect(document.getElementById("mail-error-format").style.display).toBe('block');
    });

    test('Email is authorized', () => {
        document.body.innerHTML = mailErrorUnauthorized;
        expect(authorizedEmail("test@mypetslife.co","mail-error-unauthorized")).toBe(true);
        expect(document.getElementById("mail-error-unauthorized").style.display).toBe('none');
    });

    test('Email is unauthorized', () => {
        document.body.innerHTML = mailErrorUnauthorized;
        expect(authorizedEmail("test@0-mail.com","mail-error-unauthorized")).toBe(false);
        expect(authorizedEmail("test+1@gmail.com","mail-error-unauthorized")).toBe(false);
        expect(authorizedEmail("test+11@gmail.com","mail-error-unauthorized")).toBe(false);
        expect(document.getElementById("mail-error-unauthorized").style.display).toBe('block');
    });
});

describe('Test pseudo', () => {

    test('Pseudo is empty', () => {
        document.body.innerHTML = pseudoErrorEmpty;
        expect(checkEmpty("","pseudo-error-empty")).toBe(false);
        expect(document.getElementById("pseudo-error-empty").style.display).toBe('block');
    });

    test('Pseudo is not empty', () => {
        document.body.innerHTML = pseudoErrorEmpty;
        expect(checkEmpty("test","pseudo-error-empty")).toBe(true);
        expect(document.getElementById("pseudo-error-empty").style.display).toBe('none');
    });

    test('Pseudo is authorized', () => {
        document.body.innerHTML = pseudoErrorUnauthorized;
        expect(authorizedPseudo("test","pseudo-error-unauthorized")).toBe(true);
        expect(document.getElementById("pseudo-error-unauthorized").style.display).toBe('none');
    })

    test('Pseudo contain space', () => {
        document.body.innerHTML = pseudoErrorUnauthorized;
        expect(authorizedPseudo("te st","pseudo-error-unauthorized")).toBe(false);
        expect(document.getElementById("pseudo-error-unauthorized").style.display).toBe('block');
    })

    test('Pseudo is unauthorized', () => {
        document.body.innerHTML = pseudoErrorUnauthorized;
        expect(authorizedPseudo("grosse","pseudo-error-unauthorized")).toBe(false);
        expect(document.getElementById("pseudo-error-unauthorized").style.display).toBe('block');
    })

});

describe('Test password', () => {

    test('Password is empty', () => {
        document.body.innerHTML = passwordErrorEmpty;
        expect(checkEmpty("","password-error-empty")).toBe(false);
        expect(document.getElementById("password-error-empty").style.display).toBe('block');
    });

    test('Password is not empty', () => {
        document.body.innerHTML = passwordErrorEmpty;
        expect(checkEmpty("test","password-error-empty")).toBe(true);
        expect(document.getElementById("password-error-empty").style.display).toBe('none');
    });

    test('Password without uppercase', () => {
        document.body.innerHTML = passwordErrorFormat;
        expect(checkPasswordFormat("monmotdepasse3","password-error-format")).toBe(false);
        expect(document.getElementById("password-error-format").style.display).toBe('block');
    });

    test('Password without lowercase', () => {
        document.body.innerHTML = passwordErrorFormat;
        expect(checkPasswordFormat("MONMOTDEPASSE3","password-error-format")).toBe(false);
        expect(document.getElementById("password-error-format").style.display).toBe('block');
    });

    test('Password without number', () => {
        document.body.innerHTML = passwordErrorFormat;
        expect(checkPasswordFormat("MONmotdepasse","password-error-format")).toBe(false);
        expect(document.getElementById("password-error-format").style.display).toBe('block');
    });

    test('Password with less than 8 caracters', () => {
        document.body.innerHTML = passwordErrorFormat;
        expect(checkPasswordFormat("MONmot2","password-error-format")).toBe(false);
        expect(document.getElementById("password-error-format").style.display).toBe('block');
    });

    test('Password with space', () => {
        document.body.innerHTML = passwordErrorFormat;
        expect(checkPasswordFormat("MON mot2","password-error-format")).toBe(false);
        expect(document.getElementById("password-error-format").style.display).toBe('block');
    });

    test('Password without good format', () => {
        document.body.innerHTML = passwordErrorFormat;
        expect(checkPasswordFormat("MONmotDEpasse3","password-error-format")).toBe(true);
        expect(document.getElementById("password-error-format").style.display).toBe('none');
    });

    test('Password visibility', () => {
        document.body.innerHTML = '<input className={("input-mpl") + (passwordValue ? " not-empty" : "")} ' +
            'id="password-input" type="password" value={passwordValue} onChange={(e) => setPasswordValue(e.target.value)}/>';
        showPassword("password-input");
        expect(document.getElementById("password-input").type).toBe("text");
        showPassword("password-input");
        expect(document.getElementById("password-input").type).toBe("password");
    });

});

