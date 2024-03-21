package com.ahmednaeim.checkoutService.models;

public class shipmentModel {
    private int shippingAddressID;
    private int userID;

    private String shippingAddress;
    private String preferredShippingMethod;



    public shipmentModel() {
    }

    public shipmentModel(int shippingAddressID, int userID, String shippingAddress, String preferredShippingMethod) {
        this.shippingAddressID = shippingAddressID;
        this.userID = userID;
        this.shippingAddress = shippingAddress;
        this.preferredShippingMethod = preferredShippingMethod;
    }

    public int getShippingAddressID() {
        return this.shippingAddressID;
    }

    public void setShippingAddressID(int shippingAddressID) {
        this.shippingAddressID = shippingAddressID;
    }
    public int getUserID() {
        return this.userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public String getShippingAddress() {
        return this.shippingAddress;
    }

    public void setShippingAddress(String shippingAddress) {
        this.shippingAddress = shippingAddress;
    }public String getPreferredShippingMethod() {
        return this.preferredShippingMethod;
    }

    public void setPreferredShippingMethod(String preferredShippingMethod) {
        this.preferredShippingMethod = preferredShippingMethod;
    }


}
