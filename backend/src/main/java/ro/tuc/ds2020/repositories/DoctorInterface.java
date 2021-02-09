package ro.tuc.ds2020.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.tuc.ds2020.entities.Doctor;

import javax.print.Doc;

public interface DoctorInterface extends JpaRepository<Doctor,Integer> {
    Doctor findByUsername(String username);
}
