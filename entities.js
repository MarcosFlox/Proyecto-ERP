


//Category
class Category {
    #title;
    #description;
    constructor(title, description) {
        //La función se invoca con el operador new
        if (!new.target) throw new InvalidAccessConstructorException();

        //Validación de parámetros obligatorios
        if (!title) throw new EmptyValueException("title");

        //Definición de atributos privados del objeto
        this.#title = title;
        this.#description = description;
    }

    //Propiedades de acceso a los atributos privados
    get title() {
        return this.#title;
    }
    set title(value) {
        if (!value) throw new EmptyValueException("title");
        this.#title = value;
    }

    get description() {
        return this.#description;
    }
    set description(value) {
        if (!value) throw new EmptyValueException("description");
        this.#description = value;
    }

    toString() {
        return "Title: " + this.title + " Description: " + this.description;
    }
}
Object.defineProperty(Category.prototype, "title", { enumerable: true });
Object.defineProperty(Category.prototype, "description", { enumerable: true });

//Product
(function () {
    let abstractCreateLock = true; //Definición del cerrojo.
    //Constructor de Product. Permite definir propiedades comunes para todos los productos de la tienda.
    class Product {
        //Campos privados
        #serial;
        #name;
        #description;
        #price;
        #taxPercentage;
        #images;
        constructor(serial, name, description, price, taxPercentage = Product.IVA, images) {
            //La función se invoca con el operador new
            if (!new.target) throw new InvalidAccessConstructorException();
            if (abstractCreateLock)
                throw new AbstractClassException("Product");
            abstractCreateLock = true; //Reactivamos el cerrojo.

            //Validación de parámetros obligatorios
            if (!serial) throw new EmptyValueException("serial");
            if (!name) throw new EmptyValueException("name");
            if (!description) throw new EmptyValueException("description");
            price = Number.parseFloat(price);
            if (!price || price <= 0) throw new InvalidValueException("price", price);
            if (!taxPercentage || taxPercentage < 0) throw new InvalidValueException("taxPercentage", taxPercentage);
            // if (!images) throw new EmptyValueException("images");

            //Definición de atributos privados del objeto
            this.#serial = serial;
            this.#name = name;
            this.#description = description;
            this.#price = price;
            this.#taxPercentage = taxPercentage;
            this.#images = images;
        }

        //Propiedades de acceso a los atributos privados
        get serial() {
            return this.#serial;
        }
        set serial(value) {
            if (!value) throw new EmptyValueException("serial");
            this.#serial = value;
        }

        get name() {
            return this.#name;
        }
        set name(value) {
            if (!value) throw new EmptyValueException("name");
            this.#name = value;
        }

        get description() {
            return this.#description;
        }
        set description(value) {
            if (!value) throw new EmptyValueException("description");
            this.#description = value;
        }

        get price() {
            return this.#price;
        }
        set price(value) {
            value = Number.parseFloat(value);
            if (Number.isNaN(value) && value > 0) throw new InvalidValueException("price", value);
            this.#price = value;
        }

        get taxPercentage() {
            return this.#taxPercentage;
        }
        set taxPercentage(value = Product.IVA) {
            if (!value || value < 0) throw new InvalidValueException("taxPercentage", value);
            this.#taxPercentage = value;
        }

        //Propiedades estáticas.
        static get IVA() {
            return 21;
        }

        get images() {
            return this.#images;
        }
        set images(value) {
            if (!value) throw new EmptyValueException("images");
            this.#images = value;
        }
    }
    Object.defineProperty(Product.prototype, "serial", { enumerable: true });
    Object.defineProperty(Product.prototype, "name", { enumerable: true });
    Object.defineProperty(Product.prototype, "description", { enumerable: true, writable: true });
    Object.defineProperty(Product.prototype, "price", { enumerable: true });
    Object.defineProperty(Product.prototype, "taxPercentage", { enumerable: true });
    Object.defineProperty(Product.prototype, "images", { enumerable: true });

    //Definimos la subclases 
    class Hoodie extends Product {
        //Atributos privados
        #color;
        #brand;
        #size;
        #material;
        constructor(serial, name, description, price, taxPercentage = Product.IVA, images, color = "unknown", brand = "unknown", size = "-", material = "unknown") {
            //La función se invoca con el operador new
            if (!new.target) throw new InvalidAccessConstructorException();
            //Llamada al superconstructor.
            abstractCreateLock = false; //Desactivamos el cerrojo.
            super(serial, name, description, price, taxPercentage, images);     //Product.name sería el modelo (nombre de la hoodie)

            //Validación de argumentos
            if (!color) throw new EmptyValueException("color");
            if (!brand) throw new EmptyValueException("brand");
            if (!size) throw new EmptyValueException("size");
            //material no lo considero obligatorio

            //Atributos privados
            this.#color = color;
            this.#brand = brand;
            this.#size = size;
            this.#material = material;
        }

        //Propiedades de acceso a los atributos privados
        get color() {
            return this.#color;
        }
        set color(value) {
            if (!value) throw new EmptyValueException("color");
            this.#color = value;
        }

        get brand() {
            return this.#brand;
        }
        set brand(value) {
            if (!brand) throw new EmptyValueException("brand");
            this.#brand = value;
        }

        get size() {
            return this.#size;
        }
        set size(value) {
            if (!size) throw new EmptyValueException("size");
            this.#size = value;
        }

        get material() {
            return this.#material;
        }
        set material(value) {
            if (!material) throw new EmptyValueException("brand");
            this.#material = value;
        }

        //Métodos públicos
        toString() {
            return " Hoodie Info: Name: " + this.name + ", Brand: " + this.brand + ", Size: " + this.size + ", Color: " + this.color + ", Material: " + this.material + ", Price: " + this.price + "€";
        }
    }
    Object.defineProperty(Hoodie.prototype, "color", { enumerable: true });
    Object.defineProperty(Hoodie.prototype, "brand", { enumerable: true });
    Object.defineProperty(Hoodie.prototype, "size", { enumerable: true });
    Object.defineProperty(Hoodie.prototype, "material", { value: "Unknown", enumerable: true });

    h1 = new Hoodie(1, "DelPSG", "ta flama", 33, 4, "", "Negro", "NIKE", "XL", "Cotton");
    console.log(h1.toString());

    //Cap
    class Cap extends Product {
        //Atributos privados
        #color;
        #brand;
        #type;
        constructor(serial, name, description, price, taxPercentage = Product.IVA, images, type = "unknown", color = "unknown", brand = "unknown") {
            //La función se invoca con el operador new
            if (!new.target) throw new InvalidAccessConstructorException();
            //Llamada al superconstructor.
            abstractCreateLock = false; //Desactivamos el cerrojo.
            super(serial, name, description, price, taxPercentage, images);     //Product.name sería el modelo (nombre de la hoodie)

            //Validación de argumentos
            if (!type) throw new EmptyValueException("size");
            if (!color) throw new EmptyValueException("color");
            if (!brand) throw new EmptyValueException("brand");

            //Atributos privados
            this.#type = type;
            this.#color = color;
            this.#brand = brand;
        }

        //Propiedades de acceso a los atributos privados
        get type() {
            return this.#type;
        }
        set type(value) {
            if (!value) throw new EmptyValueException("type");
            this.#type = value;
        }

        get color() {
            return this.#color;
        }
        set color(value) {
            if (!value) throw new EmptyValueException("color");
            this.#color = value;
        }

        get brand() {
            return this.#brand;
        }
        set brand(value) {
            if (!value) throw new EmptyValueException("brand");
            this.#brand = value;
        }

        //Métodos públicos
        toString() {
            return " Cap Info: Name: " + this.name + ", Brand: " + this.brand + ", Type: " + this.type + ", Color: " + this.color + ", Price: " + this.price + "€";
        }
    }
    Object.defineProperty(Cap.prototype, "type", { enumerable: true });
    Object.defineProperty(Cap.prototype, "color", { enumerable: true });
    Object.defineProperty(Cap.prototype, "brand", { enumerable: true });

    c1 = new Cap(1, "Cap1", "ta flama", 10, 4, "", "Boina", "Negro", "NIKE");
    console.log(c1.toString());

    class Subclase3 extends Product {
    }
})(); //Invocamos la función global.

