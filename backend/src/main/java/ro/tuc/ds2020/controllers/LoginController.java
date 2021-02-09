package ro.tuc.ds2020.controllers;


import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import ro.tuc.ds2020.entities.*;
import ro.tuc.ds2020.repositories.CaregiverRepository;
import ro.tuc.ds2020.repositories.DoctorInterface;
import ro.tuc.ds2020.repositories.PatientRepository;
import ro.tuc.ds2020.repositories.UserRepository;

import javax.swing.*;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
public class LoginController {
    @Autowired
    UserRepository userRepository;
    @Autowired
    PatientRepository patientRepository;
    @Autowired
    DoctorInterface doctorRepository;
    @Autowired
    CaregiverRepository caregiverRepository;





    @ResponseBody
    @RequestMapping(value = "/login2", method = RequestMethod.POST)
    public User getDescription(@RequestBody LoginViewModel loginViewModel) {
        User user = userRepository.findByUsername(loginViewModel.getUsername());
        String expression = user.getRoles();
        if (user.getPassword().equals(loginViewModel.getPassword())) {
            switch (expression) {
                case "PATIENT":
                    Patient patient = patientRepository.findByUsername(loginViewModel.getUsername());

                    return new Patient(patient.getUsername(), patient.getName(), patient.getAddress(), patient.getGender(), patient.getBirthDate(), patient.getMedicalRecord(), patient.getRoles());

                case "DOCTOR":
                    Doctor doctor = doctorRepository.findByUsername(loginViewModel.getUsername());
                    return new Doctor(doctor.getUsername(), doctor.getName(), doctor.getAddress(), doctor.getBirthDate(), doctor.getGender(), doctor.getRoles());

                case "CAREGIVER":
                    Caregiver caregiver = caregiverRepository.findByUsername(loginViewModel.getUsername());
                default:
                    return null;

            }


        }else
        {
            return null;
        }

    }
}