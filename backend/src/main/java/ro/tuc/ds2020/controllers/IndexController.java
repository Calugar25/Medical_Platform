package ro.tuc.ds2020.controllers;

import com.sun.xml.bind.v2.model.core.ID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2020.entities.Medication;
import ro.tuc.ds2020.entities.MedicationPlan;
import ro.tuc.ds2020.entities.Patient;
import ro.tuc.ds2020.repositories.PatientRepository;

import javax.transaction.Transactional;
import java.util.List;


@RestController
@CrossOrigin
public class IndexController {
    @Autowired
    PatientRepository patientRepository;


    @GetMapping(value = "/")
    public ResponseEntity<String> getStatus() {
        return new ResponseEntity<>("City APP Service is running...", HttpStatus.OK);
    }
    @Transactional
    @GetMapping(value = "/test")
    public String getTestString() {
        Patient pat=patientRepository.findByUsername("pat");
       List <MedicationPlan> md=pat.getMedicationPlan();
       return md.get(0).getMedications().get(0).getName();
    }
}
