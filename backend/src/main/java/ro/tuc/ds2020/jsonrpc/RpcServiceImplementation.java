package ro.tuc.ds2020.jsonrpc;

import com.google.gson.Gson;
import com.googlecode.jsonrpc4j.spring.AutoJsonRpcServiceImpl;
import com.sun.xml.bind.v2.model.core.ID;
import net.minidev.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ro.tuc.ds2020.entities.Medication;
import ro.tuc.ds2020.entities.MedicationPlan;
import ro.tuc.ds2020.entities.Patient;
import ro.tuc.ds2020.repositories.MedicationRepository;
import ro.tuc.ds2020.repositories.PatientRepository;

import javax.transaction.Transactional;

@Service
@AutoJsonRpcServiceImpl
public class RpcServiceImplementation implements RpcService {
    @Autowired
    PatientRepository patientRepository;
    @Autowired
    MedicationRepository medicationRepository;

    @Transactional
    @Override
    public MedPlan getMedPlan(Integer patientId) throws Exception {

        Patient patient = patientRepository.findById((int) patientId);
        MedicationPlan medicationPlan = patient.getMedicationPlan().get(0);
        System.out.println("The medication plan was downloaded" + medicationPlan.toString());
        MedPlan medPlan = new MedPlan(medicationPlan.getId(), medicationPlan.getMedications(), medicationPlan.getStartDate(), medicationPlan.getEndDate(), medicationPlan.getIntakeInterval());
        return medPlan;



    }

    @Transactional
    @Override
    public String medTaken(Medication medication) throws Exception {

        Medication med = medication;
        String message = "The patient  took the medication " + medication.toString() + "on time ";
        System.out.println(message);
        return message;

    }

    @Transactional
    @Override
    public String medNotTaken(Medication medication) throws Exception {

        Medication med = medication;
        String message = "The patient  dit not take  the medication " + medication.toString() + "on time ";
        System.out.println(message);
        return message;

    }


}
