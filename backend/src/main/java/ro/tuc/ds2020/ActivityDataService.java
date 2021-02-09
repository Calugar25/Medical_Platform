package ro.tuc.ds2020;

import com.sun.xml.bind.v2.model.core.ID;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ro.tuc.ds2020.entities.ActivityData;
import ro.tuc.ds2020.entities.Patient;
import ro.tuc.ds2020.repositories.ActivityDataRepository;
import ro.tuc.ds2020.repositories.PatientRepository;

import java.util.Optional;

@Service
public class ActivityDataService {
    @Autowired
    private ActivityDataRepository activityDataRepository;

    @Autowired
    private PatientRepository patientService;




    public void insertActivityData(ActivityData activityData) {
        activityDataRepository.save(activityData);
    }




    public void insertActivityData(CustomMessage customMessage) {

        ActivityData activityData;
        activityData = new ActivityData(patientService.findByUsername("marius25"), customMessage.getStartTime(), customMessage.getEndTime(), customMessage.getActivityLabel());
        activityDataRepository.save(activityData);


    }

}
