package ro.tuc.ds2020.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Doctor extends User {

    public Doctor(String username,String name,String address,String birthDate,String gender, String roles){
        super(username, name, address, gender, birthDate,roles);
    }
    public Doctor()
    {

    }
}
