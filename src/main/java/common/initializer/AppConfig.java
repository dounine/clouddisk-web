package common.initializer;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = { Constant.SCAN_APP_PACKAGES })
public class AppConfig {

    //这里是测试标签版本
}
