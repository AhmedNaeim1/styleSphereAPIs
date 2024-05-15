package com.ahmednaeim.checkoutService.repository;

import com.ahmednaeim.checkoutService.config.databaseConfig;
import com.ahmednaeim.checkoutService.models.shipmentModel;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class shippingRepository {
    Connection con = databaseConfig.getConnection();
    Statement stmt = con.createStatement();

    public shippingRepository() throws SQLException {
    }

    public List<shipmentModel> getAllShipments() {
        try (ResultSet rs = stmt.executeQuery("SELECT * FROM ShippingAddress")) {
            List<shipmentModel> shipmentList = new ArrayList<>();

            while (rs.next()) {
                shipmentModel shipment = new shipmentModel();
                shipment.setShippingAddressID(rs.getInt("ShippingAddressID"));
                shipment.setUserID(rs.getString("UserID"));
                shipment.setShippingAddress(rs.getString("ShippingAddress"));
                shipment.setName(rs.getString("Name"));
                shipment.setPhoneNumber(rs.getString("PhoneNumber"));
                shipment.setCountry(rs.getString("Country"));
                shipment.setCity(rs.getString("City"));
                shipmentList.add(shipment);
            }

            return shipmentList;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public shipmentModel getShipmentById(int shippingAddressID, String userID) {
        try (PreparedStatement ps = con.prepareStatement("SELECT * FROM ShippingAddress WHERE ShippingAddressID = ? AND UserID = ?")) {
            ps.setInt(1, shippingAddressID);
            ps.setString(2, userID);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                shipmentModel shipment = new shipmentModel();
                shipment.setShippingAddressID(rs.getInt("ShippingAddressID"));
                shipment.setUserID(rs.getString("UserID"));
                shipment.setShippingAddress(rs.getString("ShippingAddress"));
                shipment.setName(rs.getString("Name"));
                shipment.setPhoneNumber(rs.getString("PhoneNumber"));
                shipment.setCountry(rs.getString("Country"));
                shipment.setCity(rs.getString("City"));
                return shipment;
            } else {
                return null;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public boolean addShipment(shipmentModel shipment) {
        try (PreparedStatement ps = con.prepareStatement("INSERT INTO ShippingAddress (ShippingAddressID, UserID, ShippingAddress, Name,PhoneNumber,Country,City) VALUES (?, ?, ?, ?,?, ?, ?)")) {
            ps.setInt(1, shipment.getShippingAddressID());
            ps.setString(2, shipment.getUserID());
            ps.setString(3, shipment.getShippingAddress());
            ps.setString(4, shipment.getName());
            ps.setString(5, shipment.getPhoneNumber());
            ps.setString(6, shipment.getCountry());
            ps.setString(7, shipment.getCity());

            int rowsAffected = ps.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean updateShipment(int shippingAddressID, String userID, shipmentModel shipment) {
        try (PreparedStatement ps = con.prepareStatement("UPDATE ShippingAddress SET ShippingAddress = ?, Name = ?,PhoneNumber=?,Country=?,City=? WHERE ShippingAddressID = ? AND UserID = ?")) {
            ps.setString(1, shipment.getShippingAddress());
            ps.setString(2, shipment.getName());
            ps.setString(3, shipment.getPhoneNumber());
            ps.setString(4, shipment.getCountry());
            ps.setString(5, shipment.getCity());
            ps.setInt(6, shippingAddressID);
            ps.setString(7, userID);


            int rowsAffected = ps.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<shipmentModel> getUserShipments(String userID) {
        try (PreparedStatement ps = con.prepareStatement("SELECT * FROM ShippingAddress WHERE UserID = ?")) {
            ps.setString(1, userID);
            ResultSet rs = ps.executeQuery();

            List<shipmentModel> userShipments = new ArrayList<>();
            while (rs.next()) {
                shipmentModel shipment = new shipmentModel();
                shipment.setShippingAddressID(rs.getInt("ShippingAddressID"));
                shipment.setUserID(rs.getString("UserID"));
                shipment.setShippingAddress(rs.getString("ShippingAddress"));
                shipment.setName(rs.getString("Name"));
                shipment.setPhoneNumber(rs.getString("PhoneNumber"));
                shipment.setCountry(rs.getString("Country"));
                shipment.setCity(rs.getString("City"));

                userShipments.add(shipment);
            }

            return userShipments;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public boolean deleteShipment(int shippingAddressID, String userID) {
        try {


            String deleteQuery = "DELETE FROM ShippingAddress WHERE ShippingAddressID = ? AND UserID = ?";
            PreparedStatement deleteStatement = con.prepareStatement(deleteQuery);
            deleteStatement.setInt(1, shippingAddressID);
            deleteStatement.setString(2, userID);

            int rowsAffected = deleteStatement.executeUpdate();

            if (rowsAffected > 0) {

                if (shippingAddressID == 1 || shippingAddressID == 2) {
                    String updateQuery = "UPDATE ShippingAddress SET ShippingAddressID = shippingAddressIDa - 1 WHERE UserID = ?";
                    PreparedStatement updateStatement = con.prepareStatement(updateQuery);
                    updateStatement.setString(1, userID);
                    updateStatement.executeUpdate();
                }

                return true;
            } else {
                return false;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}
