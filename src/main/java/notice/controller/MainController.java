package notice.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/main")
public class MainController {
	
	@GetMapping("")
	public String getView(){
		return "/main/main";
		
	}
	
	@GetMapping("/startMap")
	public String startMap(){
		return "/main/map";
		
	}
	
}