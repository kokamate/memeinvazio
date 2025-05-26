const iconPlus = document.querySelector('.fixed');
///console.log(iconPlus);

iconPlus.addEventListener('click', () => {
    window.location.href = '../html/newMeme.html';
});

window.addEventListener('DOMContentLoaded', getMemes);

async function getMemes() {
    const res = await fetch('http://127.0.0.1:3000/api/memes/getMemes', {
        method: 'GET',
        credentials: 'include'
    });

    const memes = await res.json();
    renderMemes(memes);
}

function renderMemes(memes) {
    const row = document.querySelector('.row');
    row.innerHTML = '';
    console.log(row, memes);
    memes.forEach(meme => {
        const likeIcon =

            meme.alreadyLiked === 0
            ? `<i class="fa-solid fa-thumbs-up" onclick="vote(${meme.upload_id})"></i>`
            : `<i class="fa-solid fa-thumbs-up like" onclick="devote(${meme.upload_id})"></i>`

        row.innerHTML += `
        <div class="card">
            <div class="card-header">
                <img src="http://127.0.0.1:3000/uploads/${meme.profile_pic}" alt="${meme.name}">
                ${meme.name}
            </div>
            <div class="card-body">
                <div class="pic-div">
                    <img src="http://127.0.0.1:3000/uploads/${meme.meme}" alt="${meme.meme}">
                </div>
            </div>
            <div class="card-footer">
            <span>${meme.like}</span>
            ${likeIcon}
            </div>
        </div>
        `;
    });
}

async function vote(upload_id){
    console.log(upload_id)
    const response = await fetch(`http://127.0.0.1:3000/api/likes/like/${upload_id}`,{
        method: 'POST',
        credentials: 'include'
    });

    const data = response.json();
    if (response.ok) {
        getMemes();
    }else {
        alert(data.error);
    }
}

async function devote(upload_id){
    console.log(upload_id)
    const response = await fetch(`http://127.0.0.1:3000/api/likes/unlike/${upload_id}`,{
        method: 'DELETE',
        credentials: 'include'
    });

    const data = response.json();
    if (response.ok) {
        getMemes();
    }else {
        alert(data.error);
    }
}