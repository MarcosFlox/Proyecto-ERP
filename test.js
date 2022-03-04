import {
	BaseException,
	InvalidAccessConstructorException,
	CategoryStoreHouseException,
	EmptyValueException,
	CategoryExistException,
	CategoryNotExistException,
	ProductStoreHouseException,
	ProductExistException,
	ProductNotExistException,
	StoreExistException,
	StoreStoreHouseException,
	StoreNotExistException
} from './exceptions.js';
import StoreHouse from './storehouse.js';
import { Product, Hoodie, Cap, Ring, Store, Category, Coords } from '../entities/entities.js';

//Test 
//Creación de objetos:

//StoreHouse
let sc = StoreHouse.getInstance();

//Hoodies
let h1 = new Hoodie(1, "Hoodie1", "descrHod1", 11, 4, "", "Black", "Nike", "XL", "Cotton");
let h2 = new Hoodie(2, "Hoodie2", "descrHod2", 22, 4, "", "White", "Nike", "S", "Cotton");
let h3 = new Hoodie(3, "Hoodie3", "descrHod3", 33, 4, "", "Red", "Adidas", "M", "Polyester");
let h4 = new Hoodie(4, "Hoodie4", "descrHod4", 44, 4, "", "Orange", "Hummel", "L", "Cotton");

//Caps
let c1 = new Cap(5, "Cap1", "descrCap1", 11, 11, "", "NY", "Gold-Black", "NY Yankees");
let c2 = new Cap(6, "Cap2", "descrCap2", 22, 7, "", "Beret", "Gray", "Lacoste");
let c3 = new Cap(7, "Cap3", "descrCap3", 33, 4, "", "Bonnet", "Black", "Brshka");
let c4 = new Cap(8, "Cap4", "descrCap4", 44, 4, "", "MDLR Cap", "Red-White", "Nike");

//Rings
let r1 = new Ring(9, "Ring1", "descrRing1", 45, 4, "", "Chain", "Silver");
let r2 = new Ring(10, "Ring2", "descrRing2", 29, 4, "", "Spinner", "Steel");
let r3 = new Ring(11, "Ring3", "descrRing3", 99, 10, "", "Charm", "Gold");
let r4 = new Ring(12, "Ring4", "descrRing4", 125, 21, "", "Signet", "Gold Cover");

//Coords
let coords1 = new Coords(1, 2);
let coords2 = new Coords(100, 50);
let coords3 = new Coords(60, 40);
let coords4 = new Coords(90, 10);

//Categories
let cat1 = new Category("Accessory", "catDescr1");
let cat2 = new Category("WinterClothes", "catDescr2");
let cat3 = new Category("SummerClothes", "catDescr3");
let cat4 = new Category("AutumnClothes", "catDescr4");

//Stores
let store1 = new Store("A11122233", "store_name1", "address1", "666111333", coords1);
let store2 = new Store("B11122233", "store_name2", "address2", "777111333", coords2);
let store3 = new Store("C11122233", "store_name3", "address3", "888111333", coords3);
let store4 = new Store("D11122233", "store_name4", "address4", "999111333", coords4);


//addCategory
console.log("--TEST--");
console.log("addCategory:");
try {
	sc.addCategory(cat1);
	console.log("Category added: " + cat1.title);
} catch (e) {
	console.log(e.message);
}
try {
	sc.addCategory(h1);
} catch (e) {
	console.log(e.message);
}
try {
	sc.addCategory(cat1);
} catch (e) {
	console.log(e.message);
}

// removeCategory
console.log("");
console.log("removeCategory:");
try {
	sc.removeCategory(cat1);
	console.log("Category removed: " + cat1.title);
} catch (e) {
	console.log(e.message);
}
try {
	sc.removeCategory(cat1);
	console.log("Category removed: " + cat1.title);
} catch (e) {
	console.log(e.message);
}
try {
	sc.removeCategory(h1);
	console.log("Category removed: " + cat1.title);
} catch (e) {
	console.log(e.message);
}

//addProduct:
console.log("");
console.log("addProduct:");
try {
	sc.addCategory(cat1);
	sc.addProduct(h1, cat1);
	console.log("Product added: product: " + h1.name + ", category: " + cat1.title);
} catch (e) {
	console.log(e);
}
try {
	sc.addProduct(h1, cat1);
	console.log("Product added: product: " + h1.name + ", category: " + cat1.title);
} catch (e) {
	console.log(e.message);
}
try {
	sc.addProduct();
	console.log("Product added: product: " + h1.name + ", category: " + cat1.title);
} catch (e) {
	console.log(e.message);
}
try {
	sc.addProduct(h1);
	sc.addProduct(h1);
	console.log("Product added: product: " + h1.name + ", category: " + cat1.title);
} catch (e) {
	console.log(e.message);
}

