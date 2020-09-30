import React from 'react'
import { Link } from 'react-router-dom'

class Stock extends React.Component {
    render() {
        return (
            <>
                <h3>Name: {this.props.stock.name} </h3>
                <p>Shares: {this.props.stock.shares} Price: {this.props.stock.price.toFixed(2)} Position: ${this.props.stock.position.toFixed(2)} </p>
                <Link to={{
                        pathname:'/dashboard/trade',
                        stock:{ 
                            stock: this.props.stock.ticker
                        }
                    }}>TRADE
                </Link>

            </>
        )
    }
}

export default Stock;