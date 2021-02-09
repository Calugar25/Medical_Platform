package ro.tuc.ds2020.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.tuc.ds2020.entities.Medication;

public interface MedicationRepository extends JpaRepository<Medication, Integer> {
    Medication findById(int id);
}
