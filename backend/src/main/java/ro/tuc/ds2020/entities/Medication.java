package ro.tuc.ds2020.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Medication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String name;

    @Column
    private String listSideEffects;
    @Column
    private String dosage;






    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getListSideEffects() {
        return listSideEffects;
    }

    public void setListSideEffects(String listSideEffects) {
        this.listSideEffects = listSideEffects;
    }

    public String getDosage() {
        return dosage;
    }

    public void setDosage(String dosage) {
        this.dosage = dosage;
    }

    @Override
    public String toString() {
        return "Medication{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", listSideEffects='" + listSideEffects + '\'' +
                ", dosage='" + dosage + '\'' +
                '}';
    }
}

