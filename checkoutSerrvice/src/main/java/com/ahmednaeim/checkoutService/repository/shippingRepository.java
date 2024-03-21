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
                shipment.setUserID(rs.getInt("UserID"));
                shipment.setShippingAddress(rs.getString("ShippingAddress"));
                shipment.setPreferredShippingMethod(rs.getString("PreferredShippingMethod"));
                shipmentList.add(shipment);
            }

            return shipmentList;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public shipmentModel getShipmentById(int shippingAddressID, int userID) {
        try (PreparedStatement ps = con.prepareStatement("SELECT * FROM ShippingAddress WHERE ShippingAddressID = ? AND UserID = ?")) {
            ps.setInt(1, shippingAddressID);
            ps.setInt(2, userID);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                shipmentModel shipment = new shipmentModel();
                shipment.setShippingAddressID(rs.getInt("ShippingAddressID"));
                shipment.setUserID(rs.getInt("UserID"));
                shipment.setShippingAddress(rs.getString("ShippingAddress"));
                shipment.setPreferredShippingMethod(rs.getString("PreferredShippingMethod"));
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
        try (PreparedStatement ps = con.prepareStatement("INSERT INTO ShippingAddress (ShippingAddressID, UserID, ShippingAddress, PreferredShippingMethod) VALUES (?, ?, ?, ?)")) {
            ps.setInt(1, shipment.getShippingAddressID());
            ps.setInt(2, shipment.getUserID());
            ps.setString(3, shipment.getShippingAddress());
            ps.setString(4, shipment.getPreferredShippingMethod());

            int rowsAffected = ps.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean updateShipment(int shippingAddressID, int userID, shipmentModel shipment) {
        try (PreparedStatement ps = con.prepareStatement("UPDATE ShippingAddress SET ShippingAddress = ?, PreferredShippingMethod = ? WHERE ShippingAddressID = ? AND UserID = ?")) {
            ps.setString(1, shipment.getShippingAddress());
            ps.setString(2, shipment.getPreferredShippingMethod());
            ps.setInt(3, shippingAddressID);
            ps.setInt(4, userID);

            int rowsAffected = ps.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<shipmentModel> getUserShipments(int userID) {
        try (PreparedStatement ps = con.prepareStatement("SELECT * FROM ShippingAddress WHERE UserID = ?")) {
            ps.setInt(1, userID);
            ResultSet rs = ps.executeQuery();

            List<shipmentModel> userShipments = new ArrayList<>();
            while (rs.next()) {
                shipmentModel shipment = new shipmentModel();
                shipment.setShippingAddressID(rs.getInt("ShippingAddressID"));
                shipment.setUserID(rs.getInt("UserID"));
                shipment.setShippingAddress(rs.getString("ShippingAddress"));
                shipment.setPreferredShippingMethod(rs.getString("PreferredShippingMethod"));
                userShipments.add(shipment);
            }

            return userShipments;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public boolean deleteShipment(int shippingAddressID, int userID) {
        try {
            String query = "DELETE FROM ShippingAddress WHERE ShippingAddressID = " + shippingAddressID + " AND UserID = " + userID;
            int rowsAffected = stmt.executeUpdate(query);
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}
