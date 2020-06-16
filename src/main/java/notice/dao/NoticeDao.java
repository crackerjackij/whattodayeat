package notice.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

@Repository
public class NoticeDao {

	@Autowired
	@Qualifier("sqlSession")
	private SqlSession sqlSession;
	
	public List<Map<String, Object>> getNoticeList(Map<String, Object> param){
		return sqlSession.selectList("noticeMapper.getNoticeList", param);
	}
}
