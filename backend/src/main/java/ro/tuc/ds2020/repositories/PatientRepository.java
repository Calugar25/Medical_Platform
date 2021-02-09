package ro.tuc.ds2020.repositories;


import com.sun.xml.bind.v2.model.core.ID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.yaml.snakeyaml.events.Event;
import ro.tuc.ds2020.entities.Patient;
import ro.tuc.ds2020.entities.Person;

import javax.persistence.Id;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Stream;

public interface PatientRepository extends JpaRepository<Patient, Integer> {
    Patient findById(int id);
    Patient findByUsername(String username);

}
