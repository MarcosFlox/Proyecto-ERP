'use strict';

class BaseException extends Error {
	constructor(message = "", fileName, lineNumber) {
		super(message, fileName, lineNumber);
		this.name = "BaseException";
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, BaseException)
		}
	}
}

//Excepción acceso inválido a constructor
class InvalidAccessConstructorException extends BaseException {
	constructor(fileName, lineNumber) {
		super("Constructor can't be called as a function.", fileName, lineNumber);
		this.name = "InvalidAccessConstructorException";
	}
}

//Excepción personalizada para indicar valores vacios.
class EmptyValueException extends BaseException {
	constructor(param, fileName, lineNumber) {
		super("Error: The parameter " + param + " can't be empty.", fileName, lineNumber);
		this.param = param;
		this.name = "EmptyValueException";
	}
}

//Excepción de valor inválido
class InvalidValueException extends BaseException {
	constructor(param, value, fileName, lineNumber) {
		super(`Error: The paramenter ${param} has an invalid value. (${param}: ${value})`, fileName, lineNumber);
		this.param = param;
		this.name = "EmptyValueException";
	}
}

//Excepción personalizada para clases abstractas.
class AbstractClassException extends BaseException {
	constructor(className, fileName, lineNumber) {
		super(`Error: The class ${className} is abstract.`, fileName, lineNumber);
		this.className = className;
		this.name = "AbstractClassException";
	}
}

// class StoreHouseException extends BaseException {
// 	constructor(fileName, lineNumber) {
// 		super("Error: StoreHouse Exception.", fileName, lineNumber);
// 		this.name = "StoreHouseException";
// 	}
// }

class CategoryStoreHouseException extends BaseException {
	constructor(fileName, lineNumber) {
		super("Error: The method needs a Category parameter.", fileName, lineNumber);
		this.name = "CategoryStoreHouseException";
	}
}

class CategoryExistException extends BaseException {
	constructor(category, fileName, lineNumber) {
		super("Error: The category exists in the storehouse yet: " + category.title, fileName, lineNumber);
		this.name = "CategoryExistException";
		this.category = category;
	}
}

class CategoryNotExistException extends BaseException {
	constructor(category, fileName, lineNumber) {
		super("Error: The category doesn't exist in storehouse: " + category.title, fileName, lineNumber);
		this.name = "CategoryShoppingCartException";
		this.category = category;
	}
}

class ProductStoreHouseException extends BaseException {
	constructor(fileName, lineNumber) {
		super("Error: The method needs a Product parameter.", fileName, lineNumber);
		this.name = "ProductStoreHouseException";
	}
}

class ProductExistException extends BaseException {
	constructor(product, fileName, lineNumber) {
		super("Error: The product exists in the storehouse yet: " + product.name, fileName, lineNumber);
		this.name = "ProductStoreHouseException";
		this.product = product;
	}
}

class ProductNotExistException extends BaseException {
	constructor(product, fileName, lineNumber) {
		super("Error: The product doesn't exist in the storehouse: " + product.name, fileName, lineNumber);
		this.name = "ProductStoreHouseException";
		this.product = product;
	}
}

class StoreStoreHouseException extends BaseException {
	constructor(fileName, lineNumber) {
		super("Error: The method needs a Store parameter.", fileName, lineNumber);
		this.name = "StoreStoreHouseException";
	}
}

class StoreNotExistException extends BaseException {
	constructor(store, fileName, lineNumber) {
		super("Error: The store doesn't exist in the storehouse: " + store.name, fileName, lineNumber);
		this.name = "StoreStoreHouseException";
		this.store = store;
	}
}

class StoreExistException extends BaseException {
	constructor(store, fileName, lineNumber) {
		super("Error: The store exists in the storehouse yet: " + store.name, fileName, lineNumber);
		this.name = "StoreStoreHouseException";
		this.store = store;
	}
}
export{
	BaseException,
	InvalidAccessConstructorException,
	EmptyValueException,
	InvalidValueException,
	AbstractClassException,
	CategoryStoreHouseException,
	CategoryExistException,
	CategoryNotExistException,
	ProductStoreHouseException,
	ProductExistException,
	ProductNotExistException,
	StoreStoreHouseException,
	StoreNotExistException,
	StoreExistException
};
