class ProductUI {
    constructor(list){
        this.list = list;
    }
    render(data){
        const when = dateFns.format(data.created_at.toDate(), 'DD.MM.YYYY')
        const html = `
        <tr>
        <td>${when}</td>
        <td>${data.name}</td>
        <td>${data.price} $</td>
        </tr>
        `

        this.list.innerHTML += html;
    }
}

export { ProductUI as default };