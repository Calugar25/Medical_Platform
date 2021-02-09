package ro.tuc.ds2020;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;

public final class CustomMessage implements Serializable {

    private final Integer patientId;
    private final long startTime;
    private final long endTime;
    private String activityLabel;

    public CustomMessage(@JsonProperty("patient_id") Integer patientId,
                         @JsonProperty("start_time") long startTime,
                         @JsonProperty("end_time") long endTime,
                         @JsonProperty("activity") String activityLabel) {
        this.patientId = patientId;
        this.startTime = startTime;
        this.endTime = endTime;
        this.activityLabel = activityLabel;
    }

    @Override
    public String toString() {
        return "CustomMessage{" +
                "id=" + patientId + ", start time=" + startTime +
                ", end time =" + endTime + ' ' + "activity label=" + activityLabel +
                '}';
    }


    public Integer getPatientId() {
        return patientId;
    }

    public long getStartTime() {
        return startTime;
    }

    public long getEndTime() {
        return endTime;
    }

    public String getActivityLabel() {
        return activityLabel;
    }

    public void setActivityLabel(String activityLabel) {
        this.activityLabel = activityLabel;
    }
}
