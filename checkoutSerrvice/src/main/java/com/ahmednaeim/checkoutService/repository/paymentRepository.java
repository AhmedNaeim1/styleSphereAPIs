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
        try (PreparedStatement ps = con.prepareStatement("INSERT INTO Payments (PaymentMethodID, UserID, CardNumber, ExpirationDate,Name) VALUES (?, ?, ?, ?, ?)")) {
            ps.setInt(1, payment.getPaymentMethodID());
            ps.setString(2, payment.getUserID());

            ps.setString(3, payment.getCardNumber());
            ps.setString(4, payment.getExpirationDate());
            ps.setString( 5,payment.getName());


            int rowsAffected = ps.executeUpdate();
            return rowsAffected > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean updatePayment(int paymentMethodID,String userID, paymentModel payment) {
        try (PreparedStatement ps = con.prepareStatement("UPDATE Payments SET CardNumber = ?, ExpirationDate = ?, Name=? WHERE PaymentMethodID = ? AND UserID=?")) {
            ps.setString(1, payment.getCardNumber());
            ps.setString(2, payment.getExpirationDate());
            ps.setString( 3,payment.getName());
            ps.setInt(4, paymentMethodID);
            ps.setString(5, userID);

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
            String deleteQuery = "DELETE FROM Payments WHERE PaymentMethodID = ? AND UserID = ?";
            PreparedStatement deleteStatement = con.prepareStatement(deleteQuery);
            deleteStatement.setInt(1, paymentMethodID);
            deleteStatement.setString(2, userID);

            int rowsAffected = deleteStatement.executeUpdate();

            if (rowsAffected > 0) {

                if (paymentMethodID == 1 || paymentMethodID == 2) {
                    String updateQuery = "UPDATE Payments SET PaymentMethodID = PaymentMethodID - 1 WHERE UserID = ?";
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
