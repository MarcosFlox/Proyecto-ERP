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
		super("Constructor can’t be called as a function.", fileName, lineNumber);
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
		super(`Error: The class  ${className} is abstract.`, fileName, lineNumber);
		this.className = className;
		this.name = "AbstractClassException";
	}
}

class StoreHouseException extends BaseException {
	constructor(fileName, lineNumber) {
		super("Error: StoreHouse Exception.", fileName, lineNumber);
		this.name = "StoreHouseException";
	}
}

class CategoryStoreHouseException extends StoreHouseException {
	constructor(fileName, lineNumber) {
		super("Error: The method needs a Category parameter.", fileName, lineNumber);
		this.name = "CategoryStoreHouseException";
	}
}

class CategoryExistsException extends StoreHouseException {
	constructor(category, fileName, lineNumber) {
		super("Error: The category exists in the storehouse yet. " + category.title, fileName, lineNumber);
		this.name = "ProductStoreHouseException";
		this.category = category;
	}
}

class CategoryNotExistException extends StoreHouseException {
	constructor(category, fileName, lineNumber) {
		super("Error: The category doesn't exist in storehouse. " + category.title, fileName, lineNumber);
		this.name = "CategoryShoppingCartException";
		this.category = category;
	}
}

class ProductStoreHouseException extends StoreHouseException {
	constructor (fileName, lineNumber){
		super("Error: The method needs a Product parameter.", fileName, lineNumber);
		this.name = "ProductStoreHouseException";
	} 
}

class ProductNotExistException extends StoreHouseException {
	constructor (product, fileName, lineNumber){
		super("Error: The product doesn't exist in the storehouse. " + product.serial, fileName, lineNumber);
		this.name = "ProductStoreHouseException";
		this.product = product;
	}
}

class StoreStoreHouseException extends StoreHouseException {
	constructor (fileName, lineNumber){
		super("Error: The method needs a Store parameter.", fileName, lineNumber);
		this.name = "StoreStoreHouseException";
	} 
}

class StoreNotExistException extends StoreHouseException {
	constructor (store, fileName, lineNumber){
		super("Error: The store doesn't exist in the storehouse. " + store.cif, fileName, lineNumber);
		this.name = "StoreStoreHouseException";
		this.store = store;
	}
}
