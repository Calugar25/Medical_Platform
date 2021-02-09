package ro.tuc.ds2020.jsonrpc;

import ro.tuc.ds2020.entities.Medication;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;


public class MedPlan {

    private Integer id;


    private List<Medication> medications = null;


    private String startDate;


    private String endDate;


    private String intakeInterval;

   public MedPlan(){

   }

    public MedPlan(Integer id, List<Medication> medications, String startDate, String endDate, String intakeInterval) {
        this.id = id;
        this.medications = medications;
        this.startDate = startDate;
        this.endDate = endDate;
        this.intakeInterval = intakeInterval;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public List<Medication> getMedications() {
        return medications;
    }

    public void setMedications(List<Medication> medications) {
        this.medications = medications;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
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

    public void setIntakeInterval(String intakeInterval) {
        this.intakeInterval = intakeInterval;
    }
}