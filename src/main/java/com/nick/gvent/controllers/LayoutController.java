package com.nick.gvent.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/** LayoutController class for UI
 * @autor Fetissov Mikalai
 * @version 1.0
 */

@Controller
public class LayoutController {


    @RequestMapping("/")
    public String main(){
        return "Dashboard";
    }

    @RequestMapping("/map")
    public String map(){
        return "MapEvent";
    }

}
