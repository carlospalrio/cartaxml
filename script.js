
fetch('https://raw.githubusercontent.com/carlospalrio/cartaxml/main/data.xml')
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "application/xml");
        displayMenu(xml);
    })
    .catch(error => console.log('Error fetching XML:', error));

function displayMenu(xml) {
    const menuContainer = document.getElementById('menu');
    const groups = xml.getElementsByTagName('GRUP');

    Array.from(groups).forEach(group => {
        const groupDiv = document.createElement('div');
        groupDiv.classList.add('GRUP');
        const groupName = document.createElement('h2');
        groupName.textContent = group.getElementsByTagName('NOM')[0].textContent;
        groupDiv.appendChild(groupName);
        const dishes = group.getElementsByTagName('PLAT');
        Array.from(dishes).forEach(dish => {
            const dishDiv = document.createElement('div');
            dishDiv.classList.add('PLAT');

            const name = document.createElement('p');
            name.classList.add('NOM');
            name.textContent = dish.getElementsByTagName('NOM')[0].textContent;
            dishDiv.appendChild(name);
            const description = document.createElement('p');
            description.classList.add('DESCRIPCIO');
            description.textContent = dish.getElementsByTagName('DESCRIPCIO')[0].textContent;
            dishDiv.appendChild(description);

            const price = document.createElement('p');
            price.classList.add('PREU');
            price.textContent = `${dish.getElementsByTagName('PREU')[0].textContent} €`;
            dishDiv.appendChild(price);

            groupDiv.appendChild(dishDiv);
        });
        menuContainer.appendChild(groupDiv);
    });
}
