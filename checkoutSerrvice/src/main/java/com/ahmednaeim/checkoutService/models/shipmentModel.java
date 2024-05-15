package com.ahmednaeim.checkoutService.models;

public class shipmentModel {
    private int shippingAddressID;
    private String userID;

    private String shippingAddress;
    private String name;
    private String phoneNumber;
    private String country;
    private String city;



    public shipmentModel() {
    }

    public shipmentModel(int shippingAddressID, String userID, String shippingAddress, String name, String phoneNumber, String country, String city) {
        this.shippingAddressID = shippingAddressID;
        this.userID = userID;
        this.shippingAddress = shippingAddress;
        this.name = name;
        this.phoneNumber = phoneNumber;
        this.country = country;
        this.city = city;
    }

    public int getShippingAddressID() {
        return this.shippingAddressID;
    }

    public void setShippingAddressID(int shippingAddressID) {
        this.shippingAddressID = shippingAddressID;
    }
    public String getUserID() {
        return this.userID;
    }

    public void setUserID(String userID) {
        this.userID = userID;
    }

    public String getShippingAddress() {
        return this.shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }
    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }
 public String getPhoneNumber() {
        return this.phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
 public String getCountry() {
        return this.country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
 public String getCity() {
        return this.city;
    }

    public void setCity(String city) {
        this.city = city;
    }


}
