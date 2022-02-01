//Test 
//Product
console.log("PRODUCT:");
let p1 = new Product(1, "name", "description", 3, 21, "images");
console.log(p1.toString()); //Deberia saltar un error
//Subclases de product
console.log("SUBCLASES DE PRODUCT:")
let h1 = new Hoodie(1, "Hoodie1", "descrHod", 33, 4, "", "Negro", "NIKE", "XL", "Cotton");
console.log(h1.toString());
let c1 = new Cap(1, "Cap1", "descrCap", 10, 4, "", "Boina", "Negro", "NIKE");
console.log(c1.toString());
let r1 = new Ring(1, "Ring1", "descrRing", 10, 4, "", "Normal", "Oro");
console.log(r1.toString());
//Coords
console.log("COORDS:");
let coords1 = new Coords(1, 2);
consol.log(coords1.toString());
//Category
console.log("CATEGORY:");
let cat1 = new Category("Accesorio", "catDescr");
console.log(cat1.toString());
//Store
console.log("STORE:");
let store1 = new Store("A11122233", "name", "address", "666111333", "coords1");
console.log(store1.toString());
//StoreHouse
console.log("STOREHOUSE:");
function testShoppingCart() {
	let h1 = new Hoodie(1, "Hoodie1", "descrHod", 33, 4, "", "Negro", "NIKE", "XL", "Cotton");
	let c1 = new Cap(1, "Cap1", "descrCap", 10, 4, "", "Boina", "Negro", "NIKE");
	let r1 = new Ring(1, "Ring1", "descrRing", 10, 4, "", "Normal", "Oro");
	let coords1 = new Coords(1, 2);
	let cat1 = new Category("Accesorio", "catDescr");
	let cat2 = new Category("Ropa", "catDescr");
	let store1 = new Store("A11122233", "name", "address", "666111333", coords1);
	let sc = StoreHouse.getInstance();
	sc.name = "Almacen";
	console.log(sc.name);

	console.log("addCategory");
	try {
		sc.addCategory(cat1);	//la añade
	} catch {
		console.log("e");
	}
	try {
		sc.addCategory(cat1);	//la añade
		sc.addCategory(cat1);	//error CategoryExistsException
	} catch {
		console.log("e");
	}
	try {
		sc.addCategory(h1);		//error CategoryStoreHouseException
	} catch {
		console.log("e");
	}
	try {
		sc.addCategory();		//error EmptyValueException
	} catch {
		console.log("e");
	}

	console.log("removeCategory");
	try {
		sc.addCategory(cat1);
		sc.removeCategory(cat1);	//la elimina
	} catch (e) {
		console.log("e");
	}
	try {
		sc.removeCategory(cat1);	//error CategoryNotExistException, ya que no la he añadido anteriormente
	} catch (e) {
		console.log("e");
	}
	try {
		sc.removeCategory(h1);		//error CategoryStoreHouseException
	} catch (e) {
		console.log("e");
	}
	try {
		sc.removeCategory();		//error EmptyValueException
	} catch (e) {
		console.log("e");
	}

	console.log("addProduct");
	try {
		sc.addProduct(c1, cat2);	//lo añade correctamente
	} catch (e) {
		console.log("e");
	}
	try {
		sc.addProduct("", cat2);	//EmptyValueException: product no puede ser null
	} catch (e) {
		console.log("e");
	}

	console.log("removeProduct");
	try {
		sc.addProduct(c1, cat2);	//lo añade correctamente
		sc.removeProduct(c1);		//lo elimina correctamente
	} catch (e) {
		console.log("e");
	}
	try {
		sc.removeProduct(c1);		//ProductNotExistException
	} catch (e) {
		console.log("e");
	}

	console.log("addProductInShop");
	try{
		sc.addProduct(r1);
		sc.addCategory(cat1);
		sc.addStore(store1);
		sc.addProductInShop(r1, cat1, store1);	//lo añade correctamente
	} catch(e){
		console.log("e");
	}
	try{
		sc.addCategory(cat1);
		sc.addStore(store1);
		sc.addProductInShop(r1, cat1, store1);	
	} catch(e){
		console.log("e");	//ProductNotExistsException
	}
	try{
		sc.addProduct(r1);
		sc.addCategory(cat1);
		sc.addProductInShop(r1, cat1, store1);	
	} catch(e){
		console.log("e");	//StoreNotExistsException
	}
	try{
		sc.addProduct(r1);
		sc.addStore(store1);
		sc.addProductInShop(r1, cat1, store1);	
	} catch(e){
		console.log("e");	//CategoryNotExistsException
	}
	
	console.log("addQuantityProductInShop");
	try{
		sc.addProduct(r1);
		sc.addCategory(cat1);
		sc.addStore(store1);
		sc.addProductInShop(r1, cat1, store1);		
		sc.addQuantityProductInShop(r1, store1, 5);	//lo añade correctamente
	}catch (e) {
		console.log("e");	
	}
	try{
		sc.addCategory(cat1);
		sc.addStore(store1);
		sc.addProductInShop(r1, cat1, store1);		
		sc.addQuantityProductInShop(r1, store1, 5);	
	}catch (e) {
		console.log("e");	//ProductNotExistException
	}
	try{
		sc.addProduct(r1);
		sc.addCategory(cat1);
		sc.addProductInShop(r1, cat1, store1);		
		sc.addQuantityProductInShop(r1, store1, 5);	
	}catch (e) {
		console.log("e");	//StoreNotExistException
	}
	try{
		sc.addProduct(r1);
		sc.addCategory(cat1);
		sc.addStore(store1);
		sc.addProductInShop(r1, cat1, store1);		
		sc.addQuantityProductInShop(r1, store1, -4);	
	}catch (e) {
		console.log("e");	//InvalidValueException
	}

	console.log("addShop");
	try{
		sc.addStore(store1);	//lo añade correctamente
	} catch (e) {
		console.log("e");
	}
	try{
		sc.addStore(store1);
		sc.addStore(store1);	
	} catch (e) {
		console.log("e");	//StoreExistException
	}
	try{
		sc.addStore(h1);	
	} catch (e) {
		console.log("e");	//InvalidValueException
	}

	console.log("removeStore");
	try{
		sc.addStore(store1);
		sc.removeStore(store1);	//lo elimina correctamente
	} catch (e) {
		console.log("e");
	}
	try{
		sc.removeStore(store1);	
	} catch (e) {
		console.log("e");	//StoreNotExistException
	}

	console.log("getStoreProducts");
	try{
		sc.addProduct(r1);
		sc.addProduct(h1);
		sc.addCategory(cat1);
		sc.addStore(store1);
		sc.addProductInShop(r1, store1, 4);
		sc.addProductInShop(h1, store1, 2);
		sc.getStoreProducts(store1, cat1);	//muestra el iterador correctamente
	} catch (e) {
		console.log("e");	
	}
	
	console.log("Getter/Setter name");
	console.log(sc.name);
	console.log("Getter categories");
	console.log(sc.getCategories());
	console.log("Getter shops");
	console.log(sc.getShops());
}
