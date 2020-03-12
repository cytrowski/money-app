import { format } from 'date-fns';

class ProductUI {
  constructor(list) {
    this.list = list;
  }
  render(data, id) {
    if (data) {
      const when = format(data.created_at.toDate(), 'dd.mm.yyyy');
      const html = `
        <tr data-id="${id}">
        <td>${when}</td>
        <td>${data.name}</td>
        <td>${data.price} $</td>
        <td><button class="exit-btn">X</button></td>
        </tr>
        `;

      this.list.innerHTML += html;
    } else {
      this.list.innerHTML = '';
    }
  }
  delete(id) {
    const tableTr = this.list.querySelectorAll('tr');
    tableTr.forEach(doc => {
      if (doc.getAttribute('data-id') === id) {
        doc.remove();
      }
    });
  }
}

export default ProductUI;
