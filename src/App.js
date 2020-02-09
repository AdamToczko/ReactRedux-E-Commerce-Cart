import React from 'react';
import './App.css';
import Products from './components/Products';
import Filter from './components/Filter';


class App extends React.Component {

  state = { 
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

    handleChangeSort = (e) => {
      this.setState({ sort: e.target.value });
      this.listProducts();
    }
    handleChangeSize = (e) => {
      this.setState({ size: e.target.value });
      this.listProducts();
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
            Basket goes here
          </div>
 
        </div>
 
      </div>
    );
  }
}
export default App;
