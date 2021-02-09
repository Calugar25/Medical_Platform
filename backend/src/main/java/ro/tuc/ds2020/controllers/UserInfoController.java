package ro.tuc.ds2020.controllers;
import static com.auth0.jwt.algorithms.Algorithm.HMAC512;
import com.auth0.jwt.JWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.rest.webmvc.RepositoryRestController;
import ro.tuc.ds2020.entities.User;
import ro.tuc.ds2020.repositories.UserRepository;
import ro.tuc.ds2020.security.JwtProperties;

import javax.print.DocFlavor;
import javax.transaction.Transactional;

@RepositoryRestController
@RequestMapping("/getUser")

public class UserInfoController {
    @Autowired
    UserRepository ur;

    @GetMapping("/test")
    public String test1(){
        return "API Test2";
    }

    @Transactional
    @RequestMapping(method = RequestMethod.GET)
    @ResponseBody
    User getUserInfo(@RequestHeader(JwtProperties.HEADER_STRING) String token) {
        token = token.replace(JwtProperties.TOKEN_PREFIX, "");

        if (token != null) {
            String userName = JWT.require(HMAC512(JwtProperties.SECRET.getBytes()))
                    .build()
                    .verify(token)
                    .getSubject();
            if (userName != null) {

                return ur.findByUsername(userName);
            }
        }
        return null;

    }
}
