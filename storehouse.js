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

import { Product, Hoodie, Cap, Ring, Store, Category } from '../entities/entities.js';


//Declaración objeto StoreHouse mediante patrón Singleton
let StoreHouse = (function () { //La función anónima devuelve un método getInstance que permite obtener el objeto único
	let instantiated; //Objeto con la instancia única StoreHouse
	function init() { //Inicialización del Singleton
		class StoreHouse {
			//Definición de atributos privados del objeto
			#name; //nombre del StoreHouse
			#stores = []; //array con las tiendas: {store: Store, products: []}
			#categories = []; //array con las categorias: Category
			#products = []; //array con los productos {product: Product, category: #categories[x].title}
			constructor(name) {
				//La función se invoca con el operador new
				if (!new.target) throw new InvalidAccessConstructorException();
				// if (!name) throw new EmptyValueException("name");
				this.#name = name;
			}
			//Getter y setter de name
			get name() {
				return this.#name;
			}
			set name(value) {
				if (!value) throw new EmptyValueException("name");
				this.#name = value;
			}
			//Devuelve un iterator de las categorias
			get categories() {
				let array = this.#categories;
				return {
					*[Symbol.iterator]() {
						for (let arrCategories of array) {
							yield arrCategories;
						}
					}
				}
			}
			//Devuelve un iterator de las tiendas
			get stores() {
				let array = this.#stores;
				return {
					*[Symbol.iterator]() {
						for (let arrStores of array) {
							yield arrStores.store;
						}
					}
				}
			}
			get products() {
				let array = this.#products;
				return {
					*[Symbol.iterator]() {
						for (let arrStores of array) {
							yield arrStores.products;
						}
					}
				}
			}


			//Dado un product, devuelve la posición de esa categoria en categories o -1 si no lo encontramos.
			getCategoryPosition(category) {
				return this.#categories.findIndex(x => x.title == category.title);
			}

			getAmountOfCategories() {
				return this.#categories.length;
			}

			//Añade una nueva categoria en el almacén.
			addCategory(category) {
				if (!(category instanceof Category)) throw new CategoryStoreHouseException();
				let position = this.getCategoryPosition(category);
				if (position !== -1) throw new CategoryExistException(category);
				this.#categories.push(category);
				return this.#categories.length;
			}

			//Elimina un category si existe, sino lanzamos una excepción
			removeCategory(category) {
				if (!(category instanceof Category)) throw new CategoryStoreHouseException();
				let position = this.getCategoryPosition(category);
				if (position === -1) throw new CategoryNotExistException(category);
				this.#categories.splice(position, 1);
				return this.#categories.length;
			}

			// Dado un product, devuelve la posición de ese product en la tienda o -1 si no lo encontramos.
			getProductPosition(product) {
				return this.#products.findIndex(x => x.product.serial === product.serial);
			}

			//Añade un nuevo product en el carrito o incrementa su cantidad si ya existe. La cantidad es opcional.
			addProduct(product, category) {
				if (!(product instanceof Product)) throw new ProductStoreHouseException();
				if (!(category instanceof Category)) throw new CategoryStoreHouseException();

				let prodPos = this.getProductPosition(product);
				if (prodPos !== -1) throw new ProductExistException(product);

				let position = this.getCategoryPosition(category);
				if (position === -1) throw new CategoryNotExistException(category);

				//Añado el producto al array de productos
				this.#products.push({ product: product, category: this.#categories[position].title });
				return this.#products.length;
			}

			removeProduct(product) {
				if (!(product instanceof Product)) throw new ProductStoreHouseException();
				let position = this.getProductPosition(product);
				if (position === -1) throw new ProductNotExistException(product);	//si no existe sacamos una excepcion
				this.#products.splice(position, 1);		//lo eliminamos
				return this.#products.length;
			}

			//Dado un store, devuelve su posición en el almacen o -1 si no lo encontramos.
			getStorePosition(store) {
				return this.#stores.findIndex(x => x.store.cif === store.cif);
			}

			addStore(store) {
				if (!(store instanceof Store)) throw new StoreStoreHouseException();
				let storePosition = this.getStorePosition(store);	//posicion de la tienda en el array global stores
				if (storePosition !== -1) throw new StoreExistException(store);	//si no existe la tienda 
				this.#stores.push({ store: store, products: [] }) //la añadimos

				return this.#stores.length;
			}

			removeStore(store) {
				if (!(store instanceof Store)) throw new ProductStoreHouseException();
				let storePosition = this.getStorePosition(store);	//posicion de la tienda en el array global stores
				if (storePosition === -1) throw new StoreNotExistException(store); //si no existe la tienda excepcion
				this.#stores.splice(storePosition, 1) //la borramos

				return this.#stores.length;
			}

			addProductInShop(product, store, quantity) {
				if (!(product instanceof Product)) throw new ProductStoreHouseException();
				if (!(store instanceof Store)) throw new StoreStoreHouseException();
				if (quantity <= 0) throw new EmptyValueException("quantity");

				let prodPosition = this.getProductPosition(product);
				let storePosition = this.getStorePosition(store);
				if (storePosition === -1) throw new StoreNotExistException(store); 	//comprueba que la tienda esté incluida en el almacén
				if (prodPosition === -1) throw new ProductNotExistException(product); //comprueba que el producto esté en el almacén

				let productsInStore = [];
				productsInStore = this.#stores[storePosition].products;
				productsInStore.push({ product: product, stock: quantity });
				return this.#stores[storePosition].products.length;
			}


			addQuantityProductInShop(product, store, quantity = 1) {	//por defecto 1 de cantidad en stock
				if (!(product instanceof Product)) throw new ProductStoreHouseException();
				if (!(store instanceof Store)) throw new StoreStoreHouseException();
				if (quantity <= 0) throw new EmptyValueException("quantity");

				let prodPosition = this.getProductPosition(product);
				let storePosition = this.getStorePosition(store);
				if (storePosition === -1) throw new StoreNotExistException(store); 	//comprueba que la tienda esté incluida en el almacén
				if (prodPosition === -1) throw new ProductNotExistException(product); //comprueba que el producto esté en el almacén

				let productsInStore = [];
				productsInStore = this.#stores[storePosition].products;
				productsInStore.push({ product: product, stock: quantity });
				return this.#stores[storePosition].products.length;
			}

			//Devuelve la relación de los TODOS los productos de una categoría añadidos en una categoría con sus 
			//cantidades en stock, si pasamos un tipo de producto, se filtra el resultado por ese tipo.
			getCategoryProducts(category, product) {
				if (!(store instanceof Store)) throw new StoreStoreHouseException();
				if (!(category instanceof Category)) throw new CategoryStoreHouseException();

				let storePosition = this.getStorePosition(store);	//posicion de la tienda en el array global stores
				if (storePosition === -1) throw new StoreNotExistException(store);	//si no existe la tienda excepcion

				return this.getProductsInStore(this.#stores[storePosition].products);
			}

			//Devuelve un iterator de los productos de una tienda
			getProductsInStore(products) {
				return {
					*[Symbol.iterator]() {
						for (let product of products) {
							yield product;
						}
					}
				}
			}

			//Devuelve la relación de los TODOS los productos de una tienda,
			//si pasamos un tipo de producto, se filtra el resultado por ese tipo.
			getShopProducts(store, product) {
				if (!(store instanceof Store)) throw new StoreStoreHouseException();
				if (!(product instanceof Product)) throw new ProductStoreHouseException();

				let storePosition = this.getStorePosition(store);	//posicion de la tienda en el array global stores
				if (storePosition === -1) throw new StoreNotExistException(store);	//si no existe la tienda excepcion
				let typeProd = product.constructor.name;
				if (product.constructor.name === typeProd) {
					return this.getProductsInStore(this.#stores[storePosition].products);	//Devuelve todos los products + stock del array
				}
			}

		}
		Object.defineProperty(StoreHouse.prototype, "name", { enumerable: true });
		Object.defineProperty(StoreHouse.prototype, "stores", { enumerable: true });
		Object.defineProperty(StoreHouse.prototype, "categories", { enumerable: true });
		Object.defineProperty(StoreHouse.prototype, "products", { enumerable: true });

		let sc = new StoreHouse();//Devolvemos el objeto StoreHouse para que sea una instancia única.
		Object.freeze(sc);
		return sc;
	} //Fin inicialización del Singleton
	return {
		// Devuelve un objeto con el método getInstance
		getInstance: function () {
			if (!instantiated) { //Si la variable instantiated es undefined, priemera ejecución, ejecuta init.
				instantiated = init(); //instantiated contiene el objeto único
			}
			return instantiated; //Si ya está asignado devuelve la asignación.
		}
	};
})();

export default StoreHouse;
