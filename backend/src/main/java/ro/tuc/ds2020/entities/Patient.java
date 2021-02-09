package ro.tuc.ds2020.entities;



import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.persistence.Entity;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


@Entity
public class Patient  extends User {

    @Column
    private String medicalRecord;


    @ManyToMany
    private List<MedicationPlan> medicationPlan = null;


    @ManyToMany(mappedBy = "patients")
    private List<Caregiver>caregivers=null;


    @OneToMany
    private List<ActivityData> activityDataList;

    public Patient(String username, String name, String address, String gender, String birthDate, String medicalRecord,String roles) {
        super(username, name, address, gender, birthDate,roles);
        this.medicalRecord = medicalRecord;
    }
    public Patient(){

    }

    public String getMedicalRecord() {
        return medicalRecord;
    }

   // public void setMedicalRecord(String medicalRecord) {
      //  this.medicalRecord = medicalRecord;
  //  }
   @JsonIgnore
    public List<MedicationPlan> getMedicationPlan() {
        return medicationPlan;
    }

/*
    public void setMedicationPlan(List<MedicationPlan> medicationPlan) {
        this.medicationPlan = medicationPlan;
    }

    public List<Caregiver> getCaregivers() {
        return caregivers;
    }

    public void setCaregivers(List<Caregiver> caregivers) {
        this.caregivers = caregivers;
    }

    public void addActivity(ActivityData activityData){
        if(activityDataList == null)
        {
            this.activityDataList = new ArrayList<>();
        }
        activityDataList.add(activityData);
    }
*/


}