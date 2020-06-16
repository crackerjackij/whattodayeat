package notice.vo;

import java.util.Map;

import lombok.Data;

@Data
public class ReturnModelVo {
	private boolean success = false;
	private String message = "";
	private Object model;
//	private PageNavi pageNavi;
	private Map<String, Object> map;
}
