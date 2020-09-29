import React from 'react'

class Stock extends React.Component {
    render() {
        return (
            <>
                <h3>Name: {this.props.stock.name} </h3>
                <p>Shares: {this.props.stock.shares} Price: {this.props.stock.price} Position: ${this.props.stock.position} </p>

            </>
        )
    }
}

export default Stock;