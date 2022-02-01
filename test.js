//Test 
//Product
console.log("PRODUCT:")
p1 = new Product(1, "name", "description", 3, 21, "images");
console.log(p1.toString()); //Deberia saltar un error
//Subclases de product
console.log("SUBCLASES DE PRODUCT:")
h1 = new Hoodie(1, "Hoodie1", "descrHod", 33, 4, "", "Negro", "NIKE", "XL", "Cotton");
console.log(h1.toString());
c1 = new Cap(1, "Cap1", "descrCap", 10, 4, "", "Boina", "Negro", "NIKE");
console.log(c1.toString());
r1 = new Ring(1, "Ring1", "descrRing", 10, 4, "", "Normal", "Oro");
console.log(r1.toString());
//Coords
console.log("COORDS:")
coords1 = new Coords(1, 2);
coords1.latitude();		//1
coords1.longitude();	//2
