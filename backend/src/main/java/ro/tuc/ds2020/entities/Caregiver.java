package ro.tuc.ds2020.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Entity
public class Caregiver extends User {
    @ManyToMany
    private List<Patient>patients=null;

    public Caregiver(String username, String name, String address, String birthDate, String gender,String roles) {
        super(username, name, address, gender, birthDate,roles);

    }

    public Caregiver()
    {}


}
