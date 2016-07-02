package dnn.web.admin.clouddisk;

import com.dounine.clouddisk360.parser.deserializer.login.LoginUserToken;
import com.dounine.clouddisk360.store.BasePathCommon;
import com.dounine.clouddisk360.util.MD5Util;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("admin/clouddisk")
public class ClouddiskAction {

	public static final LoginUserToken LOGIN_USER_TOKEN =
			new LoginUserToken("403833139@qq.com",
			"");

	public static void main(String[] args){
		System.out.println(MD5Util.MD5("987654321.0"));
	}

	static {
		BasePathCommon.BASE_PATH = "/Users/huanghuanlai/Desktop/clouddisk/";
		//PoolingHttpClientConnection.initHttpClientConnectionManager();
	}

}
