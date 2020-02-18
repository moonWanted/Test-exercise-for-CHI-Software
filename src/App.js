import React, {Component} from 'react';
import styled from 'styled-components'
import './App.css';
import Loan from './Components/Loan';


const initialData = {
    "loans": [
        {
            "id": "1",
            "title": "Voluptate et sed tempora qui quisquam.",
            "tranche": "A",
            "available": "11,959",
            "annualised_return": "8.60",
            "term_remaining": "864000",
            "ltv": "48.80",
            "amount": "85,754"
        },
        {
            "id": "5",
            "title": "Consectetur ipsam qui magnam minus dolore ut fugit.",
            "tranche": "B",
            "available": "31,405",
            "annualised_return": "7.10",
            "term_remaining": "1620000",
            "ltv": "48.80",
            "amount": "85,754"
        },
        {
            "id": "12",
            "title": "Dolores repudiandae ut voluptas unde laborum quaerat et sapiente.",
            "tranche": "C",
            "available": "12,359",
            "annualised_return": "4.80",
            "term_remaining": "879000",
            "ltv": "48.80",
            "amount": "85,754"
        }
    ]
};
let InitialTotalAvailableAmount = 0;
initialData.loans.forEach(item => InitialTotalAvailableAmount += parseFloat(item.available.replace(/[,]/g, '')));

const Container = styled.div`
    font-size: 1.5em;
    color: #282c34;
    border: 1px solid lightgrey;
    background-color: #f5f5f5;
    border-radius: 2px;
    width: 550px;
    height: 850px;
    display: flex;
    outline: none;
    justify-content: center;
    flex-direction: column;
    text-align: center;
`;
const TotalAmount = styled.div`
  font-size: 0.5em;
`;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            "loans": initialData.loans,
            totalAvailableAmount: InitialTotalAvailableAmount
        }
        this.investHandler = this.investHandler.bind(this);
    }

    investHandler(event) {
        let newLoans = [];
        let newTotalAvailableAmount = 0;
        if (event.target.previousSibling.value === '' || event.target.previousSibling.value <= 0) {
            return;
        } else {
            this.state.loans.forEach(item => {
                if (event.target.id === item.id) {
                    item.available = Number(item.available.replace(/[,]/g, '')) - event.target.previousSibling.value;
                    item.available = item.available.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                    item.isInvested = true;
                    newLoans.push(item);
                    newTotalAvailableAmount = this.state.totalAvailableAmount - event.target.previousSibling.value;
                } else {
                    newLoans.push(item);
                }
            });

            this.setState({
                loans: newLoans,
                totalAvailableAmount: newTotalAvailableAmount
            });
        }
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <Container>
                        <h4>Current Loans</h4>
                        {this.state.loans.map((item) => {
                            return <Loan key={item.id} loanData={item} investHandler={this.investHandler}/>
                        })}
                        <TotalAmount>Total amount available for
                            investments: {this.state.totalAvailableAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</TotalAmount>
                    </Container>
                </header>
            </div>
        );
    }
}

export default App;
