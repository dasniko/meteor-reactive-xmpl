Books = new Meteor.Collection("books");
Cart = new Meteor.Collection("cart");

if (Meteor.isClient) {

  Meteor.subscribe("books");
  Meteor.subscribe("cart");
  
  Template.books.events({
    "click .add": function() {
	  Meteor.call("addToCart", this.title, this.price)
	}
  });
  
  Template.books.allBooks = function() {
    return Books.find();
  };
  
  Template.cart.events({
    "click .reset": function() {
	  Meteor.call("resetCart");
	}
  });
  
  Template.cart.cartItems = function() {
	return Cart.find();
  };
  
  Template.cart.sum = function() {
	var sum = 0;
	Cart.find().forEach(function(item) {
	  sum += item.price;
	});
	return sum;
  };
  
  Template.cart.count = function() {
    return Cart.find().count();
  };
  
  Meteor.methods({
    addToCart: function(title, price) {
	  Cart.insert({title: title, price: price});
	}
  });
}

if (Meteor.isServer) {
  Meteor.methods({
    addToCart: function(title, price) {
	  for (var i=0; i<3000000000; i++) {} // this is just to "simulate" high server load...
	  Cart.insert({title: title, availability: "on stock", price: price});
	},
	resetCart: function() {
	  Cart.remove({});
	}
  });
  
  Meteor.publish("books", function() {
    return Books.find({}, {fields: {title: 1, price: 1}});
  });
  Meteor.publish("cart", function() {
    return Cart.find();
  });
  
  Meteor.startup(function() {
    Books.remove({});
    Books.insert({title: "Meteor in Action", stock: 5, price: 49.99});
	Books.insert({title: "Effective Meteor", stock: 3, price: 59.99});
	Books.insert({title: "Meteor in a Nutshell", stock: 6, price: 69.99});
	Books.insert({title: "Single Page Web-Apps", stock: 10, price: 30.00});
  });
}
