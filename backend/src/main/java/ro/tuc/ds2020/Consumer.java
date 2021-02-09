package ro.tuc.ds2020;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;
import com.rabbitmq.client.DeliverCallback;
import org.hibernate.dialect.CUBRIDDialect;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.AmqpRejectAndDontRequeueException;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageListener;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import ro.tuc.ds2020.entities.ActivityData;
import ro.tuc.ds2020.entities.Caregiver;
import ro.tuc.ds2020.entities.Patient;
import ro.tuc.ds2020.repositories.ActivityDataRepository;
import ro.tuc.ds2020.repositories.PatientRepository;


import java.time.*;

@Service
public class Consumer {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    @Autowired
    private ActivityDataService activityDataService;




    @RabbitListener(queues = RabbitMQConfig.QUEUE_NAME)
    public void receiveMessage(final CustomMessage message) {

        try {
            checkRulesForJson(message);
            activityDataService.insertActivityData(message);
            // System.out.println("im going to send this in the web socket"+message);
            // simpMessagingTemplate.convertAndSend("/topic/greetings",message);
            // System.out.println(message);
            // activityDataService.insertActivityData(customMessage);
        } catch (Exception e) {

            System.out.println("exception mapping json object" + e.getStackTrace());
        }

    }

    public void checkRulesForJson(CustomMessage customMessage) {

        LocalDateTime startDate =
                LocalDateTime.ofInstant(Instant.ofEpochMilli(customMessage.getStartTime()), ZoneId.systemDefault());
        LocalDateTime endDate = LocalDateTime.ofInstant(Instant.ofEpochMilli(customMessage.getEndTime()), ZoneId.systemDefault());
        String activity = customMessage.getActivityLabel();

        Long minutesDuration = (customMessage.getEndTime() - customMessage.getStartTime()) / 60;
        // System.out.println("this is the duration of the activity in minutes"+minutesDuration+customMessage.getActivityLabel());
        Long durationHours = minutesDuration / 60;


        Duration duration = Duration.between(startDate, endDate);
        //System.out.println("this is the duration"+duration.toHours());
        // System.out.println("this is mine "+minutesDuration);

        if (durationHours > 7 && activity.contains("Sleeping")) {
            alertCaregiver(customMessage, durationHours + " hours");

        }


        if (durationHours > 5 && activity.contains("Leaving"))
            alertCaregiver(customMessage, durationHours + " hours");


        if (minutesDuration > 30 && activity.contains("Toileting"))
            alertCaregiver(customMessage, minutesDuration + " minutes");
    }


    public void alertCaregiver(CustomMessage customMessage, String duration) {
        System.out.println("Allert Patient Number  " + customMessage.getPatientId() + " has been doing  activity  :" + customMessage.getActivityLabel()+" for  " + duration);
        simpMessagingTemplate.convertAndSend("/topic/greetings", "Allert Patient Number  " + customMessage.getPatientId() + " has been doing  activity  :" + customMessage.getActivityLabel()+" for  " + duration);
    }


}
