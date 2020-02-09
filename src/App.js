import React from 'react';
import './App.css';
import Products from './components/Products';
import Filter from './components/Filter';
import Basket from './components/Basket';


class App extends React.Component {

  state = { 
    size: "",
    sort: "",
    cartItems: [],
    products: [],
    filteredProducts: []
    };

    componentWillMount() {
      fetch('http://localhost:8000/products')
      .then(res => res.json())
      .then(data => 
        this.setState({
          products: data,
          filteredProducts: data
        })
      )
    }


    handleAddToCart = (e, product) => {
      this.setState(state => {
        const cartItems = state.cartItems;
        let productAlreadyInCart = false;
  
        cartItems.forEach(cp => {
          if (cp.id === product.id) {
            cp.count += 1;
            productAlreadyInCart = true;
          }
        });
  
        if (!productAlreadyInCart) {
          cartItems.push({ ...product, count: 1 });
        }
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        return { cartItems: cartItems };
      });
    };
// need to update this method to remove 1 item not all items under this id 
    handleRemoveFromCart = (e, product) => {
      this.setState(state => {
        const cartItems = state.cartItems.filter(a => a.id !== product.id);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        return { cartItems: cartItems };
      })
    }


    handleChangeSort = (e) => {
      this.setState({ sort: e.target.value });
      this.listProducts();
    }
    handleChangeSize = (e) => {
      this.setState({ size: e.target.value });
      this.listProducts();
    }

    listProducts = () => {
      this.setState(state => {     
        if (state.sort !== '') {
           state.products.sort((a, b) =>
            (state.sort === 'lowest'
              ? ((a.price > b.price) ? 1 : -1)
              : ((a.price < b.price) ? 1 : -1)));
        } else{
           state.products.sort((a, b)=> (a.id > b.id) ? 1 : -1);
        } 
        if (state.size !== '') {
          return { filteredProducts:state.products.filter(a => a.availableSizes.indexOf(state.size.toUpperCase()) >= 0)}
        }
        return { filteredProducts: state.products };
      })
    }



  render() {
    return (
      <div className="container">
        <h1>E-commerce Shopping Cart Application</h1>
        <hr />
        <div className="row">
          <div className="col-md-8">
            <Filter size={this.state.size} sort={this.state.sort} 
            handleChangeSize={this.handleChangeSize} handleChangeSort={this.handleChangeSort}
            count={this.state.filteredProducts.length} 
            />
            <hr />
            <Products products={this.state.filteredProducts} handleAddToCart={this.handleAddToCart} />
          </div>
          <div className="col-md-4">
            <Basket cartItems={this.state.cartItems} handleRemoveFromCart={this.handleRemoveFromCart} />
          </div>
 
        </div>
 
      </div>
    );
  }
}
export default App;
