package ro.tuc.ds2020;


import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ro.tuc.ds2020.entities.Caregiver;
import ro.tuc.ds2020.entities.Doctor;
import ro.tuc.ds2020.entities.Patient;
import ro.tuc.ds2020.repositories.UserRepository;
@Service
public class DbInit  implements CommandLineRunner {
    private UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public DbInit(UserRepository userRepository,PasswordEncoder passwordEncoder)
    {
        this.userRepository=userRepository;
        this.passwordEncoder=passwordEncoder;
    }

    @Override
    public void run(String... args)throws Exception{
        System.out.println("command");
        if(this.userRepository.findByUsername("doc")==null){
            Doctor doc=new Doctor();
            doc.setName("MainDoctor");
            doc.setPassword(passwordEncoder.encode("docpass"));
            doc.setUsername("doc");
            doc.setBirthDate("22/10/1968");
            doc.setRoles("DOCTOR");
            doc.setAddress("Cluj");
            doc.setGender("male");
            this.userRepository.save(doc);
        }
        if(this.userRepository.findByUsername("pat")==null){
            Patient patient=new Patient();
            patient.setName("MainPatient");
            patient.setPassword(passwordEncoder.encode("patpass"));
            patient.setUsername("pat");
            patient.setBirthDate("21/9/1973");
            patient.setRoles("PATIENT");
            patient.setAddress("Dej");
            patient.setGender("male");
            this.userRepository.save(patient);
        }
        if(this.userRepository.findByUsername("caregiver")==null){
            Caregiver caregiver=new Caregiver();
            caregiver.setName("MainCaregiver");
            caregiver.setPassword(passwordEncoder.encode("carepass"));
            caregiver.setUsername("caregiver");
            caregiver.setBirthDate("15/12/1979");
            caregiver.setRoles("CAREGIVER");
            caregiver.setAddress("Iasi");
            caregiver.setGender("male");
            this.userRepository.save(caregiver);
        }
    }
}
