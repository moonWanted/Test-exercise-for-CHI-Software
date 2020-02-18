import React from 'react';
import styled from 'styled-components';
import Popup from "reactjs-popup";


const Container = styled.div`
    border: 1px solid lightgrey;
    display: flex;
    background-color: white;
    font-size: 0.2em;
    text-align: left;
    margin: 10px;
    padding: 10px;
`;

const InvestButton = styled.button`
    margin-left: auto;
    width: 80px;
    height: 20px;
`;

const PopupForm = styled.div`
    background-color: #f5f5f5;
    text-align: left;
    font-size: 1.2em;

`;

const AmountInput = styled.input`
    margin-right: 30px;
`;

const InvestedSign = styled.div`
    color: green;
    font-size: 1.2em;
`;

export default class Loan extends React.Component {
    render() {
        return (
            <Container>
                <div>
                    <h3>
                        {this.props.loanData.title}
                    </h3>
                    <p>Tranche {this.props.loanData.tranche}</p>
                    <p>The available amount for the loan {this.props.loanData.available}£</p>
                    <p>Annualised return {this.props.loanData.annualised_return}%</p>
                    <p>Lifetime Value {this.props.loanData.ltv}£</p>
                    <p>Total amount {this.props.loanData.amount}£</p>
                </div>

                <div style={{
                    'display': 'flex',
                    'margin-left': 'auto',
                    'flex-direction': 'column',
                    'align-items': 'center',
                    'justify-content': 'center'
                }}>
                    <Popup trigger={<InvestButton>INVEST</InvestButton>}
                           modal
                           contentStyle={{width: '15%'}}
                           closeOnDocumentClick
                    >
                        {close => (
                            <PopupForm>
                                <h2>Invest in Loan</h2>
                                <p>{this.props.loanData.title}</p>
                                <p>Amount available: £{this.props.loanData.available}</p>
                                <p>Loan ends in: {Math.floor(this.props.loanData.term_remaining / 86400)} days</p>
                                <p>Investment amount (£)</p>
                                <div>
                                    <AmountInput type="number" required={true}></AmountInput>
                                    <InvestButton
                                        id={this.props.loanData.id}
                                        onClick={(e) => {
                                            close();
                                            this.props.investHandler(e);
                                        }}>
                                        Invest</InvestButton>
                                </div>
                            </PopupForm>
                        )}
                    </Popup>
                    {this.props.loanData.isInvested ? <InvestedSign>Invested</InvestedSign> : ''}
                </div>
            </Container>
        )
    }
}
