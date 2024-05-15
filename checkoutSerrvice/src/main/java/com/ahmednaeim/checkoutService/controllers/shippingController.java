package com.ahmednaeim.checkoutService.controllers;

import com.ahmednaeim.checkoutService.models.shipmentModel;
import com.ahmednaeim.checkoutService.repository.shippingRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/shipping")
public class shippingController {
    private final shippingRepository shippingRepository;

    public shippingController(
            shippingRepository shippingRepository) {
        this.shippingRepository = shippingRepository;
    }

    @GetMapping("/get-shipments")
    public List<shipmentModel> getAllShipments() {
        return shippingRepository.getAllShipments();
    }

    @DeleteMapping("/{shippingAddressID}/{userID}")
    public Boolean deleteShipment(@PathVariable int shippingAddressID, @PathVariable String userID) {
        return shippingRepository.deleteShipment(shippingAddressID, userID);
    }

    @PostMapping("/add-shipment")
    public boolean addShipment(@RequestBody shipmentModel shipment) {
        return shippingRepository.addShipment(shipment);
    }

    @GetMapping("/get-shipment/{shippingAddressID}/{userID}")
    public shipmentModel getShipment(@PathVariable int shippingAddressID, @PathVariable String userID) {
        return shippingRepository.getShipmentById(shippingAddressID, userID);
    }

    @PutMapping("/update-shipment/{shippingAddressID}/{userID}")
    public boolean updateShipment(@PathVariable int shippingAddressID, @PathVariable String userID, @RequestBody shipmentModel shipment) {
        return shippingRepository.updateShipment(shippingAddressID, userID, shipment);
    }


    @GetMapping("/get-user-shipments/{userID}")
    public List<shipmentModel> getUserShipments(@PathVariable String userID) {
        return shippingRepository.getUserShipments(userID);
    }
}
