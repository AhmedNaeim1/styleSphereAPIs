package com.ahmednaeim.checkoutService.repository;

import com.ahmednaeim.checkoutService.config.databaseConfig;
import com.ahmednaeim.checkoutService.models.paymentModel;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class paymentRepository {
    Connection con = databaseConfig.getConnection();
    Statement stmt = con.createStatement();

    public paymentRepository() throws SQLException {
    }

    public List<paymentModel> getAllPayments() {
        try (ResultSet rs = stmt.executeQuery("SELECT * FROM Payments")) {
            List<paymentModel> paymentList = new ArrayList<>();

            while (rs.next()) {
                paymentModel payment = new paymentModel();
                payment.setPaymentMethodID(rs.getInt("PaymentMethodID"));
                payment.setUserID(rs.getString("UserID"));
                payment.setName(rs.getString("Name"));
                payment.setCardNumber(rs.getString("CardNumber"));
                payment.setExpirationDate(rs.getString("ExpirationDate"));
                payment.setBillingAddress(rs.getString("BillingAddress"));
                paymentList.add(payment);
            }

            return paymentList;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public paymentModel getPaymentById(int paymentMethodID,String userID) {
        try (PreparedStatement ps = con.prepareStatement("SELECT * FROM Payments WHERE PaymentMethodID = ?  AND UserID = ?" )) {
            ps.setInt(1, paymentMethodID);
            ps.setString(2, userID);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                paymentModel payment = new paymentModel();
                payment.setPaymentMethodID(rs.getInt("PaymentMethodID"));
                payment.setUserID(rs.getString("UserID"));
                payment.setName(rs.getString("Name"));

                payment.setCardNumber(rs.getString("CardNumber"));
                payment.setExpirationDate(rs.getString("ExpirationDate"));
                payment.setBillingAddress(rs.getString("BillingAddress"));
                return payment;
            } else {
                return null;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public boolean addPayment(paymentModel payment) {
        try (PreparedStatement ps = con.prepareStatement("INSERT INTO Payments (PaymentMethodID, UserID, CardNumber, ExpirationDate, BillingAddress,Name) VALUES (?, ?, ?, ?, ?,?)")) {
            ps.setInt(1, payment.getPaymentMethodID());
            ps.setString(2, payment.getUserID());

            ps.setString(3, payment.getCardNumber());
            ps.setString(4, payment.getExpirationDate());
            ps.setString(5, payment.getBillingAddress());
            ps.setString( 6,payment.getName());


            int rowsAffected = ps.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean updatePayment(int paymentMethodID,String userID, paymentModel payment) {
        try (PreparedStatement ps = con.prepareStatement("UPDATE Payments SET CardNumber = ?, ExpirationDate = ?, BillingAddress = ?, Name=? WHERE PaymentMethodID = ? AND UserID=?")) {
            ps.setString(1, payment.getCardNumber());
            ps.setString(2, payment.getExpirationDate());
            ps.setString(3, payment.getBillingAddress());
            ps.setString( 4,payment.getName());
            ps.setInt(5, paymentMethodID);
            ps.setString(6, userID);

            int rowsAffected = ps.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<paymentModel> getUserPayments(String userID) {
        try (PreparedStatement ps = con.prepareStatement("SELECT * FROM Payments WHERE UserID = ?")) {
            ps.setString(1, userID);
            ResultSet rs = ps.executeQuery();

            List<paymentModel> userPayments = new ArrayList<>();
            while (rs.next()) {
                paymentModel payment = new paymentModel();
                payment.setPaymentMethodID(rs.getInt("PaymentMethodID"));
                payment.setUserID(rs.getString("UserID"));
                payment.setName(rs.getString("Name"));
                payment.setCardNumber(rs.getString("CardNumber"));
                payment.setExpirationDate(rs.getString("ExpirationDate"));
                payment.setBillingAddress(rs.getString("BillingAddress"));
                userPayments.add(payment);
            }

            return userPayments;
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }
    public boolean deletePayment(int paymentMethodID, String userID) {
        try {
            String query = "DELETE FROM Payments WHERE PaymentMethodID = " + paymentMethodID + " AND UserID = " + userID;
            int rowsAffected = stmt.executeUpdate(query);
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}
