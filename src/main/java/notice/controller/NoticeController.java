package notice.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import notice.service.NoticeService;
import notice.vo.ReturnModelVo;

@Controller
@RequestMapping("/notice")
public class NoticeController {
	
	@Autowired
	NoticeService noticeService;

	@GetMapping("/list")
	public @ResponseBody ReturnModelVo getNotice(){
		ReturnModelVo rtn = new ReturnModelVo();
		System.out.println("받음");
		List<Map<String, Object>> list = noticeService.getNoticeList(null);
		
		rtn.setModel(list);
		
		return rtn;
	}
	
}