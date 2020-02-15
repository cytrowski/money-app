class Product {
    constructor() {
        this.products = db.collection('money-app');
    } 
    async addProduct(name, price) { //dodaje produkt do firebase
        const now = new Date();
        const product = {
            name: name,
            price: price,
            created_at: firebase.firestore.Timestamp.fromDate(now)
        };
        const response = await this.products.add(product);
        return response;
    }
    getProducts(callback){ //pobiera liste z firebase
        this.products
            .orderBy('created_at')
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if(change.type === 'added'){
                        //udpate UI
                        callback(change.doc.data());
                    };
                });
        });
    }
}





export { Product as default };