package ro.tuc.ds2020;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.config.SimpleRabbitListenerContainerFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig{

    public static final String TOPIC_EXCHANGE_NAME = "topic_logs";
    public static final String QUEUE_NAME = "sensor_queue";
    public static final String ROUTING_KEY = "sensors.*";

    public @Bean
    TopicExchange topicExchange() {
        return new TopicExchange(TOPIC_EXCHANGE_NAME);
    }

    public @Bean
    Queue queue() {
        return new Queue(QUEUE_NAME);
    }

    public @Bean
    Binding binding() {
        return BindingBuilder.bind(queue()).to(topicExchange()).with(ROUTING_KEY);
    }

    public @Bean
    SimpleRabbitListenerContainerFactory listenerContainerFactory(
            ConnectionFactory connectionFactory) {
        final SimpleRabbitListenerContainerFactory factory = new SimpleRabbitListenerContainerFactory();
        factory.setConnectionFactory(connectionFactory);
        factory.setMessageConverter(messageConverter());
        return factory;
    }

    public @Bean
    RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        final RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(messageConverter());
        return rabbitTemplate;
    }

    public @Bean
    MessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}
