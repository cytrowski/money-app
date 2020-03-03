class Product {
    constructor(name, price, budget, user) {
        this.products = db.collection('users');
        this.budget = budget;
        this.name = name;
        this.price = price;
        this.user = user;
    } 
    async addProduct(name, price, user) { //dodaje produkt do firebase
        const now = new Date();
        const product = {
            name: name,
            price: price,
            created_at: firebase.firestore.Timestamp.fromDate(now),
        };
        const response = await this.products.doc(user).collection('products').add(product);
        return response;
    }
    getProducts(callback, user){ //pobiera liste z firebase
        this.products.doc(user).collection('products')
            .orderBy("created_at", "desc")
            .onSnapshot(snapshot => {
                snapshot.docChanges().forEach(change => {
                    if(change.type === 'added'){
                        //udpate UI
                        
                        callback(change.doc.data(), change.doc.id);
                    } else if(change.type === 'removed') {

                        // console.log(tableTr[0])

                        // callback(change.doc.data(), change.doc.id); 
                        
                    };
                });
        });
    }
    updateBudget(budget, user){
        this.budget = budget;
        db.collection('users').doc(user).update({budget: budget});

    }
    async sumPrices(user){
        let finish = [];
        this.products.doc(user).collection('products').onSnapshot(snapshot => {
            let totalCount = 0;
            snapshot.forEach(doc => {
            totalCount += doc.data().price;
            });
            const a = totalCount;
            finish.push(a);
            return finish;
        })
        return finish;
    };

        
};





export { Product as default };