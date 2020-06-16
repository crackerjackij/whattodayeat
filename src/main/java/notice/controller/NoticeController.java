package notice.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import notice.vo.ReturnModelVo;

@Controller
@RequestMapping("/notice")
public class NoticeController {

	@GetMapping("")
	public String getView(){
		System.out.println("들어옴");
		return "index";
		
	}
	
	@GetMapping("/list")
	public @ResponseBody ReturnModelVo getNotice(){
		ReturnModelVo rtn = new ReturnModelVo();
		
		
		
		return rtn;
	}
	
}