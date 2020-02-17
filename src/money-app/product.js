class Product {
    constructor(name, price, budget) {
        this.products = db.collection('money-app');
        this.budget = budget;
        this.name = name;
        this.price = price;
    } 
    async addProduct(name, price) { //dodaje produkt do firebase
        const now = new Date();
        const product = {
            name: name,
            price: price,
            created_at: firebase.firestore.Timestamp.fromDate(now),
        };
        const response = await this.products.add(product);
        return response;
    }
    getProducts(callback){ //pobiera liste z firebase
        this.products
            .orderBy("created_at", "desc")
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if(change.type === 'added'){
                        //udpate UI
                        callback(change.doc.data());
                    };
                });
        });
    }
    updateBudget(budget){
        this.budget = budget;
        localStorage.setItem('budget', budget);
    }
    async sumPrices(){
        return this.products.get().then(snapshot => {
            let totalCount = 0;
            snapshot.forEach(doc => {
            totalCount += doc.data().price;
            });
            const a = totalCount;
            return a;

        }).catch(err => console.log(err));
    };
};





export { Product as default };