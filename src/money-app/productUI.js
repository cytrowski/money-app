class ProductUI {
    constructor(list){
        this.list = list;
    }
    render(data){
        if(data){
        const when = dateFns.format(data.created_at.toDate(), 'DD.MM.YYYY')
        const html = `
        <tr>
        <td>${when}</td>
        <td>${data.name}</td>
        <td>${data.price} $</td>
        </tr>
        `

        this.list.innerHTML += html;
    } else {
        this.list.innerHTML = '';
    }}
}

export { ProductUI as default };