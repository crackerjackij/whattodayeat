package notice.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import notice.dao.NoticeDao;

@Service
public class NoticeService {
	
	@Autowired NoticeDao noticeDao;
	
	public List<Map<String, Object>> getNoticeList(Map<String, Object> param){
		List<Map<String, Object>> list = new ArrayList<>();
		
		list = noticeDao.getNoticeList(param);
		
		return list;
	}
}
