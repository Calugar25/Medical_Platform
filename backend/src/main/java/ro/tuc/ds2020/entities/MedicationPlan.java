package ro.tuc.ds2020.entities;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
public class MedicationPlan {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ElementCollection
    @ManyToMany
    private List<Medication> medications = null;

    @Column
    private String startDate;

    @Column
    private String endDate;

    @Column
    private String intakeInterval;

    public MedicationPlan id(Integer id) {
        this.id = id;
        return this;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public MedicationPlan medications(List<Medication> medications) {
        this.medications = medications;
        return this;
    }

    public List<Medication> getMedications() {
        return medications;
    }

    public void setMedications(List<Medication> medications) {
        this.medications = medications;
    }

    public MedicationPlan startDateget(String startDate) {
        this.intakeInterval = startDate;
        return this;
    }

    public MedicationPlan endDateget(String endDate) {
        this.endDate = endDate;
        return this;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String starDate) {
        this.startDate = starDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getIntakeInterval() {
        return intakeInterval;
    }

    public void setIngestIntervals(String intakeInterval) {
        this.intakeInterval = intakeInterval;
    }

    public MedicationPlan intakeIntervalget(String intakeInterval) {
        this.intakeInterval = intakeInterval;
        return this;
    }



    public void setIntakeInterval(String intakeInterval) {
        this.intakeInterval = intakeInterval;
    }


    public MedicationPlan addMedicationsItem(Medication medicationsItem) {
        if (this.medications == null) {
            this.medications = new ArrayList<>();
        }
        this.medications.add(medicationsItem);
        return this;
    }

    @Override
    public String toString() {
        return "MedicationPlan{" +
                "id=" + id +
                ", medications=" + medications +
                ", startDate='" + startDate + '\'' +
                ", endDate='" + endDate + '\'' +
                ", intakeInterval='" + intakeInterval + '\'' +
                '}';
    }
}