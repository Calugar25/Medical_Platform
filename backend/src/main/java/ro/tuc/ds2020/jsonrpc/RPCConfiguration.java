package ro.tuc.ds2020.jsonrpc;

import com.googlecode.jsonrpc4j.spring.AutoJsonRpcServiceImpl;
import com.googlecode.jsonrpc4j.spring.AutoJsonRpcServiceImplExporter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RPCConfiguration {
    @Bean
    public AutoJsonRpcServiceImplExporter autoJsonRpcServiceImplExporter(){
        AutoJsonRpcServiceImplExporter autoJsonRpcServiceImplExporter=new AutoJsonRpcServiceImplExporter();
        return autoJsonRpcServiceImplExporter;
    }
}
