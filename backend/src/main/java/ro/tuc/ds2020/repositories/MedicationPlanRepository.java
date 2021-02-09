package ro.tuc.ds2020.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import ro.tuc.ds2020.entities.MedicationPlan;
import ro.tuc.ds2020.entities.Patient;

public interface MedicationPlanRepository  extends JpaRepository<MedicationPlan, Integer> {
}
