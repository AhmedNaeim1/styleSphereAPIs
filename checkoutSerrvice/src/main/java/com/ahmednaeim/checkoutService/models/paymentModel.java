package com.ahmednaeim.checkoutService.models;

public class paymentModel {
    private int paymentMethodID;
    private String userID;
    private String name;

    private String cardNumber;
    private String expirationDate;


    public paymentModel() {
    }

    public paymentModel(int paymentMethodID,String userID,String name, String cardNumber, String expirationDate) {
        this.paymentMethodID = paymentMethodID;
        this.userID = userID;
        this.name = name;
        this.cardNumber = cardNumber;
        this.expirationDate = expirationDate;
    }

    public int getPaymentMethodID() {
        return this.paymentMethodID;
    }

    public void setPaymentMethodID(int paymentMethodID) {
        this.paymentMethodID = paymentMethodID;
    }
    public String getUserID() {
        return this.userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
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
    }


}

