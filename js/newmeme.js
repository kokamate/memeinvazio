//const iconHome = document.getElementsByClassName('icon-home')[0];
const iconHome = document.querySelector('.icon-home');
const iconLogout = document.querySelector('.icon-logout');
const iconProfil = document.querySelector('.icon-user');
const fileUpload = document.querySelector('#fileUpload');
const uploadButton = document.querySelector('.uploadButton');
let meme = null;
const newmeme = document.querySelector('.newmeme');

uploadButton.addEventListener('click', uploadmeme)

fileUpload.addEventListener('change', selectPicture);

iconLogout.addEventListener('click', logout);


iconHome.addEventListener('click', () => {
    window.location.href = '../html/home.html';
});

iconProfil.addEventListener('click', () => {
    window.location.href = '../html/profile.html';
});

function selectPicture() {
    const file = fileUpload.files[0];
    console.log(file);

    if(file) {
        meme = file;
        const reader = new FileReader();
        reader.onload = (event) => {
            newmeme.style.backgroundImage = `url('${event.target.result}')`
        }
        reader.readAsDataURL(file);
    }
}

async function logout() {
    const response = await fetch('http://127.0.0.1:3000/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
    });

    console.log(response);
    const data = await response.json();
    console.log(data);
    if(response.ok) {
        window.location.href = '../index.html';
    }else {
        alert('Hiba a kijelentkezéskor! ')
    }
}

async function uploadmeme() {
    if (meme) {
        const formData = new FormData;
        formData.append('meme', meme);
        console.log(formData);

        try {
            const response = await fetch('http://127.0.0.1:3000/api/memes/uploadMeme', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            console.log(response);
        } catch (error) {
            console.log(error);
            alert('Nem várt hiba!');
        }

    }else {
        alert('Válassz ki egy képet!');
    }
}