var menu = new Vue({
    el: '#menu',
    data: {
        menuItems: [
            {
                name: 'StartUps',
                href: 'index.html',
                active: false
            },
            {
                name: 'Resultados',
                href: 'results.html',
                active: false
            }
        ]
    }
});