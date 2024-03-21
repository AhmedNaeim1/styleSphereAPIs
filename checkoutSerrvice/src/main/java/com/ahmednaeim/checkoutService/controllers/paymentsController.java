package com.ahmednaeim.checkoutService.controllers;

import com.ahmednaeim.checkoutService.repository.paymentRepository;
import com.ahmednaeim.checkoutService.models.paymentModel;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payments")
public class paymentsController {
    private final paymentRepository paymentRepository;

    public paymentsController(
            paymentRepository paymentRepository) {
        this.paymentRepository = paymentRepository;
    }

    @GetMapping("/get-payments")
    public List<paymentModel> getAllPayments() {
        return paymentRepository.getAllPayments();
    }

    @DeleteMapping("/{paymentMethodID}/{userID}")
    public Boolean deletePayment(@PathVariable int paymentMethodID, @PathVariable int userID) {
        return paymentRepository.deletePayment(paymentMethodID, userID);
    }

    @PostMapping("/add-payment")
    public boolean addPayment(@RequestBody paymentModel payment) {
        return paymentRepository.addPayment(payment);
    }

    @GetMapping("/get-payment/{paymentMethodID}/{userID}")
    public paymentModel getPayment(@PathVariable int paymentMethodID,@PathVariable int userID) {
        return paymentRepository.getPaymentById(paymentMethodID,userID);
    }

    @PutMapping("/update-payment/{paymentMethodID}/{userID}")
    public boolean updatePayment(@PathVariable int paymentMethodID,@PathVariable int userID, @RequestBody paymentModel payment) {
        return paymentRepository.updatePayment(paymentMethodID,userID, payment);
    }

    @GetMapping("/get-user-payment/{userID}")
    public List<paymentModel> getUserPayments(@PathVariable int userID) {
        return paymentRepository.getUserPayments(userID);
    }
}
