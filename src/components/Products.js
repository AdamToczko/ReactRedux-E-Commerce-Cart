import React, { Component } from 'react'

export default class Products extends Component {
    
    render() {
        
        const productItems = this.props.products.map(product =>
            
            <div className="col-md-4">
                <div className="thumbnail text-center" >
                    <a href={`#${product.id}`} onClick={(event)=> this.props.handleAddToCard(event,product)}>
                        <img src={`/products/${product.sku}_2.jpg`} alt={product.title} />
                        <p>
                            {product.title}
                        </p>
                    </a>
                    <div>
                        <b>$ {product.price} </b>
                        <button className="btn btn-primary btn-sm"
                        onClick={(event)=> this.props.handleAddToCard(event,product)}
                        > Add To Cart 
                        </button>
                    </div>
                </div>
            </div>
        )
        return (
            <div className="row">
                {productItems}
            </div>
        )
    }
}