//removeProduct:
console.log("");
console.log("removeProduct:");
try {
	sc.removeProduct(h1);
	sc.removeCategory(cat1);
	console.log("Product removed: " + h1.name);
} catch (e) {
	console.log(e.message);
}
try {
	sc.removeProduct(h1);
	console.log("Product removed: " + h1.name);
} catch (e) {
	console.log(e.message);
}
try {
	sc.removeProduct(cat1);
	console.log("Product removed: " + h1.name);
} catch (e) {
	console.log(e.message);
}

//addStore
console.log("");
console.log("addStore:");
try {
	sc.addStore(store1);
	console.log("Store added: " + store1.name);
} catch (e) {
	console.log(e.message);
}
try {
	sc.addStore(store1);
	console.log("Store added: " + store1.name);
} catch (e) {
	console.log(e.message);
}
try {
	sc.addStore(h1);
	console.log("Store added: " + store1.name);
} catch (e) {
	console.log(e.message);
}

//removeStore
console.log("");
console.log("removeStore:");
try {
	sc.removeStore(store1);
	console.log("Store removed: " + store1.name);
} catch (e) {
	console.log(e.message);
}
try {
	sc.removeStore(store1);
	console.log("Store removed: " + store1.name);
} catch (e) {
	console.log(e.message);
}


sc.addStore(store1);
sc.addStore(store2);
sc.addCategory(cat1);
sc.addCategory(cat2);
sc.addCategory(cat3);
sc.addCategory(cat4);
sc.addProduct(h1, cat1);
sc.addProduct(c1, cat2);
sc.addProduct(r1, cat3);

//addProductInShop
console.log("");
console.log("addProductInShop:");
try {
	sc.addProductInShop(h1, store1, 2);
	console.log("Added " + 2 + " products: " + h1.name + " in " + store1.name);
} catch (e) {
	console.log(e.message);
}
try {
	sc.addProductInShop(c1, store1, 5);
	console.log("Added " + 5 + " products: " + c1.name + " in " + store1.name);
} catch (e) {
	console.log(e.message);
}
try {
	sc.addProductInShop(h1, c1, 2);
	console.log("Added " + 2 + " products: " + h1.name + " in " + store1.name);
} catch (e) {
	console.log(e.message);
}
try {
	sc.addProductInShop(h1, store1, 0);
	console.log("Added " + 2 + " products: " + h1.name + " in " + store1.name);
} catch (e) {
	console.log(e.message);
}
try {
	sc.addProductInShop(cat1, store1, 0);
	console.log("Added " + 2 + " products: " + h1.name + " in " + store1.name);
} catch (e) {
	console.log(e.message);
}

//addQuantityProductInShop
console.log("");
console.log("addQuantityProductInShop:");
try {
	sc.addQuantityProductInShop(r1, store2);
	console.log("Added " + 1 + " product: " + r1.name + " in " + store2.name);
} catch (e) {
	console.log(e.message);
}
try {
	sc.addQuantityProductInShop(r1, store2, 4);
	console.log("Added " + 4 + " more products: " + r1.name + " in " + store2.name);
} catch (e) {
	console.log(e.message);
}
try {
	sc.addQuantityProductInShop(cat1, store2);
	console.log("Added " + 1 + " more product: " + r1.name + " in " + store2.name);
} catch (e) {
	console.log(e.message);
}
try {
	sc.addQuantityProductInShop(r1, cat2);
	console.log("Added " + 1 + " more product: " + r1.name + " in " + store2.name);
} catch (e) {
	console.log(e.message);
}
try {
	sc.addQuantityProductInShop(r1, store2, 0);
	console.log("Added " + 1 + " more product: " + r1.name + " in " + store2.name);
} catch (e) {
	console.log(e.message);
}

//getShopProducts:
console.log("");
console.log("getShopProducts:")
try {
	for (let prod of sc.getShopProducts(store1, h1)) {
		console.log("Tienda: " + store1.name + ". Producto: " + prod.product.name + ", Stock: " + prod.stock);
	}
} catch (e) {
	console.log(e.message);
}
try {
	for (let prod of sc.getShopProducts(cat1, h1)) {
		console.log("Tienda: " + store1.name + ". Producto: " + prod.product.name + ", Stock: " + prod.stock);
	}
} catch (e) {
	console.log(e.message);
}
try {
	for (let prod of sc.getShopProducts(store1, cat1)) {
		console.log("Tienda: " + store1.name + ". Producto: " + prod.product.name + ", Stock: " + prod.stock);
	}
} catch (e) {
	console.log(e.message);
}

console.log("");
console.log("Getters/Setters");
sc.name = "Almacen MFV";
console.log("StoreHouse name: " + sc.name);
console.log("");
console.log("Iterador de categorias");
for (let category of sc.categories) {
	console.log(category);
}
console.log("");
console.log("Iterador de tiendas");
for (let store of sc.stores) {
	console.log(store);
}


console.log("");
console.log(sc);
