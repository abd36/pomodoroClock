const mins = document.getElementById('mins');
const secs = document.getElementById('secs');
const footer = document.getElementById('footerDiv');

mins.textContent = '25';
secs.textContent = '00';

for (let i = 0; i < 23; i++) {
    let name = document.createElement('a');
    name.href = 'https://github.com/abd36/';
    name.target = '_blank';
    name.classList.add('footerText');
    name.textContent = '@abd36'
    footer.appendChild(name);
}