class ProductUI {
    constructor(list){
        this.list = list;
    }
    render(data, id){
        if(data){
        const when = dateFns.format(data.created_at.toDate(), 'DD.MM.YYYY')
        const html = `
        <tr data-id="${id}">
        <td>${when}</td>
        <td>${data.name}</td>
        <td>${data.price} $</td>
        <td><button class="exit-btn">X</button></td>
        </tr>
        `

        this.list.innerHTML += html;
    } else {
        this.list.innerHTML = '';
    }};
    delete(table, id){ // its okey?
        console.log(table);
        table.forEach(product => {
            if(product.getAttribute('data-id') === id){
                console.log(product);
                product.remove();
            }
        })
    }
}

export { ProductUI as default };