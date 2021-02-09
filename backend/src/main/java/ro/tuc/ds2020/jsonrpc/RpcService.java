package ro.tuc.ds2020.jsonrpc;

import com.googlecode.jsonrpc4j.JsonRpcService;
import com.sun.xml.bind.v2.model.core.ID;
import net.minidev.json.JSONObject;
import ro.tuc.ds2020.entities.Medication;
import ro.tuc.ds2020.entities.MedicationPlan;
import ro.tuc.ds2020.entities.Patient;

@JsonRpcService("/rpc")
public interface RpcService {

    public MedPlan getMedPlan(Integer id)throws  Exception;
    //public Medication getMedication(Integer  id  )throws  Exception;

    public String medTaken(Medication medication)throws Exception;
    public String medNotTaken(Medication medication)throws Exception;
}
