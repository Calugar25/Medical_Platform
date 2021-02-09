package ro.tuc.ds2020.entities;


import com.fasterxml.jackson.annotation.JsonIgnore;
import org.springframework.lang.NonNull;

import javax.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class User{
    @Id
    @GeneratedValue(strategy = GenerationType.TABLE)
    @NonNull
    private Integer id;

    @Column(name="username")
    @NonNull
    private String username;

    @Column(name="password")
    @NonNull
    @JsonIgnore
    private String password;

    @Column(name="name")
    @NonNull
    private String name;

    @Column(name="address")
    @NonNull
    private String address;

    @Column(name="gender")
    @NonNull
    private String gender;

    @Column(name="birthDate")
    @NonNull
    private String birthDate;

    @Column(name="roles")
    @NonNull
   // @JsonIgnore
    private String roles;

    public User(String username,String name ,String address,String gender ,String birthDate)
    {
        this.username=username;
        this.name=name;
        this.address=address;
        this.gender=gender;
        this.birthDate=birthDate;
    }

    public User(String username,String name ,String address,String gender ,String birthDate,String roles)
    {
        this.username=username;
        this.name=name;
        this.address=address;
        this.gender=gender;
        this.birthDate=birthDate;
        this.roles=roles;
    }



    public User() {

    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", name='" + name + '\'' +
                ", address='" + address + '\'' +
                ", gender='" + gender + '\'' +
                ", birthDate='" + birthDate + '\'' +
                ", roles='" + roles + '\'' +
                '}';
    }
}