//Coords
class Coords {
    #latitude;
    #longitude;
    constructor(latitude, longitude) {
        //La función se invoca con el operador new
        if (!new.target) throw new InvalidAccessConstructorException();

        //Validación de parámetros obligatorios
        if (!latitude) throw new EmptyValueException("latitude");
        if (!longitude) throw new EmptyValueException("longitude");

        //Definición de atributos privados del objeto
        this.#latitude = latitude;
        this.#longitude = longitude;
    }

    //Propiedades de acceso a los atributos privados
    get latitude() {
        return this.#latitude;
    }
    set latitude(value) {
        if (!value) throw new EmptyValueException("latitude");
        this.#latitude = value;
    }

    get longitude() {
        return this.#longitude;
    }
    set longitude(value) {
        if (!value) throw new EmptyValueException("longitude");
        this.#longitude = value;
    }

    toString() {
        return "Longitude: " + this.latitude + " Latitude: " + this.longitude;
    }
}
// Object.defineProperty(Coords.prototype, "latitude", { enumerable: true });
// Object.defineProperty(Coords.prototype, "longitude", { enumerable: true });

//Store
class Store {
    #cif;
    #name;
    #address;
    #phone;
    #coords;
    constructor(cif, name, address, phone, coords) {
        //La función se invoca con el operador new
        if (!new.target) throw new InvalidAccessConstructorException();

        //Validación de parámetros obligatorios
        if (!cif) throw new EmptyValueException("cif");
        if (!name) throw new EmptyValueException("name");
        if (!address) throw new EmptyValueException("address");
        if (!phone) throw new EmptyValueException("phone");
        if (!coords) throw new EmptyValueException("coords");
        if (!(coords instanceof Coords)) throw new InvalidValueException("coords");

        //Definición de atributos privados del objeto
        this.#cif = cif;
        this.#name = name;
        this.#address = address;
        this.#phone = phone;
        this.#coords = coords;
    }

    //Propiedades de acceso a los atributos privados
    get cif() {
        return this.#cif;
    }
    set cif(value) {
        if (!value) throw new EmptyValueException("cif");
        this.#cif = value;
    }

    get name() {
        return this.#name;
    }
    set name(value) {
        if (!value) throw new EmptyValueException("name");
        this.#name = value;
    }

    get address() {
        return this.#address;
    }
    set address(value) {
        if (!value) throw new EmptyValueException("address");
        this.#address = value;
    }

    get phone() {
        return this.#phone;
    }
    set phone(value) {
        if (!value) throw new EmptyValueException("phone");
        this.#phone = value;
    }

    get coords() {
        return this.#coords;
    }
    set coords(value) {
        if (!value) throw new EmptyValueException("coords");
        if (!(value instanceof Coords)) throw new InvalidValueException("coords");
        this.#coords = value;
    }
}
// Object.defineProperty(Store.prototype, "cif", { enumerable: true });
// Object.defineProperty(Store.prototype, "name", { enumerable: true });
// Object.defineProperty(Store.prototype, "address", { enumerable: true });
// Object.defineProperty(Store.prototype, "phone", { enumerable: true });
// Object.defineProperty(Store.prototype, "coords", { enumerable: true });
