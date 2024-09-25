const bar = document.getElementById('barra');
const close = document.getElementById('fechar');
const nav = document.getElementById('nav-barra');

if(bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active')
    })
}

if (fechar) {
    fechar.addEventListener('click', () => {
        nav.classList.remove('active')
    })
}

document.addEventListener('click', function(event) {
    const isClickInsideNav = nav.contains(event.target); 
    const isClickOnBar = bar.contains(event.target);  

    if (!isClickInsideNav && !isClickOnBar) {
        nav.classList.remove('active');
    }
});

