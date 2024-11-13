// Load XML from the external file
fetch('https://raw.githubusercontent.com/carlospalrio/cartaxml/main/data.xml')
    .then(response => response.text())
    .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "application/xml");
        displayMenu(xml);
    })
    .catch(error => console.log('Error fetching XML:', error));

// Function to display the menu
function displayMenu(xml) {
    const menuContainer = document.getElementById('menu');
    const groups = xml.getElementsByTagName('GRUP');

    Array.from(groups).forEach(group => {
        // Create group container
        const groupDiv = document.createElement('div');
        groupDiv.classList.add('GRUP');

        // Group name (Entrants, Principals, Postres)
        const groupName = document.createElement('h2');
        groupName.textContent = group.getElementsByTagName('NOM')[0].textContent;
        groupDiv.appendChild(groupName);

        // Dishes in each group
        const dishes = group.getElementsByTagName('PLAT');
        Array.from(dishes).forEach(dish => {
            const dishDiv = document.createElement('div');
            dishDiv.classList.add('PLAT');

            // Dish name
            const name = document.createElement('p');
            name.classList.add('NOM');
            name.textContent = dish.getElementsByTagName('NOM')[0].textContent;
            dishDiv.appendChild(name);

            // Dish description
            const description = document.createElement('p');
            description.classList.add('DESCRIPCIO');
            description.textContent = dish.getElementsByTagName('DESCRIPCIO')[0].textContent;
            dishDiv.appendChild(description);

            // Dish price
            const price = document.createElement('p');
            price.classList.add('PREU');
            price.textContent = `${dish.getElementsByTagName('PREU')[0].textContent} €`;
            dishDiv.appendChild(price);

            // Append dish to group
            groupDiv.appendChild(dishDiv);
        });

        // Append group to menu
        menuContainer.appendChild(groupDiv);
    });
}
