package com.ahmednaeim.checkoutService.models;

public class paymentModel {
    private int paymentMethodID;
    private int userID;

    private String cardNumber;
    private String expirationDate;
    private String billingAddress;


    public paymentModel() {
    }

    public paymentModel(int paymentMethodID,int userID, String cardNumber, String expirationDate, String billingAddress) {
        this.paymentMethodID = paymentMethodID;
        this.userID = userID;
        this.cardNumber = cardNumber;
        this.expirationDate = expirationDate;
        this.billingAddress = billingAddress;
    }

    public int getPaymentMethodID() {
        return this.paymentMethodID;
    }

    public void setPaymentMethodID(int paymentMethodID) {
        this.paymentMethodID = paymentMethodID;
    }
    public int getUserID() {
        return this.userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public String getCardNumber() {
        return this.cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }public String getExpirationDate() {
        return this.expirationDate;
    }

    public void setExpirationDate(String expirationDate) {
        this.expirationDate = expirationDate;
    }public String getBillingAddress() {
        return this.billingAddress;
    }

    public void setBillingAddress(String billingAddress) {
        this.billingAddress = billingAddress;
    }



}

