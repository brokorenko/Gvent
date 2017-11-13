package com.nick.gvent.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping(value = "/login")
public class LoginController {

    @RequestMapping(method = RequestMethod.GET)
    public String getLogin(@RequestParam(value = "error", required = false) String error,
                           @RequestParam(value = "logout", required = false) String logout,
                           Model model) {
        model.addAttribute("error", error != null);
        model.addAttribute("logout", logout != null);
        return "login";
    }

//    @RequestMapping(value = "/", method = RequestMethod.POST)
//    public String setLogin(@RequestParam(value = "error", required = false) String param,
//                           @RequestParam(value = "logout", required = false) String logout,
//                           Model model) {
//        model.addAttribute("error", param);
//        model.addAttribute("logout", logout);
//        return "Dashboard";
//    }

}
