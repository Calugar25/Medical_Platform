package ro.tuc.ds2020.entities;

import javax.persistence.*;
import java.util.UUID;

@Entity
public class ActivityData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    private Patient patient;

    private long startDate;

    private long endDate;

    private String activityLabel;

    public ActivityData(Integer id, Patient patient, long startDate, long endDate, String activityLabel) {
        this.id = id;
        this.patient=patient;
        this.startDate = startDate;
        this.endDate = endDate;
        this.activityLabel = activityLabel;
    }

    public ActivityData(Patient patient, long startDate, long endDate, String activityLabel) {
        this.patient = patient;
        this.startDate = startDate;
        this.endDate = endDate;
        this.activityLabel = activityLabel;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Patient getPatient() {
        return patient;
    }

    public void setPatient(Patient patient) {
        this.patient = patient;
    }

    public long getStartDate() {
        return startDate;
    }

    public void setStartDate(long startDate) {
        this.startDate = startDate;
    }

    public long getEndDate() {
        return endDate;
    }

    public void setEndDate(long endDate) {
        this.endDate = endDate;
    }

    public String getActivityLabel() {
        return activityLabel;
    }

    public void setActivityLabel(String activityLabel) {
        this.activityLabel = activityLabel;
    }

    public ActivityData() {
    }
}
