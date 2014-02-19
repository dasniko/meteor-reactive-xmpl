Books = new Meteor.Collection("books");
Cart = new Meteor.Collection("cart");

if (Meteor.isClient) {
  
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
	  for (var i=0; i<1200000000; i++) {} // this is just to "simulate" high server load...
	  Cart.insert({title: title, availability: "on stock", price: price});
	},
	resetCart: function() {
	  Cart.remove({});
	}
  });
  Meteor.startup(function() {
    Books.remove({});
    Books.insert({title: "Meteor in Action", price: 49.99});
	Books.insert({title: "Effective Meteor", price: 59.99});
	Books.insert({title: "Meteor in a Nutshell", price: 69.99});
  });
}
